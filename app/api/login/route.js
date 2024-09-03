import { secrets } from "../../../lib/hlpr";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const formData = await req.formData();
  const password = formData.get("admin-password");
  // Replace this with actual authentication logic
  if (password !== (process.env.ADMIN_KEY || "admin-key"))
    return NextResponse.redirect(new URL("/login", req.url));
  // Create a JWT token
  const token = jwt.sign(
    { role: "admin" },
    secrets.jwtKey, // Use a strong secret in production
    { expiresIn: "1h" }
  );

  // Create the response
  const response = NextResponse.redirect(new URL("/dashboard", req.url));

  // Set the cookie in the response
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure this is true in production
    path: "/",
    maxAge: 60 * 60, // 1 hour
    sameSite: "lax",
  });
  console.log("Admin logined in")
  return response;
}
