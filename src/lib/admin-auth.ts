import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'nes-admin-session';
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_PASSWORD || 'dev-password-change-me'
);

export { COOKIE_NAME };

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD not set — using default "admin"');
    return password === 'admin';
  }
  return password === adminPassword;
}
