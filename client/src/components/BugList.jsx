import BugItem from "./BugItem";
import { useEffect, useState } from "react";
import { getBugs, updateBug, deleteBug } from "../api";
import BugForm from "./BugForm";

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState("");

  const loadBugs = async () => {
    try {
      const data = await getBugs();
      setBugs(data);
    } catch (err) {
      setError("Failed to load bugs");
    }
  };

  useEffect(() => {
    loadBugs();
  }, []);

  const handleBugAdded = (newBug) => {
    setBugs([newBug, ...bugs]);
  };

  const handleStatusChange = async (bug) => {
    const nextStatus = getNextStatus(bug.status);
    const updated = await updateBug(bug._id, { status: nextStatus });
    setBugs(bugs.map((b) => (b._id === updated._id ? updated : b)));
  };

  const handleDelete = async (id) => {
    await deleteBug(id);
    setBugs(bugs.filter((b) => b._id !== id));
  };

  return (
    <div className='max-w-xl mx-auto p-4'>
      <BugForm onBugAdded={handleBugAdded} />
      {error && <div className='alert alert-error'>{error}</div>}
      {bugs.length === 0 ? (
        <div className='text-center text-gray-500 mt-4'>No bugs reported.</div>
      ) : (
        bugs.map((bug) => (
          <BugItem
            key={bug._id}
            bug={bug}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

function getNextStatus(status) {
  if (status === "open") return "in-progress";
  if (status === "in-progress") return "resolved";
  return "resolved";
}
