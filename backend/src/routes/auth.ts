import { Elysia, t } from "elysia";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authRoutes = new Elysia({ prefix: "/auth" })

  .post(
    "/register",
    async ({ body, set }) => {
      const existing = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, body.username))
        .get();

      if (existing) {
        set.status = 400;
        return { message: "Username already taken" };
      }

      const existingEmail = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, body.email))
        .get();

      if (existingEmail) {
        set.status = 400;
        return { message: "Email already in use" };
      }

      const hashed = await bcrypt.hash(body.password, 10);

      const user = db
        .insert(usersTable)
        .values({
          username: body.username,
          email: body.email,
          password: hashed,
          createdAt: new Date().toISOString(),
        })
        .returning()
        .get();

      const { password, ...safeUser } = user;

      return { user: safeUser };
    },
    {
      body: t.Object({
        username: t.String({ pattern: "^[a-zA-Z0-9_]+$" }),
        email: t.String(),
        password: t.String(),
      }),
    },
  )

  .post(
    "/login",
    async ({ body, set }) => {
      const user = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, body.email))
        .get();

      if (!user) {
        set.status = 401;
        return { message: "Invalid email" };
      }

      const valid = await bcrypt.compare(body.password, user.password);

      if (!valid) {
        set.status = 401;
        return { message: "Invalid password" };
      }

      const { password, ...safeUser } = user;
      return { user: safeUser };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  );
