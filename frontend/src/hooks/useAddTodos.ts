import { useState } from "react";
import { useAppDispatch } from "../store/store";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  setUpdateTodo,
  updateTodo,
} from "../store/slices/TodoSlice";
export default function useAddTodos() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const data = {
        title: title,
        description: description,
      };
      await dispatch(addTodo(data)).unwrap();
      setTitle("");
      setDescription("");
      alert("Todo added successfully");
    } catch (error) {
      console.log("Error to add todo", error);
    }
  };

  const handleUpdate = async (
    e: React.FormEvent,
    id: number,
    close: () => void
  ) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const data = {
        id: id,
        title: title,
        description: description,
      };
      await dispatch(updateTodo(data)).unwrap();
      await dispatch(fetchTodos()).unwrap();
      close();
      setTitle("");
      setDescription("");
      alert("Todo updated successfully");
    } catch (error) {
      console.log("Error to update todo", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (id) {
        await dispatch(deleteTodo(id)).unwrap();
        alert("Todo deleted successfully");
      } else {
        alert("No todo selected to delete");
        return;
      }
    } catch (error) {
      console.log("Error to delete todo", error);
    }
  };

  const handleSetUpdate = async (id: number) => {
    try {
      if (id) {
        dispatch(setUpdateTodo(id));
        handleToggleModal();
      } else {
        alert("No todo selected to update");
        return;
      }
    } catch (error) {
      console.log("Error to set update", error);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    dispatch,
    isOpen,
    handleToggleModal,
    handleSubmit,
    handleUpdate,
    handleDelete,
    handleSetUpdate,
  };
}
