import express from "express";
import cors from "cors";
import db from "./config/db";

const app = express();

app.use(express.json());

app.use(cors());

// create post

app.post("/api/post", async (req, res) => {
  try {
    const { title, description } = req.body;
    const query =
      "INSERT INTO todos (title,description) VALUES ($1,$2) RETURNING *;";
    const values = [title, description];
    const data = await db.query(query, values);
    res.status(201).json(data.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "error to insert, Server error" });
  }
});

// get all posts

app.get("/api/post", async (req, res) => {
  try {
    const query = "SELECT * FROM todos";
    const data = await db.query(query);
    res.json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "error to get, Server error" });
  }
});

// update post

app.put("/api/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const query =
      "UPDATE todos SET title = $1 ,description = $2 WHERE id = $3 RETURNING *";
    const values = [title, description, id];
    const data = await db.query(query, values);
    res.status(201).json({ message: "update", data: data.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "error to update, Server error" });
  }
});

// delete post

app.delete("/api/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM todos WHERE id = $1 RETURNING *";
    const values = [id];
    const data = await db.query(query, values);
    res.status(201).json({ message: "delete", data: data.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "error to delete, Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
