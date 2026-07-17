import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import env from "./config/environment";
import { initializeDatabase } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";

// Import routes
import authRoutes from "./routes/authRoutes";
import cropRoutes from "./routes/cropRoutes";
import analysisRoutes from "./routes/analysisRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Connect to Database
  try {
    await initializeDatabase();
    console.log("✓ Database Connected");
  } catch (error) {
    console.error("✗ Failed to connect to database. Exiting...");
    process.exit(1);
  }

  // Middleware
  app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging middleware
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/crops", cropRoutes);
  app.use("/api/analysis", analysisRoutes);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle 404 for API routes
  app.use("/api/*", (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`,
      error: "Not Found"
    });
  });

  // Handle client-side routing - serve index.html for all non-API routes
  app.get("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(404).send("Frontend build not found. Please run build first.");
      }
    });
  });

  // Global Error Handler
  app.use(errorHandler);

  const port = env.PORT || 3001;

  server.listen(port, () => {
    console.log(`✓ Server running on http://localhost:${port}/`);
    console.log(`✓ Environment: ${env.NODE_ENV}`);
  });
}

startServer().catch((err) => {
  console.error("✗ Fatal error during server startup:", err);
  process.exit(1);
});
