import type { Metadata } from "next";
import { CreatePostForm } from "@/components/blog/create-post-form";

export const metadata: Metadata = {
  title: "Write a Review | Biased Film Review",
  description: "Share your thoughts and create a new review",
};

export default function CreatePostPage() {
  return (
    <main className="-mt-16 pt-16">
      <CreatePostForm />
    </main>
  );
}