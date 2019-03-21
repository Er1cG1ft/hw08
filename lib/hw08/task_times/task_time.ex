defmodule Hw08.TaskTimes.TaskTime do
  use Ecto.Schema
  import Ecto.Changeset

  schema "task_times" do
    field :time, :integer
    belongs_to :user, Hw08.Users.User
    belongs_to :task, Hw08.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(task_time, attrs) do
    task_time
    |> cast(attrs, [:time])
    |> validate_required([:time])
  end
end
