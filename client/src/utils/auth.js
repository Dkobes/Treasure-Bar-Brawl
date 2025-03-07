import { jwtDecode } from "jwt-decode";

class AuthService {

  loggedIn() {
    const token = this.getToken();
    return token;
  }

  getToken() {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  getUserId() {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; 
    }
    return null; 
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
