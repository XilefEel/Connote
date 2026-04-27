import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { notesRoutes } from "./routes/note";

const app = new Elysia()
  .use(cors())
  .use(notesRoutes)
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
