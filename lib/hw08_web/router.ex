defmodule Hw08Web.Router do
  use Hw08Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Hw08Web do
    pipe_through :browser

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/register", PageController, :index
    get "/tasks/:id", PageController, :index
    get "/tasks/edit/:id", PageController, :index
    get "/users/:id", PageController, :index
    get "/users/edit/:id", PageController, :index
  end
  
  scope "/api", Hw08Web do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    post "/auth", AuthController, :authenticate
  end

  # Other scopes may use custom stacks.
  # scope "/api", Hw08Web do
  #   pipe_through :api
  # end
end
