import { useState } from "react";

interface NoteFormProps {
  onSubmit: (title: string, content: string) => Promise<void>;
}

const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit(title.trim(), content.trim());
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8 max-w-xl">
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        required
        className="w-full bg-neutral-900 border border-transparent focus:border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 outline-none transition-colors"
      />
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        disabled={isLoading}
        required
        className="w-full bg-neutral-900 border border-transparent focus:border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 outline-none resize-none transition-colors"
      />
      <button
        type="submit"
        disabled={isLoading || !title.trim() || !content.trim()}
        className="w-full bg-white text-black font-semibold py-3 px-4 rounded-xl hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Creating..." : "Add Note"}
      </button>
    </form>
  );
};

export default NoteForm;
