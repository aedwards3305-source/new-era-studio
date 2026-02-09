import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, verifyPassword, COOKIE_NAME } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = await createSessionToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
