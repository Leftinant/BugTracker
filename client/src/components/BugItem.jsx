export default function BugItem({ bug, onStatusChange, onDelete }) {
  return (
    <div className='card bg-base-100 shadow p-4 mb-2'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-semibold'>{bug.title}</h3>
          <p className='text-sm text-gray-500'>{bug.description}</p>
          <span className={`badge mt-2 ${getStatusClass(bug.status)}`}>
            {bug.status}
          </span>
        </div>
        <div className='flex flex-col items-end space-y-1'>
          <button
            onClick={() => onStatusChange(bug)}
            className='btn btn-sm btn-info'
          >
            Advance Status
          </button>
          <button
            onClick={() => onDelete(bug._id)}
            className='btn btn-sm btn-error'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function getStatusClass(status) {
  if (status === "resolved") return "badge-success";
  if (status === "in-progress") return "badge-warning";
  return "badge-neutral";
}
