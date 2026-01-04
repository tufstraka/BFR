"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, RefreshCw, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/everything";

export function NewsContent() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Using a mock data approach since NewsAPI doesn't work on client-side in production
      // In a real app, you'd create a server action or API route
      const mockArticles: NewsArticle[] = [
        {
          title: "Latest Hollywood Blockbuster Breaks Box Office Records",
          description: "The newest superhero film has shattered opening weekend expectations, earning over $300 million globally.",
          url: "https://example.com/news/1",
          urlToImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
          publishedAt: new Date().toISOString(),
          source: { name: "Film Weekly" },
          author: "John Smith",
        },
        {
          title: "Legendary Director Announces Retirement",
          description: "After a career spanning five decades, the acclaimed filmmaker reveals his final project.",
          url: "https://example.com/news/2",
          urlToImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          source: { name: "Cinema Today" },
          author: "Jane Doe",
        },
        {
          title: "Streaming Wars Heat Up with New Platform Launch",
          description: "A major studio enters the streaming market with an exclusive lineup of original content.",
          url: "https://example.com/news/3",
          urlToImage: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          source: { name: "Digital Entertainment" },
          author: "Mike Johnson",
        },
        {
          title: "Award Season Predictions: Early Frontrunners Emerge",
          description: "Critics weigh in on which films are likely to dominate this year's awards ceremonies.",
          url: "https://example.com/news/4",
          urlToImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          source: { name: "Awards Daily" },
          author: "Sarah Williams",
        },
        {
          title: "Indie Film Festival Showcases Diverse Voices",
          description: "This year's festival highlights groundbreaking work from underrepresented filmmakers.",
          url: "https://example.com/news/5",
          urlToImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
          publishedAt: new Date(Date.now() - 345600000).toISOString(),
          source: { name: "Independent Film" },
          author: "Chris Lee",
        },
        {
          title: "VFX Technology Reaches New Heights",
          description: "Cutting-edge visual effects are transforming how stories are told on screen.",
          url: "https://example.com/news/6",
          urlToImage: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80",
          publishedAt: new Date(Date.now() - 432000000).toISOString(),
          source: { name: "Tech Cinema" },
          author: "Alex Chen",
        },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setArticles(mockArticles);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Unable to Load News</h2>
        <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
        <Button onClick={fetchNews}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={fetchNews} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.url}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={article.url} target="_blank" rel="noopener noreferrer">
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative h-48 overflow-hidden">
                  {article.urlToImage ? (
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-4xl">🎬</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary text-primary-foreground">
                      {article.source.name}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {article.description && (
                    <CardDescription className="line-clamp-2 mb-3">
                      {article.description}
                    </CardDescription>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(article.publishedAt, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <span>Read more</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}