import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import AppLayout from "../layouts/AppLayout";

export default function TaskDetail({ task, flash }) {
  console.log("TaskDetail", task);
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <AppLayout flash={flash}>
      {/* Header */}
      <header className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-lg font-semibold leading-8 text-zinc-800">
            Task {task.id}
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            This is a task record from your database.
          </p>
        </div>
        <div className="flex-none">
          <button
            onClick={() => setIsEditing(true)}
            className="phx-submit-loading:opacity-75 rounded-lg bg-zinc-900 hover:bg-zinc-700 py-2 px-3 text-sm font-semibold leading-6 text-white active:text-white/80"
          >
            Edit task
          </button>
        </div>
      </header>

      {/* Task Details List - Styled to match Phoenix list component */}
      <div className="mt-14">
        <dl className="-my-4 divide-y divide-zinc-100">
          <div className="flex gap-4 py-4 text-sm leading-6 sm:gap-8">
            <dt className="w-1/4 flex-none text-zinc-500">Title</dt>
            <dd className="text-zinc-700">{task.title}</dd>
          </div>
          <div className="flex gap-4 py-4 text-sm leading-6 sm:gap-8">
            <dt className="w-1/4 flex-none text-zinc-500">Description</dt>
            <dd className="text-zinc-700">{task.description}</dd>
          </div>
          <div className="flex gap-4 py-4 text-sm leading-6 sm:gap-8">
            <dt className="w-1/4 flex-none text-zinc-500">Completed</dt>
            <dd className="text-zinc-700">
              {task.completed ? "true" : "false"}
            </dd>
          </div>
        </dl>
      </div>

      {/* Back Button - Styled to match Phoenix back component */}
      <div className="mt-16">
        <Link
          href="/tasks"
          className="text-sm flex items-center font-semibold leading-6 text-zinc-900 hover:text-zinc-700 space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline h-3 w-3 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to tasks
        </Link>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={handleClose} id="task-modal">
        <TaskForm
          task={task}
          title={`Edit Task ${task.id}`}
          onClose={handleClose}
          type="edit"
        />
      </Modal>
    </AppLayout>
  );
}
