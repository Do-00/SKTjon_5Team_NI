/**
 * Base URL of the beec Spring Boot backend, readable from both server and
 * browser code (`NEXT_PUBLIC_` vars are inlined into the client bundle).
 * Set it in `.env.local`; the fallback is beec's default local port.
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
