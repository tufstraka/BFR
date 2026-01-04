"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Clock, Share2, Bookmark } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/types";
import { toast } from "sonner";

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  const readingTime = Math.ceil(post.blogHTML.replace(/<[^>]*>/g, "").length / 1500);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.blogTitle,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <article className="min-h-screen pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[50vh] md:h-[60vh] overflow-hidden"
      >
        <Image
          src={post.blogCoverPhoto}
          alt={post.blogTitle}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="secondary"
            size="sm"
            className="glass"
            asChild
          >
            <Link href="/reviews">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reviews
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Card Header */}
          <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
            <div className="p-6 md:p-10">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={new Date(post.blogDate).toISOString()}>
                    {formatDate(post.blogDate, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                {post.blogTitle}
              </h1>

              {/* Actions */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>

              {/* Content */}
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: post.blogHTML }}
              />
            </div>
          </div>

          {/* Related Posts - Placeholder */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="text-center py-8 text-muted-foreground">
              <p>More reviews coming soon!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}