import { Suspense } from "react";
import { collection, query, orderBy, limit, getDocs, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedPosts } from "@/components/home/featured-posts";
import { RecentPosts } from "@/components/home/recent-posts";
import { SkeletonBlogGrid } from "@/components/ui/skeleton";
import type { BlogPost } from "@/lib/types";

async function getLatestPost(): Promise<BlogPost | null> {
  try {
    const postsRef = collection(db, "blogPosts");
    const q = query(postsRef, orderBy("date", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      blogID: doc.id,
      blogTitle: doc.data().blogTitle || "",
      blogHTML: doc.data().blogHTML || "",
      blogCoverPhoto: doc.data().blogCoverPhoto || "",
      blogCoverPhotoName: doc.data().blogCoverPhotoName || "",
      blogDate: doc.data().date || Date.now(),
      profileId: doc.data().profileId,
    };
  } catch (error) {
    console.error("Error fetching latest post:", error);
    return null;
  }
}

async function getStats(): Promise<{ totalReviews: number; totalUsers: number }> {
  try {
    const [postsCount, usersCount] = await Promise.all([
      getCountFromServer(collection(db, "blogPosts")),
      getCountFromServer(collection(db, "users")),
    ]);

    return {
      totalReviews: postsCount.data().count,
      totalUsers: usersCount.data().count,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { totalReviews: 0, totalUsers: 0 };
  }
}

export default async function HomePage() {
  const [latestPost, stats] = await Promise.all([
    getLatestPost(),
    getStats(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection latestPost={latestPost} stats={stats} />

      {/* Featured Posts */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Featured Reviews
            </h2>
            <p className="text-muted-foreground">
              Our top picks for you to explore
            </p>
          </div>
          <Suspense fallback={<SkeletonBlogGrid />}>
            <FeaturedPosts />
          </Suspense>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Latest Reviews
            </h2>
            <p className="text-muted-foreground">
              Fresh perspectives on entertainment
            </p>
          </div>
          <Suspense fallback={<SkeletonBlogGrid />}>
            <RecentPosts />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to share your thoughts?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community of passionate reviewers and share your honest
            opinions on the latest movies, TV shows, books, and games.
          </p>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
}