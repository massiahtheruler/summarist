"use client";

import { useState, type FormEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

function getAuthErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";

  if (message.includes("auth/invalid-email")) {
    return "Invalid email.";
  }

  if (message.includes("auth/weak-password")) {
    return "Password should be at least 6 characters.";
  }

  if (
    message.includes("auth/user-not-found") ||
    message.includes("auth/invalid-credential") ||
    message.includes("auth/wrong-password")
  ) {
    return "Email or password is incorrect.";
  }

  if (message.includes("auth/email-already-in-use")) {
    return "That email already has an account.";
  }

  if (message.includes("auth/popup-closed-by-user")) {
    return "Google login was closed before finishing.";
  }

  return "Something went wrong. Try again.";
}

export function AuthModal() {
  const {
    closeAuthModal,
    isAuthOpen,
    login,
    loginAsGuest,
    loginWithGoogle,
    register,
    resetPassword,
  } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthOpen) {
    return null;
  }

  async function runAuthAction(action: () => Promise<void>) {
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      await action();
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await runAuthAction(() =>
      mode === "login" ? login(email, password) : register(email, password),
    );
  }

  async function handleResetPassword() {
    if (!email.trim()) {
      setError("Enter your email first.");
      return;
    }

    await runAuthAction(async () => {
      await resetPassword(email);
      setMessage("Password reset email sent.");
    });
  }

  function switchMode() {
    setMode((currentMode) => (currentMode === "login" ? "register" : "login"));
    setError("");
    setMessage("");
  }

  return (
    <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button
        className="auth-modal__overlay"
        aria-label="Close auth modal"
        onClick={closeAuthModal}
        type="button"
      />
      <div className="auth-modal__card">
        <button
          className="auth-modal__close"
          aria-label="Close auth modal"
          onClick={closeAuthModal}
          type="button"
        >
          <FiX aria-hidden="true" />
        </button>

        <h2 id="auth-title" className="auth-modal__title">
          {mode === "login" ? "Log in to Summarist" : "Create your account"}
        </h2>

        <button
          className="auth-modal__provider auth-modal__provider--guest"
          disabled={isSubmitting}
          onClick={() => runAuthAction(loginAsGuest)}
          type="button"
        >
          <FiUser aria-hidden="true" />
          Login as a Guest
        </button>

        <div className="auth-modal__divider">
          <span>or</span>
        </div>

        <button
          className="auth-modal__provider auth-modal__provider--google"
          disabled={isSubmitting}
          onClick={() => runAuthAction(loginWithGoogle)}
          type="button"
        >
          <span className="auth-modal__google-icon">
            <FcGoogle aria-hidden="true" />
          </span>
          Login with Google
        </button>

        <div className="auth-modal__divider">
          <span>or</span>
        </div>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          <input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email Address"
            type="email"
            value={email}
          />
          <input
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
          {error ? <p className="auth-modal__error">{error}</p> : null}
          {message ? <p className="auth-modal__message">{message}</p> : null}
          <button className="btn auth-modal__submit" disabled={isSubmitting} type="submit">
            {mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        {mode === "login" ? (
          <button
            className="auth-modal__link"
            disabled={isSubmitting}
            onClick={handleResetPassword}
            type="button"
          >
            Forgot your password?
          </button>
        ) : null}

        <button className="auth-modal__footer" onClick={switchMode} type="button">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </button>
      </div>
    </div>
  );
}
