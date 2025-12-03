"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Store, LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { UserData } from "@/app/types";

import LogoutButton from "./logout-button";

export default function ProfilePicture() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData>({
    email: undefined,
    avatar_url: undefined,
    full_name: undefined,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUserData({
            email: user.email,
            avatar_url: user.user_metadata?.avatar_url,
            full_name:
              user.user_metadata?.full_name || user.user_metadata?.name,
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleGoToSeller = () => {
    router.push("/seller");
  };

  const getInitials = (): string => {
    if (userData.full_name) {
      return userData.full_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }

    if (userData.email) {
      return userData.email.slice(0, 2).toUpperCase();
    }

    return "U";
  };

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 outline-none cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={userData.avatar_url}
              alt={userData.full_name || userData.email || "User"}
            />

            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border-1 border-gray-200"
        sideOffset={5}
        align="start"
      >
        <div className="px-3 py-2  mb-2">
          {userData.full_name && (
            <p className="text-sm font-semibold text-gray-900">
              {userData.full_name}
            </p>
          )}
          {userData.email && (
            <p className="text-xs text-gray-500 truncate">{userData.email}</p>
          )}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={handleGoToSeller}
        >
          <Store className="w-4 h-4 mr-2" />
          <span>Seller</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" variant="destructive">
          <LogOut className="w-4 h-4 mr-2" />
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
