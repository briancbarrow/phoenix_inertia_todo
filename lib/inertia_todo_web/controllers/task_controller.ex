defmodule InertiaTodoWeb.TaskController do
  use InertiaTodoWeb, :controller

  alias InertiaTodo.Tasks
  alias InertiaTodo.Tasks.Task

  def index(conn, _params) do
    tasks = Tasks.list_tasks()

    conn
    |> assign_prop(:tasks, tasks)
    |> assign_prop(:page_title, "Tasks")
    |> assign_prop(:page_description, "List of all tasks")
    |> render_inertia("TaskList")
  end

  def new(conn, _params) do
    changeset = Tasks.change_task(%Task{})
    render(conn, :new, changeset: changeset)
  end

  def create(conn, %{"task" => task_params}) do
    case Tasks.create_task(task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task created successfully.")
        |> redirect(to: ~p"/tasks/#{task}")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :new, changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    IO.inspect(task, label: "task")

    conn
    |> assign_prop(:task, task)
    |> assign_prop(:page_title, "Task Details")
    |> render_inertia("TaskDetail")
  end

  # def edit(conn, %{"id" => id}) do
  #   task = Tasks.get_task!(id)
  #   changeset = Tasks.change_task(task)
  #   render(conn, :edit, task: task, changeset: changeset)
  # end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)

    case Tasks.update_task(task, task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task updated successfully.")
        |> assign_prop(:task, task)
        |> render_inertia("TaskDetail")

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, :edit, task: task, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    {:ok, _task} = Tasks.delete_task(task)

    conn
    |> put_flash(:info, "Task deleted successfully.")
    |> redirect(to: ~p"/tasks")
  end

  def redirect_to_root(conn, _params) do
    path = String.replace(conn.request_path, "/tasks", "")
    path = if path == "", do: "/", else: path

    redirect(conn, to: path)
  end
end
