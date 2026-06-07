export interface User {
  id: string;
  email: string;
  name: string;
}

interface StoredUser extends User {
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  registeredUsers: StoredUser[];
  register: (name: string, email: string, password: string) => string | null;
  loginUser: (email: string, password: string) => string | null;
  logout: () => void;
}

export const createAuthSlice = (set: (partial: Partial<AuthState>) => void, get: () => AuthState): AuthState => ({
  user: null,
  isLoggedIn: false,
  registeredUsers: [],

  register: (name, email, password) => {
    const existing = get().registeredUsers.find((u) => u.email === email);
    if (existing) return 'An account with this email already exists.';

    const newUser: StoredUser = { id: Date.now().toString(), name, email, password };
    set({
      registeredUsers: [...get().registeredUsers, newUser],
      user: { id: newUser.id, name, email },
      isLoggedIn: true,
    });
    return null;
  },

  loginUser: (email, password) => {
    const found = get().registeredUsers.find((u) => u.email === email);
    if (!found) return 'No account found with this email.';
    if (found.password !== password) return 'Incorrect password.';

    set({ user: { id: found.id, name: found.name, email: found.email }, isLoggedIn: true });
    return null;
  },

  logout: () => set({ user: null, isLoggedIn: false }),
});
