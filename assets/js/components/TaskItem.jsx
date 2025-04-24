import React, { useState } from "react";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  onAssign,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedTask);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={editedTask.description || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <h3
              className={`ml-3 text-lg font-medium ${
                task.completed ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="mt-2 text-sm text-gray-600 ml-7">
              {task.description}
            </p>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task)}
                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>

            {task.assignedTo ? (
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Assigned to:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {task.assignedTo}
                </span>
              </div>
            ) : (
              <button
                onClick={() => onAssign(task)}
                className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Assign
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
