export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  loginUser: (email: string, password: string) => Promise<string | null>;
  updateUser: (name: string, email: string) => Promise<string | null>;
  deleteUser: () => Promise<string | null>;
  logout: () => void;
}

export const createAuthSlice = (
  set: (partial: Partial<AuthState>) => void,
  get: () => AuthState,
): AuthState => ({
  user: null,
  isLoggedIn: false,

  register: async (name, email, password) => {
    try {
      const res = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });

      if (!res.ok) return 'Registration failed. Please try again.';

      const data = await res.json();

      set({
        user: { id: data.id.toString(), name, email },
        isLoggedIn: true,
      });

      return null;
    } catch {
      return 'Network error. Please try again.';
    }
  },

  loginUser: async (email, password) => {
    try {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) return 'Invalid email or password.';

      await res.json();

      set({ user: { id: '', name: email, email }, isLoggedIn: true });

      return null;
    } catch {
      return 'Network error. Please try again.';
    }
  },

  updateUser: async (name, email) => {
    const { user } = get();
    if (!user) return 'Not logged in.';

    try {
      const res = await fetch(`https://fakestoreapi.com/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email }),
      });

      if (!res.ok) return 'Update failed. Please try again.';

      set({ user: { ...user, name, email } });

      return null;
    } catch {
      return 'Network error. Please try again.';
    }
  },

  deleteUser: async () => {
    const { user } = get();
    if (!user) return 'Not logged in.';

    try {
      const res = await fetch(`https://fakestoreapi.com/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) return 'Delete failed. Please try again.';

      set({ user: null, isLoggedIn: false });

      return null;
    } catch {
      return 'Network error. Please try again.';
    }
  },

  logout: () => set({ user: null, isLoggedIn: false }),
});
