import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Modal from "../components/Modal.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import TaskForm from "../components/TaskForm.jsx";

export default function TaskIndex({ tasks, flash }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("new");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleDelete = (taskId) => {
    if (confirm("Are you sure?")) {
      router.delete(`/tasks/${taskId}`);
    }
  };

  const openModal = (type) => {
    setType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);

    setNewTask({
      title: "",
      description: "",
      completed: false,
    });
  };

  return (
    <AppLayout flash={flash}>
      {/* Header */}
      <header className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-lg font-semibold leading-8 text-zinc-800">
            Listing Tasks
          </h1>
        </div>
        <div className="flex-none">
          <button
            onClick={openModal}
            className="phx-submit-loading:opacity-75 rounded-lg bg-zinc-900 hover:bg-zinc-700 py-2 px-3 text-sm font-semibold leading-6 text-white active:text-white/80"
          >
            New Task
          </button>
        </div>
      </header>

      {/* Table */}
      <div className="overflow-y-auto px-4 sm:overflow-visible sm:px-0">
        <table className="w-[40rem] mt-11 sm:w-full">
          <thead className="text-sm text-left leading-6 text-zinc-500">
            <tr>
              <th className="p-0 pb-4 pr-6 font-normal">Title</th>
              <th className="p-0 pb-4 pr-6 font-normal">Description</th>
              <th className="p-0 pb-4 pr-6 font-normal">Completed</th>
              <th className="relative p-0 pb-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="relative divide-y divide-zinc-100 border-t border-zinc-200 text-sm leading-6 text-zinc-700">
            {tasks.map((task) => (
              <tr
                key={`tasks-${task.id}`}
                id={`tasks-${task.id}`}
                className="group hover:bg-zinc-50"
              >
                <td className="relative p-0 hover:cursor-pointer">
                  <Link href={`/tasks/${task.id}`} className="block py-4 pr-6">
                    <span className="absolute -inset-y-px right-0 -left-4 group-hover:bg-zinc-50 sm:rounded-l-xl"></span>
                    <span className="relative font-semibold text-zinc-900">
                      {task.title}
                    </span>
                  </Link>
                </td>
                <td className="relative p-0 hover:cursor-pointer">
                  <Link href={`/tasks/${task.id}`} className="block py-4 pr-6">
                    <span className="absolute -inset-y-px right-0 -left-4 group-hover:bg-zinc-50 sm:rounded-l-xl"></span>
                    <span className="relative">{task.description}</span>
                  </Link>
                </td>
                <td className="relative p-0 hover:cursor-pointer">
                  <Link href={`/tasks/${task.id}`} className="block py-4 pr-6">
                    <span className="absolute -inset-y-px right-0 -left-4 group-hover:bg-zinc-50 sm:rounded-l-xl"></span>
                    <span className="relative">
                      {task.completed ? "true" : "false"}
                    </span>
                  </Link>
                </td>
                <td className="relative w-14 p-0">
                  <div className="relative whitespace-nowrap py-4 text-right text-sm font-medium">
                    <span className="absolute -inset-y-px -right-4 left-0 group-hover:bg-zinc-50 sm:rounded-r-xl"></span>
                    <span className="relative ml-4 font-semibold leading-6 text-zinc-900 hover:text-zinc-700">
                      <div className="sr-only">
                        <Link href={`/tasks/${task.id}`}>Show</Link>
                      </div>
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setNewTask(task);
                          openModal("edit");
                        }}
                      >
                        Edit
                      </Link>
                    </span>
                    <span className="relative ml-4 font-semibold leading-6 text-zinc-900 hover:text-zinc-700">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(task.id);
                        }}
                      >
                        Delete
                      </a>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} id="new-task-modal">
        <TaskForm
          task={newTask}
          title={`New Task`}
          onClose={closeModal}
          type={type}
        />
      </Modal>
    </AppLayout>
  );
}
