/**
 * Authentication Service
 * Handles user authentication and authorization logic
 */

import bcrypt from "bcryptjs";
import { UserModel, CreateUserInput, User } from "../models/User";
import { generateToken } from "../middleware/auth";
import { createError } from "../middleware/errorHandler";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}

export class AuthService {
  static async register(userData: CreateUserInput): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      throw createError("User with this email already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await UserModel.create({
      ...userData,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Find user by email
    const user = await UserModel.findByEmail(credentials.email);
    if (!user) {
      throw createError("Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordValid) {
      throw createError("Invalid email or password", 401);
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  static async getUserById(id: string): Promise<Omit<User, "password"> | null> {
    const user = await UserModel.findById(id);
    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async updateUser(
    id: string,
    userData: Partial<User>
  ): Promise<Omit<User, "password"> | null> {
    const user = await UserModel.update(id, userData);
    if (!user) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw createError("User not found", 404);
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw createError("Current password is incorrect", 401);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user
    await UserModel.update(userId, { password: hashedPassword });
  }
}

export default AuthService;
