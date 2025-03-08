import { useEffect } from "react";
import Button from "../button/Button";
import useAddTodos from "../../hooks/useAddTodos";
import { fetchTodos } from "../../store/slices/TodoSlice";
import { useAppSelector } from "../../store/store";
import UpdateTodoModal from "../updateTodoModal/UpdateTodoModal";

export default function TodoList() {
  const { dispatch, isOpen, handleSetUpdate, handleDelete, handleToggleModal } =
    useAddTodos();
  const todos = useAppSelector((store) => store.todoSlice.todos) || [];
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <>
      <div className="container mx-auto p-6">
        {isOpen && (
          <div className="inset-0 fixed backdrop-blur bg-black bg-opacity-25">
            <UpdateTodoModal handleClose={handleToggleModal} />
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Edit</th>
                <th className="border border-gray-300 px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.length > 0 ? (
                todos?.map((todo) => (
                  <tr key={todo?.id} className="text-center hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {todo?.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {todo?.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {todo?.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Button
                        type="button"
                        onClick={() => handleSetUpdate(todo.id as number)}
                        title="Edite"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Button
                        onClick={() => handleDelete(todo.id as number)}
                        type="button"
                        title="Delete"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-3 text-gray-600">
                    No todos found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
