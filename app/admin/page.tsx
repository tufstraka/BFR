import type { Metadata } from "next";
import { AdminContent } from "@/components/admin/admin-content";

export const metadata: Metadata = {
  title: "Admin | Biased Film Review",
  description: "Admin panel for managing users and content",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <AdminContent />
      </div>
    </main>
  );
}