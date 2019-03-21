defmodule Hw08Web.TaskTimeView do
  use Hw08Web, :view
  alias Hw08Web.TaskTimeView

  def render("index.json", %{task_times: task_times}) do
    %{data: render_many(task_times, TaskTimeView, "task_time.json")}
  end

  def render("show.json", %{task_time: task_time}) do
    %{data: render_one(task_time, TaskTimeView, "task_time.json")}
  end

  def render("task_time.json", %{task_time: task_time}) do
    %{id: task_time.id,
      time: task_time.time}
  end
end
