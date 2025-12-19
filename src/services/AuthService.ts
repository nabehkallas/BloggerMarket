// services/authService.js
export const mockAuthService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === "password") {
          resolve({ id: "123", email, name: "Test User" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  },
  signup: (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "123", email, name: "Test User" });
      }, 1000);
    });
  },
  logout: () => Promise.resolve(),
};