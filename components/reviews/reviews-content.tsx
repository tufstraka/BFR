"use client";

import * as React from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { BlogCard } from "@/components/blog/blog-card";
import { useBlogStore, useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { BlogPost } from "@/lib/types";

export function ReviewsContent() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { editMode, setEditMode } = useBlogStore();
  const { isAdmin } = useAuthStore();

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, "blogPosts");
        const q = query(postsRef, orderBy("date", "desc"));
        const snapshot = await getDocs(q);

        const fetchedPosts: BlogPost[] = snapshot.docs.map((doc) => ({
          blogID: doc.id,
          blogTitle: doc.data().blogTitle,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          blogDate: doc.data().date,
          profileId: doc.data().profileId,
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Reset edit mode on unmount
  React.useEffect(() => {
    return () => {
      setEditMode(false);
    };
  }, [setEditMode]);

  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card overflow-hidden animate-pulse"
          >
            <div className="aspect-[16/10] bg-muted" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-6 w-3/4 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">No reviews yet</h2>
        <p className="text-muted-foreground">
          Check back later for new reviews!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex items-center justify-end gap-3 mb-6 p-4 rounded-lg bg-muted/50 border border-border">
          <span className="text-sm font-medium">Edit Mode</span>
          <Switch
            checked={editMode}
            onCheckedChange={setEditMode}
            aria-label="Toggle edit mode"
          />
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post, index) => (
          <BlogCard key={post.blogID} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}