defmodule Hw08Web.TaskTimeControllerTest do
  use Hw08Web.ConnCase

  alias Hw08.TaskTimes
  alias Hw08.TaskTimes.TaskTime

  @create_attrs %{
    time: 42
  }
  @update_attrs %{
    time: 43
  }
  @invalid_attrs %{time: nil}

  def fixture(:task_time) do
    {:ok, task_time} = TaskTimes.create_task_time(@create_attrs)
    task_time
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all task_times", %{conn: conn} do
      conn = get(conn, Routes.task_time_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create task_time" do
    test "renders task_time when data is valid", %{conn: conn} do
      conn = post(conn, Routes.task_time_path(conn, :create), task_time: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.task_time_path(conn, :show, id))

      assert %{
               "id" => id,
               "time" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.task_time_path(conn, :create), task_time: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update task_time" do
    setup [:create_task_time]

    test "renders task_time when data is valid", %{conn: conn, task_time: %TaskTime{id: id} = task_time} do
      conn = put(conn, Routes.task_time_path(conn, :update, task_time), task_time: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.task_time_path(conn, :show, id))

      assert %{
               "id" => id,
               "time" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, task_time: task_time} do
      conn = put(conn, Routes.task_time_path(conn, :update, task_time), task_time: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete task_time" do
    setup [:create_task_time]

    test "deletes chosen task_time", %{conn: conn, task_time: task_time} do
      conn = delete(conn, Routes.task_time_path(conn, :delete, task_time))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.task_time_path(conn, :show, task_time))
      end
    end
  end

  defp create_task_time(_) do
    task_time = fixture(:task_time)
    {:ok, task_time: task_time}
  end
end
