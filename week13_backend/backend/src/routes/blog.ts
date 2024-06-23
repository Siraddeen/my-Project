import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { creatBlogInput, updateBlogInput } from "@ronsen/w13";

import { decode, sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string | any };
}>();

blogRouter.use("/*", async (c, next) => {
  //get the header , verify the header
  //if the header is correct, we need can proceed to next()
  //if not, we return the user a 403 status code

  const authheader = c.req.header("authorization") || "";
  // bearer the token   means give a space between token & authorization // ben park ---> ['ben', 'park']

  try {
    const user = await verify(authheader, c.env.JWT_SECRET);

    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "you are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "you are not logged in",
    });
  }
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const body = await c.req.json();

  const { success } = creatBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "inputs are incorrect",
    });
  }

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(userId),
    },
  });

  return c.json({ id: blog.id });
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "inputs are incorrect",
    });
  }

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ id: blog.id });
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------

// add pagination later (10 blogs @ once )
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany();

  return c.json(blogs);
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: Number(id) },
    });

    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "error while fetching blog data",
    });
  }
});
