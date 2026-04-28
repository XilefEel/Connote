import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { notesRoutes } from "./routes/note";
import { authRoutes } from "./routes/auth";

const app = new Elysia()
  .use(cors())
  .use(authRoutes)
  .use(notesRoutes)
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
