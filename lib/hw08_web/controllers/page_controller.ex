defmodule Hw08Web.PageController do
  use Hw08Web, :controller
  
  alias Hw08.Tasks
  alias Hw08.Tasks.Task

  def index(conn, _params) do
    tasks = Hw08.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :description, :time])))
    render conn, "index.html", tasks: tasks
  end
  
end
