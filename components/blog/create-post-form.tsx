"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Eye,
  EyeOff,
  Loader2,
  ImageIcon,
  FileText,
  Sparkles,
  ArrowLeft,
  Check,
  AlertCircle
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/config";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Dynamic import for Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg border border-dashed border-border">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Loading editor...</p>
      </div>
    </div>
  ),
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
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
  "blockquote",
  "color",
  "background",
  "link",
  "image",
];

export function CreatePostForm() {
  const router = useRouter();
  const { user, profile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // Validation states
  const isTitleValid = title.trim().length >= 5;
  const isContentValid = content.replace(/<[^>]*>/g, '').trim().length >= 50;
  const hasCoverImage = !!coverImage;

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const removeCoverImage = useCallback(() => {
    setCoverImage(null);
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
      setCoverPreview(null);
    }
  }, [coverPreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create a post");
      return;
    }

    if (!isTitleValid) {
      toast.error("Title must be at least 5 characters");
      return;
    }

    if (!isContentValid) {
      toast.error("Content must be at least 50 characters");
      return;
    }

    if (!hasCoverImage) {
      toast.error("Please upload a cover image");
      return;
    }

    setIsLoading(true);

    try {
      // Upload cover image
      const imageRef = ref(storage, `blogCoverPhotos/${Date.now()}-${coverImage!.name}`);
      await uploadBytes(imageRef, coverImage!);
      const coverPhotoURL = await getDownloadURL(imageRef);

      // Create blog post with correct field name 'date' (not blogDate)
      await addDoc(collection(db, "blogPosts"), {
        blogTitle: title.trim(),
        blogHTML: content,
        blogCoverPhoto: coverPhotoURL,
        blogCoverPhotoName: coverImage!.name,
        profileId: user.uid,
        date: Date.now(),
        createdAt: serverTimestamp(),
      });

      toast.success("Review published successfully!");
      router.push("/reviews");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to publish review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const authorName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim() || profile.username
    : "You";

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-semibold hidden sm:inline">Write Review</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="gap-2"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </>
                )}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !isTitleValid || !isContentValid || !hasCoverImage}
                size="sm"
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Publishing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Publish</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,320px] gap-8">
          {/* Editor Area */}
          <AnimatePresence mode="wait">
            {showPreview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Preview Cover */}
                    {coverPreview ? (
                      <div className="relative aspect-[21/9] w-full">
                        <Image
                          src={coverPreview}
                          alt="Cover preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {title || "Untitled Review"}
                          </h1>
                          <div className="flex items-center gap-3 text-white/80">
                            <span className="text-sm">By {authorName}</span>
                            <span className="text-white/50">•</span>
                            <span className="text-sm">
                              {new Date().toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[21/9] w-full bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No cover image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Preview Content */}
                    <div className="p-8">
                      <div
                        className="prose-content max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: content || "<p class='text-muted-foreground'>Start writing your review...</p>"
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Cover Image Upload */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {coverPreview ? (
                    <Card className="overflow-hidden group relative">
                      <div className="relative aspect-[21/9]">
                        <Image
                          src={coverPreview}
                          alt="Cover preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <label className="cursor-pointer">
                              <Button variant="secondary" size="sm" asChild>
                                <span>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Replace
                                </span>
                              </Button>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageSelect}
                              />
                            </label>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={removeCoverImage}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <label
                      className={`
                        flex flex-col items-center justify-center w-full aspect-[21/9]
                        border-2 border-dashed rounded-xl cursor-pointer
                        transition-all duration-200
                        ${isDragging
                          ? "border-primary bg-primary/5 scale-[1.02]"
                          : "border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/50"
                        }
                      `}
                    >
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className={`
                          h-16 w-16 rounded-full flex items-center justify-center mb-4 transition-colors
                          ${isDragging ? "bg-primary/20" : "bg-muted"}
                        `}>
                          <ImageIcon className={`h-8 w-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <p className="mb-2 text-base font-medium">
                          {isDragging ? "Drop your image here" : "Add a cover image"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Drag & drop or click to upload (PNG, JPG up to 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                    </label>
                  )}
                </div>

                {/* Title Input */}
                <div>
                  <Input
                    placeholder="Give your review a catchy title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl md:text-3xl font-bold border-0 border-b border-border rounded-none px-0 py-4 focus-visible:ring-0 focus-visible:border-primary bg-transparent placeholder:text-muted-foreground/50"
                  />
                </div>

                {/* Content Editor */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="min-h-[450px]">
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Share your thoughts, opinions, and insights..."
                        className="quill-editor border-0"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Publishing Checklist */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Publishing Checklist
                </h3>
                <div className="space-y-3">
                  <ChecklistItem
                    checked={hasCoverImage}
                    label="Cover image uploaded"
                  />
                  <ChecklistItem
                    checked={isTitleValid}
                    label="Title (min. 5 characters)"
                  />
                  <ChecklistItem
                    checked={isContentValid}
                    label="Content (min. 50 characters)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5" />
                  Writing Tips
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Start with what makes this unique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Share your honest opinion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Avoid major spoilers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Consider who would enjoy this</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Author Preview */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Author</h3>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {profile?.firstName?.[0] || profile?.username?.[0] || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{authorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {profile?.email || user?.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChecklistItem({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`
        h-5 w-5 rounded-full flex items-center justify-center text-xs
        ${checked
          ? "bg-green-500 text-white"
          : "bg-muted text-muted-foreground border border-border"
        }
      `}>
        {checked ? <Check className="h-3 w-3" /> : null}
      </div>
      <span className={`text-sm ${checked ? "text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}