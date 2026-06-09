"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, googleProvider, type FirebaseUser } from "@/lib/firebase";

type AuthContextValue = {
  user: FirebaseUser | null;
  isAuthOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const goToForYou = useCallback(
    () => {
      setIsAuthOpen(false);
      router.push("/for-you");
    },
    [router],
  );

  const goHomeAfterLogout = useCallback(() => {
    setIsAuthOpen(false);
    router.push("/");
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthOpen,
      openAuthModal: () => setIsAuthOpen(true),
      closeAuthModal: () => setIsAuthOpen(false),
      login: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
        goToForYou();
      },
      register: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
        goToForYou();
      },
      loginAsGuest: async () => {
        await signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
        goToForYou();
      },
      loginWithGoogle: async () => {
        await signInWithPopup(auth, googleProvider);
        goToForYou();
      },
      resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email);
      },
      logout: async () => {
        await signOut(auth);
        goHomeAfterLogout();
      },
    }),
    [goHomeAfterLogout, goToForYou, isAuthOpen, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
