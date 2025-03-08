import React from "react";
import useAddTodos from "../../hooks/useAddTodos";
import TextInput from "../textInput/TextInput";
import Button from "../button/Button";

export default function AddTodo() {
  const { title, setTitle, description, setDescription, handleSubmit } =
    useAddTodos();
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-6 w-full"
      >
        <TextInput
          placeholder="Enter Title"
          title="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          placeholder="Enter Description"
          title="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <Button type="submit" title="Add Todo" />
        </div>
      </form>
    </>
  );
}
