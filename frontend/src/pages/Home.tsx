import TodoList from "../components/todoList/TodoList";
import AddTodo from "../components/addTodo/AddTodo";

export default function Home() {
  return (
    <>
      <h1 className="text-center pt-[5%] text-2xl md:text-4xl lg:text-5xl font-bold">
        All Todos
      </h1>
      <div className="mt-4 md:mt-7">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4">
          Add Todo
        </h2>
        <AddTodo />
      </div>
      <hr className="border-gray-200 mt-5" />
      <div className="bg-white mt-5 rounded-md shadow-md">
        <TodoList />
      </div>
    </>
  );
}
