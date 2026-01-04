// User types - matches Firebase Auth User
export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  emailVerified?: boolean;
}

// User profile from Firestore
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  admin?: boolean;
  photoURL?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  emailVerified: boolean;
}

// Blog post types
export interface BlogPost {
  blogID: string;
  blogTitle: string;
  blogHTML: string;
  blogCoverPhoto: string;
  blogCoverPhotoName?: string;
  blogDate: number;
  profileId?: string;
  author?: {
    firstName: string;
    lastName: string;
    userName: string;
  };
}

export interface BlogPostFormData {
  title: string;
  content: string;
  coverPhoto: File | null;
  coverPhotoUrl?: string;
}

// News article types
export interface NewsArticle {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string | null;
  author?: string | null;
  publishedAt: string;
  source: {
    id?: string | null;
    name: string;
  };
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  userName: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation types
export interface NavLink {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

// Toast types
export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and sort types
export interface FilterOptions {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Modal types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

// Component prop types
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WithLoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

export interface WithErrorProps {
  error?: string | null;
}