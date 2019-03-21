defmodule Hw08.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :admin, :boolean, default: false
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :password_hash, :string
    has_many :tasks, Hw08.Tasks.Task
    has_many :task_times, Hw08.TaskTimes.TaskTime

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :admin, :first_name, :last_name])
    |> validate_required([:email, :password_hash, :admin, :first_name, :last_name])
  end
end
