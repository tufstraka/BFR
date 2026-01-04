"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import type { BlogPost } from "@/lib/types";

interface HeroStats {
  totalReviews: number;
  totalUsers: number;
}

interface HeroSectionProps {
  latestPost?: BlogPost | null;
  stats?: HeroStats;
}

export function HeroSection({ latestPost, stats }: HeroSectionProps) {
  const { isAuthenticated, profile } = useAuthStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Honest reviews that matter</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              {isAuthenticated ? (
                <>
                  Welcome back,{" "}
                  <span className="gradient-text">{profile?.firstName}</span>{" "}
                  <motion.span
                    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                    className="inline-block"
                  >
                    👋
                  </motion.span>
                </>
              ) : (
                <>
                  Your Source for{" "}
                  <span className="gradient-text">Honest Reviews</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Discover thoughtful opinions on the latest movies, TV shows, books,
              and games. Join our community of passionate reviewers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="group">
                    <Link href="/reviews">
                      Browse Reviews
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/create-post">Write a Review</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="group">
                    <Link href="/register">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/reviews">
                      <Play className="mr-2 h-4 w-4" />
                      Explore Reviews
                    </Link>
                  </Button>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-border"
            >
              {[
                { label: "Reviews", value: stats?.totalReviews ?? 0 },
                { label: "Categories", value: "4" },
                { label: "Members", value: stats?.totalUsers ?? 0 },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Illustration / Featured Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main card - Latest Post */}
              {latestPost ? (
                <Link href={`/view-blog/${latestPost.blogID}`}>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-card border border-border hover:shadow-3xl transition-shadow cursor-pointer group"
                  >
                    <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/5">
                      {latestPost.blogCoverPhoto ? (
                        <Image
                          src={latestPost.blogCoverPhoto}
                          alt={latestPost.blogTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                            <Play className="w-10 h-10 text-primary" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          <Sparkles className="w-3 h-3" />
                          Latest Review
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                          Featured
                        </span>
                        <span>
                          • {new Date(latestPost.blogDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {latestPost.blogTitle}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {latestPost.blogHTML.replace(/<[^>]*>/g, '').substring(0, 120)}...
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-card border border-border"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
                      <p className="text-muted-foreground text-sm">
                        Be the first to write a review!
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                        Getting Started
                      </span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">
                      Share Your Opinions
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Join our community and share your honest reviews on movies,
                      TV shows, books, and more.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Decorative cards */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-32 h-40 rounded-xl bg-primary/10 border border-primary/20 -z-10"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-40 h-32 rounded-xl bg-accent border border-border -z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}