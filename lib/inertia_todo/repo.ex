defmodule InertiaTodo.Repo do
  use Ecto.Repo,
    otp_app: :inertia_todo,
    adapter: Ecto.Adapters.Postgres
end
