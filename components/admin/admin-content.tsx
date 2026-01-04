"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, UserPlus, Search, Loader2, Check, X } from "lucide-react";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  admin: boolean;
  photoURL?: string;
}

export function AdminContent() {
  const router = useRouter();
  const { user, profile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [processingUser, setProcessingUser] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (profile && !profile.admin) {
      toast.error("You don't have permission to access this page");
      router.push("/");
      return;
    }

    fetchUsers();
  }, [user, profile, router]);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserProfile[];
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    if (userId === user?.uid) {
      toast.error("You cannot change your own admin status");
      return;
    }

    setProcessingUser(userId);
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { admin: !currentStatus });
      
      setUsers(users.map((u) => 
        u.id === userId ? { ...u, admin: !currentStatus } : u
      ));

      toast.success(
        currentStatus ? "Admin privileges removed" : "Admin privileges granted"
      );
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast.error("Failed to update admin status");
    } finally {
      setProcessingUser(null);
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email} ${u.username}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (!profile?.admin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Access Denied</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage users and administrators</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>
              Grant or revoke administrator privileges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? "No users found matching your search" : "No users found"}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((userItem, index) => (
                  <motion.div
                    key={userItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={userItem.photoURL} alt={userItem.firstName} />
                        <AvatarFallback>
                          {getInitials(userItem.firstName, userItem.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {userItem.firstName} {userItem.lastName}
                          </p>
                          {userItem.admin && (
                            <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              <Shield className="h-3 w-3" />
                              Admin
                            </span>
                          )}
                          {userItem.id === user?.uid && (
                            <span className="text-xs text-muted-foreground">(You)</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          @{userItem.username} • {userItem.email}
                        </p>
                      </div>
                    </div>

                    {userItem.id !== user?.uid && (
                      <Button
                        variant={userItem.admin ? "destructive" : "default"}
                        size="sm"
                        onClick={() => toggleAdmin(userItem.id, userItem.admin)}
                        disabled={processingUser === userItem.id}
                      >
                        {processingUser === userItem.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : userItem.admin ? (
                          <>
                            <X className="mr-2 h-4 w-4" />
                            Remove Admin
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Make Admin
                          </>
                        )}
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}