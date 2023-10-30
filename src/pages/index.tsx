
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { use } from "react";

import { api } from "run/utils/api";

export default function Home() {

  const CreatePostWizard = () => {

    const { user } = useUser();

    if(!user) return null;

    return <div className="flex gap-3">
      <img 
        src={user.imageUrl} 
        alt="Profile Image" 
        className="w-14 h-14 rounded-full"/>
        <input placeholder="type something" className="bg-transparent"/>
    </div>

  }

  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();

  if(isLoading) return <div>Loading ....</div>

  if(!data) return <div>something went wrong</div>


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
            {!user.isSignedIn && <CreatePostWizard/>}
          </div>
          <div className="flex flex-col">
            {[...data, ...data]?.map((posts) => (
              <div key={posts.id} className="boreder-b p-8 border-slate-400">{posts.content}</div>
            ))}
          </div>


        </div>
      </main>
    </>
  );
}
