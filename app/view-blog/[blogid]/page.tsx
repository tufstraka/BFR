import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BlogContent } from "@/components/blog/blog-content";
import type { BlogPost } from "@/lib/types";

interface PageProps {
  params: Promise<{ blogid: string }>;
}

async function getBlogPost(blogId: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, "blogPosts", blogId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      blogID: docSnap.id,
      blogTitle: docSnap.data().blogTitle,
      blogHTML: docSnap.data().blogHTML,
      blogCoverPhoto: docSnap.data().blogCoverPhoto,
      blogCoverPhotoName: docSnap.data().blogCoverPhotoName,
      blogDate: docSnap.data().date,
      profileId: docSnap.data().profileId,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { blogid } = await params;
  const post = await getBlogPost(blogid);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.blogTitle,
    description: post.blogHTML.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      title: post.blogTitle,
      images: [post.blogCoverPhoto],
      type: "article",
    },
  };
}

export default async function ViewBlogPage({ params }: PageProps) {
  const { blogid } = await params;
  const post = await getBlogPost(blogid);

  if (!post) {
    notFound();
  }

  return <BlogContent post={post} />;
}