import type { CartItem } from './cartSlice';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = 'registered_users';

function loadCart(email: string): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(`cart_${email}`) || '[]');
  } catch {
    return [];
  }
}

function saveCart(email: string, products: CartItem[]) {
  localStorage.setItem(`cart_${email}`, JSON.stringify(products));
}

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveStoredUser(user: StoredUser) {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
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
  set: (partial: Partial<AuthState & { products: CartItem[] }>) => void,
  get: () => AuthState & { products: CartItem[] },
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

      saveStoredUser({ name, email, password });
      set({
        user: { id: data.id.toString(), name, email },
        isLoggedIn: true,
        products: loadCart(email),
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

      if (res.ok) {
        const stored = getStoredUsers().find((u) => u.email === email);
        set({
          user: { id: '', name: stored?.name ?? email, email },
          isLoggedIn: true,
          products: loadCart(email),
        });
        return null;
      }

      const stored = getStoredUsers().find(
        (u) => u.email === email && u.password === password,
      );
      if (stored) {
        set({
          user: { id: '', name: stored.name, email },
          isLoggedIn: true,
          products: loadCart(email),
        });
        return null;
      }

      return 'Invalid email or password.';
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

  logout: () => {
    const { user, products } = get();
    if (user) saveCart(user.email, products);
    set({ user: null, isLoggedIn: false, products: [] });
  },
});
