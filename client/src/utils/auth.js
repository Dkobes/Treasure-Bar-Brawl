import { jwtDecode } from "jwt-decode";

class AuthService {

  // Check if the user is logged in by retrieving the token from localStorage
  loggedIn() {
    const token = this.getToken();
    return token;
  }

  // Retrieve the JWT token from localStorage
  getToken() {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  // Get the user ID from the JWT token
  getUserId() {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; 
    }
    return null; // Return null if there's no token
  }

  // Store the JWT token in localStorage and redirect to the home page
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/characterselect');
  }

  // Remove the JWT token from localStorage and redirect to the home page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

// Export an instance of the AuthService class
export default new AuthService();
