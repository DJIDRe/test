import { createTRPCRouter, publicProcedure } from "run/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";


const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.imageUrl,
  };
}

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((posts) => posts.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    console.log(users);

    return posts.map((posts) => {
      const author = users.find((user) => user.id === posts.authorId);

      if(!author || !author.username) 
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR", 
          message: "author for post not found"
        });

      return {
        posts,
        author:{
          ...author,
          username: author.username,
        },
      };
    });
  }),
});
