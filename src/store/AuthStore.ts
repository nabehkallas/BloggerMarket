import { mockAuthService } from "../services/AuthService";
import { create } from 'zustand';
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    const user = await mockAuthService.login(email, password);
    set({ user, isAuthenticated: true });
  },
  signup: async (email, password) => {
    const user = await mockAuthService.signup(email, password);
    set({ user, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));