import type { Metadata } from "next";
import { ProfileContent } from "@/components/profile/profile-content";

export const metadata: Metadata = {
  title: "Profile | Biased Film Review",
  description: "Manage your profile settings",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <ProfileContent />
      </div>
    </main>
  );
}