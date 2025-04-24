defmodule InertiaTodoWeb.Router do
  use InertiaTodoWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {InertiaTodoWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Inertia.Plug
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", InertiaTodoWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "/tasks", TaskController, :index
    post "/tasks", TaskController, :create
    get "/tasks/:id", TaskController, :show
    patch "/tasks/:id", TaskController, :update
    delete "/tasks/:id", TaskController, :delete
  end

  # Other scopes may use custom stacks.
  # scope "/api", InertiaTodoWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:inertia_todo, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: InertiaTodoWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
