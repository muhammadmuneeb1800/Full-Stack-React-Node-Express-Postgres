import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { todosProps } from "../../types/types";

const initialState = {
  todos: [] as todosProps[],
  updateTodo: null as todosProps | null,
};

export const fetchTodos = createAsyncThunk("FetchTodos", async () => {
  try {
    const response = await axiosInstance.get("/api/post");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
});

export const addTodo = createAsyncThunk("AddTodo", async (todo: todosProps) => {
  try {
    const response = await axiosInstance.post("/api/post", todo);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
});

export const deleteTodo = createAsyncThunk("DeleteTodo", async (id: number) => {
  try {
    await axiosInstance.delete(`/api/post/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
});

export const updateTodo = createAsyncThunk(
  "UpdateTodo",
  async (todo: todosProps) => {
    try {
      const response = await axiosInstance.put(`/api/post/${todo.id}`, todo);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }
);

const Todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setUpdateTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      state.updateTodo = todo || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload || [];
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos =
        state.todos.filter((todo) => todo.id !== action.payload) || [];
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });
  },
});

export const { setUpdateTodo } = Todo.actions;
export default Todo.reducer;
