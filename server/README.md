# CropTwin Backend API

A comprehensive backend API for the CropTwin AgriTech platform, built with Express.js, TypeScript, and PostgreSQL.

## Project Structure

```
server/
├── config/           # Configuration files
│   ├── database.ts   # Database connection setup
│   └── environment.ts # Environment variables
├── controllers/      # Request handlers
│   ├── authController.ts
│   ├── cropController.ts
│   └── analysisController.ts
├── middleware/       # Express middleware
│   ├── auth.ts       # JWT authentication
│   └── errorHandler.ts # Error handling
├── models/          # Data models and database operations
│   ├── User.ts
│   ├── Crop.ts
│   └── Analysis.ts
├── routes/          # API routes
│   ├── authRoutes.ts
│   ├── cropRoutes.ts
│   └── analysisRoutes.ts
├── services/        # Business logic
│   ├── authService.ts
│   ├── cropService.ts
│   └── analysisService.ts
├── database/        # Database scripts
│   ├── schema.sql   # Database schema
│   └── seed.sql     # Sample data
└── index.ts         # Application entry point
```

## Features

- **User Authentication** - JWT-based authentication with role-based access control
- **Crop Management** - Create, read, update, and delete crop records
- **Crop Analysis** - AI-powered disease detection and crop health analysis
- **Database** - PostgreSQL with connection pooling
- **Error Handling** - Centralized error handling middleware
- **Type Safety** - Full TypeScript support
- **Security** - Password hashing with bcryptjs, JWT tokens

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- pnpm or npm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Create database and run migrations:
```bash
psql -U postgres -d postgres -f server/database/schema.sql
psql -U postgres -d croptwin -f server/database/seed.sql
```

4. Start the development server:
```bash
pnpm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)
- `POST /api/auth/change-password` - Change password (requires auth)

### Crops
- `POST /api/crops` - Create crop
- `GET /api/crops` - Get user's crops
- `GET /api/crops/:id` - Get crop details
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop
- `GET /api/crops/:id/health` - Get crop health status

### Analysis
- `POST /api/analyses` - Perform crop analysis
- `GET /api/analyses/:id` - Get analysis details
- `GET /api/analyses/user/all` - Get user's analyses
- `GET /api/analyses/crop/:cropId` - Get crop analyses
- `DELETE /api/analyses/:id` - Delete analysis

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## Development

### Run tests
```bash
pnpm run test
```

### Build for production
```bash
pnpm run build
```

### Start production server
```bash
pnpm run start
```

## Database Schema

### Users Table
- `id` (UUID) - Primary key
- `email` (VARCHAR) - Unique email address
- `password` (VARCHAR) - Hashed password
- `firstName` (VARCHAR) - User's first name
- `lastName` (VARCHAR) - User's last name
- `role` (VARCHAR) - User role (farmer, officer, researcher, admin)
- `farmSize` (DECIMAL) - Farm size in acres
- `location` (VARCHAR) - User's location
- `phoneNumber` (VARCHAR) - Contact number
- `profileImage` (VARCHAR) - Profile image URL
- `isActive` (BOOLEAN) - Account status
- `createdAt` (TIMESTAMP) - Creation timestamp
- `updatedAt` (TIMESTAMP) - Last update timestamp

### Crops Table
- `id` (UUID) - Primary key
- `userId` (UUID) - Foreign key to users
- `cropName` (VARCHAR) - Name of the crop
- `cropType` (VARCHAR) - Type of crop
- `plantedDate` (DATE) - Date planted
- `expectedHarvestDate` (DATE) - Expected harvest date
- `areaInAcres` (DECIMAL) - Area in acres
- `location` (VARCHAR) - Crop location
- `soilType` (VARCHAR) - Type of soil
- `irrigationType` (VARCHAR) - Irrigation method
- `status` (VARCHAR) - Crop status (healthy, diseased, recovering, harvested)
- `notes` (TEXT) - Additional notes
- `createdAt` (TIMESTAMP) - Creation timestamp
- `updatedAt` (TIMESTAMP) - Last update timestamp

### Analyses Table
- `id` (UUID) - Primary key
- `cropId` (UUID) - Foreign key to crops
- `userId` (UUID) - Foreign key to users
- `imageUrl` (VARCHAR) - URL to crop image
- `diseaseDetected` (VARCHAR) - Detected disease name
- `confidence` (DECIMAL) - Detection confidence percentage
- `cropHealthScore` (DECIMAL) - Health score (0-100)
- `recommendedTreatment` (TEXT) - Treatment recommendation
- `waterRecommendation` (TEXT) - Water management advice
- `fertilizerRecommendation` (TEXT) - Fertilizer advice
- `weatherSummary` (TEXT) - Weather summary
- `analysisDate` (TIMESTAMP) - Analysis timestamp
- `createdAt` (TIMESTAMP) - Creation timestamp
- `updatedAt` (TIMESTAMP) - Last update timestamp

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Stack trace (only in development)",
  "timestamp": "2026-07-16T16:30:00Z",
  "path": "/api/endpoint"
}
```

## Security Considerations

- Passwords are hashed using bcryptjs (10 salt rounds)
- JWT tokens expire after 7 days by default
- All sensitive endpoints require authentication
- Role-based access control for admin operations
- SQL injection prevention through parameterized queries
- CORS configuration for frontend integration

## Future Enhancements

- [ ] Integration with YOLO for disease detection
- [ ] Integration with TensorFlow for crop analysis
- [ ] Real-time notifications via WebSockets
- [ ] Satellite imagery integration
- [ ] Weather API integration
- [ ] File upload to cloud storage (S3)
- [ ] Email notifications
- [ ] Advanced analytics and reporting

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@croptwin.com or open an issue on GitHub.
