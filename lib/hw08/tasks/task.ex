defmodule Hw08.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :title, :string
    field :time, :integer
    belongs_to :user, Hw08.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :user_id, :time])
    |> validate_time(:time)
    |> validate_required([:title, :description])
  end
  
  def validate_time(changeset, field, _options \\ []) do
    validate_change(changeset, field, fn _, length ->
      if (rem(length, 15) != 0) do
        [time: "Please log time in 15 min increments."]
      else
        []
      end
    end)
  end
end
