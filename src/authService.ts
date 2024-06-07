import { Injectable } from '@angular/core';
import { JwtDecoder } from './app/jwt.decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtDecode: JwtDecoder) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    return token ? this.jwtDecode.getUserRole(token) : null;
  }

  getUserId(): number | null {
    const token = this.getToken();
    return token ? this.jwtDecode.getUserId(token) : null;
  }
}
