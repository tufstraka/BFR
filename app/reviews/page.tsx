import type { Metadata } from "next";
import { Suspense } from "react";
import { ReviewsContent } from "@/components/reviews/reviews-content";
import { SkeletonBlogGrid } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Film Reviews",
  description: "Browse our collection of honest film and entertainment reviews",
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Film Reviews</h1>
          <p className="text-muted-foreground text-lg">
            Discover honest opinions on the latest movies and TV shows
          </p>
        </div>
        <Suspense fallback={<SkeletonBlogGrid />}>
          <ReviewsContent />
        </Suspense>
      </div>
    </div>
  );
}