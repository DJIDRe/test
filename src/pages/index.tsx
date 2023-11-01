
import { SignInButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

import Image from "next/image";

import { api } from "run/utils/api";
 
import type { RouterOutputs } from "run/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {

  const { user } = useUser();

  console.log(user);

  if (!user) return null;

  return <div className="flex w-full gap-3">
    <Image
      src={user.imageUrl}
      alt="Profile Image"
      className="w-14 h-14 rounded-full" 
      width={56}
      height={56}/>
    <input placeholder="type something" className="grow bg-transparent outline-none" />
  </div>

}

export default function Home() {

  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading ....</div>

  if (!data) return <div>something went wrong</div>

  type PostWithUser = RouterOutputs["posts"]["getAll"][number];
  const PostView = (props: PostWithUser) => {
    const { posts, author } = props;

    return (
      <div key={posts.id} className="flex border-b p-4 border-slate-400 gap-3">
        <Image 
        src={author.profilePicture} 
        className="w-14 h-14 rounded-full" 
        alt={`@${author.username}'s profile picture`}
        width={56}
        height={56}/>
        <div className="flex flex-col">
          <div className="flex font-bold text-slate-300 gap-1">
            <span>{`@${author.username}`}</span>
            <span className="font-thin">{` · ${dayjs(
              posts.createdAt
            ).fromNow()}`}</span>
          </div>
          <span>
            {posts.content}
          </span>
        </div>
      </div>
    );


  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!user.isSignedIn &&
              <div className="flex justify-center">
                <SignInButton />
              </div>
            }
            {user.isSignedIn && <CreatePostWizard />}
          </div>
          <div className="flex flex-col">
            {[...data, ...data]?.map((fullPost) => (
              <PostView {...fullPost} key={fullPost.posts.id} />
            ))}
          </div>


        </div>
      </main>
    </>
  );
}
