defmodule Hw08.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :title, :string
    belongs_to :user, Hw08.Users.User
    has_many :task_times, Hw08.TaskTimes.TaskTime

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed])
    |> validate_required([:title, :description, :completed])
  end
end
