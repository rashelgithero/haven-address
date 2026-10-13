import React, { createContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../routes/firebase.config'; // Verify this relative path!
import useDocumentTitle from '../../newHooks/useDocumentTitle';

export const authContext = createContext(null);

// Initialize Auth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default function AuthProvider({ children }) {
  useDocumentTitle('Update Profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Register User (Email & Password)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 2. Login User (Email & Password)
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Google Social Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 4. GitHub Social Login
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // 5. Logout User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // 6. Update User
  const updateUserProfile = (name, photo) => {
    if (!auth.currentUser) return Promise.reject(new Error("No authenticated user found"));
    
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    }).then(() => {
      // 3. Immediately sync local React state with the updated auth currentUser
      setUser({ ...auth.currentUser });
    })
  }
  // 7. Auth State Observer (Persists user state across refresh)
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    googleLogin,
    githubLogin,
    logOut,
    updateUserProfile
  };

  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  );
}