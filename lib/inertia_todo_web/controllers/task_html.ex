defmodule InertiaTodoWeb.TaskHTML do
  use InertiaTodoWeb, :html

  embed_templates "task_html/*"

  @doc """
  Renders a task form.
  """
  attr :changeset, Ecto.Changeset, required: true
  attr :action, :string, required: true

  def task_form(assigns)
end
