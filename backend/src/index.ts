import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { notesRoutes } from "./routes/note";
import { authRoutes } from "./routes/auth";
import { usersRoutes } from "./routes/user";

const app = new Elysia()
  .use(cors())
  .use(authRoutes)
  .use(usersRoutes)
  .use(notesRoutes)
  .listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
