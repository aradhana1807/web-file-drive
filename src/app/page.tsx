"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


export default function Home() {
  const files = useQuery(api.files.getFiles)
  const createFile = useMutation(api.files.createFile)
  return (
    <main className="flex min-h-screen items-center justify-evenly">
      <SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      {
        files?.map(file => {
          return (
            <div key={file.id}>
              {file.name}
            </div>
          )
        })
      }

      <Button onClick={() => {
        createFile({ name: "test" })
      }}>
        Create File
      </Button>
    </main>
  );
}
