import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function TaskForm({ task, title, onClose, type }) {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    completed: task.completed || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("type", type);
    e.preventDefault();
    if (type === "edit") {
      router.patch(
        `/tasks/${task.id}`,
        {
          task: formData,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else if (type === "new") {
      router.post("/tasks", {
        task: formData,
      });
    }
    onClose();
  };

  return (
    <>
      <header>
        <h2 className="text-lg font-semibold leading-8 text-zinc-800 mb-6">
          {title}
        </h2>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mt-10 space-y-8 bg-white">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-zinc-800"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg text-zinc-900 focus:ring-0 sm:text-sm sm:leading-6 border-zinc-300 focus:border-zinc-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-zinc-800"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-2 block w-full rounded-lg text-zinc-900 focus:ring-0 sm:text-sm sm:leading-6 border-zinc-300 focus:border-zinc-400"
            />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="completed"
              className="ml-2 block text-sm text-zinc-900"
            >
              <input
                id="completed"
                name="completed"
                type="checkbox"
                checked={formData.completed}
                onChange={handleChange}
                className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
              />
              Completed
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
