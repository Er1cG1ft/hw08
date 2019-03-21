defmodule Hw08.TaskTimesTest do
  use Hw08.DataCase

  alias Hw08.TaskTimes

  describe "task_times" do
    alias Hw08.TaskTimes.TaskTime

    @valid_attrs %{time: 42}
    @update_attrs %{time: 43}
    @invalid_attrs %{time: nil}

    def task_time_fixture(attrs \\ %{}) do
      {:ok, task_time} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TaskTimes.create_task_time()

      task_time
    end

    test "list_task_times/0 returns all task_times" do
      task_time = task_time_fixture()
      assert TaskTimes.list_task_times() == [task_time]
    end

    test "get_task_time!/1 returns the task_time with given id" do
      task_time = task_time_fixture()
      assert TaskTimes.get_task_time!(task_time.id) == task_time
    end

    test "create_task_time/1 with valid data creates a task_time" do
      assert {:ok, %TaskTime{} = task_time} = TaskTimes.create_task_time(@valid_attrs)
      assert task_time.time == 42
    end

    test "create_task_time/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TaskTimes.create_task_time(@invalid_attrs)
    end

    test "update_task_time/2 with valid data updates the task_time" do
      task_time = task_time_fixture()
      assert {:ok, %TaskTime{} = task_time} = TaskTimes.update_task_time(task_time, @update_attrs)
      assert task_time.time == 43
    end

    test "update_task_time/2 with invalid data returns error changeset" do
      task_time = task_time_fixture()
      assert {:error, %Ecto.Changeset{}} = TaskTimes.update_task_time(task_time, @invalid_attrs)
      assert task_time == TaskTimes.get_task_time!(task_time.id)
    end

    test "delete_task_time/1 deletes the task_time" do
      task_time = task_time_fixture()
      assert {:ok, %TaskTime{}} = TaskTimes.delete_task_time(task_time)
      assert_raise Ecto.NoResultsError, fn -> TaskTimes.get_task_time!(task_time.id) end
    end

    test "change_task_time/1 returns a task_time changeset" do
      task_time = task_time_fixture()
      assert %Ecto.Changeset{} = TaskTimes.change_task_time(task_time)
    end
  end
end
