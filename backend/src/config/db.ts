import { Pool } from "pg";

const con = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "admin",
  database: "todos",
});

export default con;
