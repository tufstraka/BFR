"use client";

import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Eye, EyeOff, Loader2, ImageIcon, Save } from "lucide-react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase/config";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import type { BlogPost } from "@/lib/types";

// Dynamic import for Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "color",
  "background",
  "link",
  "image",
  "video",
];

interface EditPostFormProps {
  post: BlogPost;
}

export function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [title, setTitle] = useState(post.blogTitle);
  const [content, setContent] = useState(post.blogHTML);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(post.blogCoverPhoto);
  const [hasNewImage, setHasNewImage] = useState(false);

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      setHasNewImage(true);
    }
  }, []);

  const removeCoverImage = useCallback(() => {
    setCoverImage(null);
    setCoverPreview(post.blogCoverPhoto);
    setHasNewImage(false);
  }, [post.blogCoverPhoto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to edit a post");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please add some content");
      return;
    }

    setIsLoading(true);

    try {
      let coverPhotoURL = post.blogCoverPhoto;
      let coverPhotoName = post.blogCoverPhotoName;

      // Upload new cover image if changed
      if (hasNewImage && coverImage) {
        // Delete old image
        if (post.blogCoverPhotoName) {
          try {
            const oldImageRef = ref(storage, `blogCoverPhotos/${post.blogCoverPhotoName}`);
            await deleteObject(oldImageRef);
          } catch {
            // Old image may not exist, continue
          }
        }

        // Upload new image
        const imageRef = ref(storage, `blogCoverPhotos/${Date.now()}-${coverImage.name}`);
        await uploadBytes(imageRef, coverImage);
        coverPhotoURL = await getDownloadURL(imageRef);
        coverPhotoName = coverImage.name;
      }

      // Update blog post
      const postRef = doc(db, "blogPosts", post.blogID);
      await updateDoc(postRef, {
        blogTitle: title.trim(),
        blogHTML: content,
        blogCoverPhoto: coverPhotoURL,
        blogCoverPhotoName: coverPhotoName,
        updatedAt: serverTimestamp(),
      });

      toast.success("Post updated successfully!");
      router.push(`/view-blog/${post.blogID}`);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Edit
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </>
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showPreview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {coverPreview && (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h1 className="text-3xl font-bold mb-6">
                  {title || "Untitled Post"}
                </h1>
                <div
                  className="prose-content"
                  dangerouslySetInnerHTML={{ __html: content || "<p>Start writing...</p>" }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Cover Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={coverPreview}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    {hasNewImage && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={removeCoverImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <label className="cursor-pointer">
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        asChild
                      >
                        <span>
                          <ImageIcon className="h-4 w-4" />
                        </span>
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle>Title</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Enter your post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl"
                />
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[400px]">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your review..."
                    className="quill-editor"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}