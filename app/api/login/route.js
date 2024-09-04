// app/api/login/route.js
import { secrets } from '@/lib/hlpr';

import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

// Secret key for signing JWT (use an environment variable in production)
const SECRET_KEY = secrets.JWT_KEY;

// Example user data (for demonstration purposes; use a real database in production)
const users = [
  { username: 'admin', password: secrets.ADMIN_KEY } // Example user
];

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Validate user credentials (replace with your own authentication logic)
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT
    const jwt = await new SignJWT({ username })
      .setExpirationTime('1h') // Token expires in 1 hour
      .setIssuer('engineersday')
      .setAudience('engineersday')
      .sign(new TextEncoder().encode(SECRET_KEY));

    // Return JWT in response
    return NextResponse.json({ token: jwt });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
