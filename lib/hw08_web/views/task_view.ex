defmodule Hw08Web.TaskView do
  use Hw08Web, :view
  alias Hw08Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      time: task.time,
      completed: task.completed,
      user_id: task.user_id
      }
  end
end
