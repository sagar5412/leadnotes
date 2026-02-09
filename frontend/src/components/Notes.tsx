import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { notesApi } from "../services/api";
import type { Note } from "../services/api";
import NoteForm from "./NoteForm";

interface NotesProps {
  onLogout: () => void;
  userEmail: string;
}

const Notes = ({ onLogout, userEmail }: NotesProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const data = await notesApi.getAll();
      setNotes(data);
      setError("");
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (title: string, content: string) => {
    const newNote = await notesApi.create(title, content);
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await notesApi.delete(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl font-bold">Lead Notes</h1>
          <span className="text-sm text-neutral-400">{userEmail}</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          title="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </header>

      {/* Note Form */}
      <NoteForm onSubmit={handleAddNote} />

      {/* Notes Content */}
      {isLoading ? (
        <div className="text-center py-12 text-neutral-400">
          Loading notes...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-800 rounded-xl text-neutral-400">
          <p>No notes yet. Create your first note above!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-neutral-900 p-5 rounded-xl flex flex-col"
            >
              <div className="flex justify-between items-start gap-3 mb-3">
                <h3 className="font-semibold text-white break-words">
                  {note.title}
                </h3>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="p-1 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors flex-shrink-0"
                  title="Delete note"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
              <p className="text-neutral-400 text-sm mb-auto break-words whitespace-pre-wrap">
                {note.content}
              </p>
              <span className="text-xs text-neutral-600 mt-4 pt-3 border-t border-neutral-800">
                {formatDate(note.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
