import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./config/firebase";
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-neutral-700 border-t-white rounded-full animate-spin"></div>
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {user ? (
        <Notes onLogout={() => setUser(null)} userEmail={user.email || ""} />
      ) : (
        <Login onLoginSuccess={() => {}} />
      )}
    </div>
  );
}

export default App;
