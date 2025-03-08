import React, { useEffect } from "react";
import useAddTodos from "../../hooks/useAddTodos";
import TextInput from "../textInput/TextInput";
import Button from "../button/Button";
import { useAppSelector } from "../../store/store";

export default function UpdateTodoModal({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const { title, setTitle, description, setDescription, handleUpdate } =
    useAddTodos();
  const todo = useAppSelector((store) => store.todoSlice.updateTodo) || null;
  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo, setTitle, setDescription]);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Todo</h2>
          <form
            onSubmit={(e: React.FormEvent) =>
              handleUpdate(e, todo?.id as number, handleClose)
            }
            className="space-y-4"
          >
            <TextInput
              placeholder="Enter Title"
              title="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextInput
              placeholder="Enter Title"
              title="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end gap-2 items-center">
              <Button
                onClick={() => handleClose()}
                type="button"
                title="Cencel"
              />
              <Button type="submit" title="Update Todo" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
