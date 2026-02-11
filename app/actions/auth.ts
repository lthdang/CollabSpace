"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { signIn } from "@/lib/auth";

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Result type for signup action
 */
type SignupResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
      field?: string;
    };

/**
 * Register a new user and automatically sign them in
 *
 * @param formData - User registration data
 * @returns SignupResult with success status or error message
 */
export async function signupAction(formData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<SignupResult> {
  try {
    const { name, email, password, confirmPassword } = formData;

    // Validate input data
    if (!name || name.trim().length < 2) {
      return {
        success: false,
        error: "Name must be at least 2 characters",
        field: "name",
      };
    }

    if (!email || !isValidEmail(email)) {
      return {
        success: false,
        error: "Invalid email address",
        field: "email",
      };
    }

    if (!password || password.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters",
        field: "password",
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Passwords don't match",
        field: "confirmPassword",
      };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists",
        field: "email",
      };
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Automatically sign in the user
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (signInError) {
      console.error("Sign in after signup failed:", signInError);
      // User was created but auto sign-in failed
      return {
        success: true,
        message: "Account created successfully. Please sign in.",
      };
    }

    return {
      success: true,
      message: "Account created and signed in successfully",
    };
  } catch (error) {
    console.error("Signup error:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create account",
    };
  }
}
