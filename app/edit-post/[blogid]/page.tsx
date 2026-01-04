import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { EditPostForm } from "@/components/blog/edit-post-form";
import type { BlogPost } from "@/lib/types";

export const metadata: Metadata = {
  title: "Edit Post | Biased Film Review",
  description: "Edit your blog post",
};

interface PageProps {
  params: Promise<{ blogid: string }>;
}

async function getBlogPost(blogid: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, "blogPosts", blogid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      blogID: docSnap.id,
      ...docSnap.data(),
    } as BlogPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function EditPostPage({ params }: PageProps) {
  const { blogid } = await params;
  const post = await getBlogPost(blogid);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        <EditPostForm post={post} />
      </div>
    </main>
  );
}