import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from "../Firebase.js";
import { setDoc, doc } from "firebase/firestore";

// Autentifikatsiya uchun context yaratish
const AuthContext = createContext();

// Autentifikatsiya uchun provider komponenti
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null); // Foydalanuvchi obyekti

    // Yozish funksiyalari
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, 'users', user.uid), {
                    savedShows: []
                });
            })
            .catch((error) => {
                console.error('Error signing up:', error);
            });
    }

    function logIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                console.error('Error signing in:', error);
            });
    }

    function logOut() {
        signOut(auth)
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }

    // Foydalanuvchi avtorizatsiyasi
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Providerni qaytarish
    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
}

// Foydalanuvchi autentifikatsiya uchun hook
export function UserAuth() {
    return useContext(AuthContext);
}
