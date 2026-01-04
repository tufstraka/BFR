"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Edit2, Trash2, User } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBlogStore, useAuthStore } from "@/lib/store";
import type { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { editMode, deletePost } = useBlogStore();
  const { isAdmin } = useAuthStore();

  const canEdit = isAdmin && editMode;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost(post.blogID);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Get author display name
  const authorName = post.author
    ? `${post.author.firstName} ${post.author.lastName}`.trim() || post.author.userName
    : "Anonymous";
  const authorInitials = post.author
    ? `${post.author.firstName?.[0] || ""}${post.author.lastName?.[0] || ""}`.toUpperCase() || post.author.userName?.[0]?.toUpperCase()
    : "A";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card
          className={cn(
            "group h-full overflow-hidden transition-all duration-300 hover:shadow-soft-lg",
            canEdit && "ring-2 ring-transparent hover:ring-primary"
          )}
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {canEdit && (
              <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full shadow-lg"
                  asChild
                >
                  <Link href={`/edit-post/${post.blogID}`}>
                    <Edit2 className="h-4 w-4" />
                    <span className="sr-only">Edit post</span>
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8 rounded-full shadow-lg"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete post</span>
                </Button>
              </div>
            )}
            <Image
              src={post.blogCoverPhoto}
              alt={post.blogTitle}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content */}
          <CardContent className="p-5">
            {/* Author and Date */}
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {authorInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground leading-tight">
                  {authorName}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={new Date(post.blogDate).toISOString()}>
                    {formatDate(post.blogDate)}
                  </time>
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {post.blogTitle}
            </h3>
          </CardContent>

          {/* Footer */}
          <CardFooter className="p-5 pt-0">
            <Link
              href={`/view-blog/${post.blogID}`}
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
            >
              Read More
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{post.blogTitle}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}