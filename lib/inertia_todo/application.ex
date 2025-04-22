defmodule InertiaTodo.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      InertiaTodoWeb.Telemetry,
      InertiaTodo.Repo,
      {DNSCluster, query: Application.get_env(:inertia_todo, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: InertiaTodo.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: InertiaTodo.Finch},
      # Start a worker by calling: InertiaTodo.Worker.start_link(arg)
      # {InertiaTodo.Worker, arg},
      # Start to serve requests, typically the last entry
      InertiaTodoWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: InertiaTodo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    InertiaTodoWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
