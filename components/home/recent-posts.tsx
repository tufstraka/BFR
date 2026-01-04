import { collection, query, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost } from "@/lib/types";

async function getAuthorInfo(profileId: string | undefined): Promise<{ firstName: string; lastName: string; userName: string } | undefined> {
  if (!profileId) return undefined;
  
  try {
    const userDoc = await getDoc(doc(db, "users", profileId));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        userName: data.username || data.userName || "",
      };
    }
  } catch (error) {
    console.error("Error fetching author:", error);
  }
  return undefined;
}

async function getRecentPosts(): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, "blogPosts");
    const q = query(postsRef, orderBy("date", "desc"), limit(8));
    const snapshot = await getDocs(q);

    const posts = await Promise.all(
      snapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const author = await getAuthorInfo(data.profileId);
        
        return {
          blogID: docSnapshot.id,
          blogTitle: data.blogTitle || "",
          blogHTML: data.blogHTML || "",
          blogCoverPhoto: data.blogCoverPhoto || "",
          blogCoverPhotoName: data.blogCoverPhotoName || "",
          blogDate: data.date || Date.now(),
          profileId: data.profileId,
          author,
        };
      })
    );

    return posts;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}

export async function RecentPosts() {
  const posts = await getRecentPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No reviews available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post, index) => (
        <BlogCard key={post.blogID} post={post} index={index} />
      ))}
    </div>
  );
}