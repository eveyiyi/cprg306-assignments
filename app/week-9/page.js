"use client";
import React from "react";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div>
      <p className="text-3xl mt-5 mb-5">Shopping List</p>
      {!user ? (
        <button onClick={handleSignIn} className="hover:underline">
          Login with GitHub
        </button>
      ) : (
        <div>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <button onClick={handleSignOut} className="hover:underline">
            Logout
          </button>
          <p>
            <Link
              href="/week-9/shopping-list"
              className="text-xl text-blue-600 hover:underline mt-5"
            >
              Continue with your Shopping List
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
