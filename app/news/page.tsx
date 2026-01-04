import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsContent } from "@/components/news/news-content";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "News | Biased Film Review",
  description: "Latest movie and film industry news",
};

function NewsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default function NewsPage() {
  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Movie News</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest from the film industry
          </p>
        </div>
        <Suspense fallback={<NewsLoading />}>
          <NewsContent />
        </Suspense>
      </div>
    </main>
  );
}