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

export default function ProfileUser() {
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
    return <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer items-center gap-2 transition-opacity outline-none hover:opacity-80">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={userData.avatar_url}
              alt={userData.full_name || userData.email || "User"}
            />

            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border-1 border-gray-200"
        sideOffset={5}
        align="end"
      >
        <div className="mb-2 px-3 py-2">
          {userData.full_name && (
            <p className="text-sm font-semibold text-gray-900">
              {userData.full_name}
            </p>
          )}
          {userData.email && (
            <p className="truncate text-xs text-gray-500">{userData.email}</p>
          )}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={handleGoToSeller}
        >
          <Store className="mr-2 h-4 w-4" />
          <span>Seller</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
