import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  name: string;
  surname: string;
  email: string;
  created_at: string;
  updated_at: string;
  exp: number;
  iat: number;
}

const decodeToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT token', error);
    return null;
  }
};

export { decodeToken }
