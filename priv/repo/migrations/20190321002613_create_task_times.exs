defmodule Hw08.Repo.Migrations.CreateTaskTimes do
  use Ecto.Migration

  def change do
    create table(:task_times) do
      add :time, :integer
      add :user_id, references(:users, on_delete: :nothing)
      add :task_id, references(:tasks, on_delete: :nothing)

      timestamps()
    end

    create index(:task_times, [:user_id])
    create index(:task_times, [:task_id])
  end
end
