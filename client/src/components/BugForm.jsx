import { useState } from "react";
import { createBug } from "../api";

export default function BugForm({ onBugAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newBug = await createBug({ title, description });
    onBugAdded(newBug);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className='card bg-base-100 shadow p-4 mb-4'>
      <h2 className='text-xl font-bold mb-2'>Report a Bug</h2>
      <input
        type='text'
        placeholder='Bug title'
        className='input input-bordered w-full mb-2'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Bug description'
        className='textarea textarea-bordered w-full mb-2'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className='btn btn-primary w-full'>Submit</button>
    </form>
  );
}
