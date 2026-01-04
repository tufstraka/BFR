import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, BlogPost, ToastMessage, UserProfile } from "./types";

// Auth store
interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: true,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      setProfile: (profile) => set({ profile }),
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      setIsLoading: (isLoading) => set({ isLoading }),
      logout: () =>
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
          isAdmin: false,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);

// Blog store
interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  isEditing: boolean;
  editMode: boolean;
  // Form state
  blogTitle: string;
  blogHTML: string;
  blogPhotoName: string;
  blogPhotoFileURL: string | null;
  blogPhotoPreview: boolean;
  // Actions
  setPosts: (posts: BlogPost[]) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  setCurrentPost: (post: BlogPost | null) => void;
  setEditMode: (editMode: boolean) => void;
  setBlogTitle: (title: string) => void;
  setBlogHTML: (html: string) => void;
  setBlogPhotoName: (name: string) => void;
  setBlogPhotoFileURL: (url: string | null) => void;
  toggleBlogPhotoPreview: () => void;
  resetBlogForm: () => void;
  setBlogState: (post: BlogPost) => void;
}

export const useBlogStore = create<BlogState>()((set) => ({
  posts: [],
  currentPost: null,
  isEditing: false,
  editMode: false,
  blogTitle: "",
  blogHTML: "",
  blogPhotoName: "",
  blogPhotoFileURL: null,
  blogPhotoPreview: false,
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.blogID === id ? { ...post, ...updatedPost } : post
      ),
    })),
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.blogID !== id),
    })),
  setCurrentPost: (post) => set({ currentPost: post }),
  setEditMode: (editMode) => set({ editMode }),
  setBlogTitle: (title) => set({ blogTitle: title }),
  setBlogHTML: (html) => set({ blogHTML: html }),
  setBlogPhotoName: (name) => set({ blogPhotoName: name }),
  setBlogPhotoFileURL: (url) => set({ blogPhotoFileURL: url }),
  toggleBlogPhotoPreview: () =>
    set((state) => ({ blogPhotoPreview: !state.blogPhotoPreview })),
  resetBlogForm: () =>
    set({
      blogTitle: "",
      blogHTML: "",
      blogPhotoName: "",
      blogPhotoFileURL: null,
      blogPhotoPreview: false,
    }),
  setBlogState: (post) =>
    set({
      blogTitle: post.blogTitle,
      blogHTML: post.blogHTML,
      blogPhotoFileURL: post.blogCoverPhoto,
      blogPhotoName: post.blogCoverPhotoName || "",
    }),
}));

// Toast store
interface ToastState {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: Math.random().toString(36).substring(7) },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),
}));

// UI store
interface UIState {
  isMobileMenuOpen: boolean;
  isProfileMenuOpen: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleProfileMenu: () => void;
  closeProfileMenu: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isProfileMenuOpen: false,
  isModalOpen: false,
  modalContent: null,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleProfileMenu: () =>
    set((state) => ({ isProfileMenuOpen: !state.isProfileMenuOpen })),
  closeProfileMenu: () => set({ isProfileMenuOpen: false }),
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
}));