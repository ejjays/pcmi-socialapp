"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { FollowerInfo, UserData } from "@/lib/types";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import FollowButton from "./FollowButton";
import FollowerCount from "./FollowerCount";
import Linkify from "./Linkify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UserAvatar from "./UserAvatar";
import VerifiedCheckmark from "./VerifiedCheckmark";
import kyInstance from "@/lib/ky";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

export default function UserTooltip({ children, user }: UserTooltipProps) {
  const { user: loggedInUser } = useSession();
  const [isVerifying, setIsVerifying] = useState(false);

  const followerState: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: !!user.followers.some(
      ({ followerId }) => followerId === loggedInUser.id,
    ),
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      await kyInstance.post(`/api/users/username/[username]`, {
        json: { userId: user.id },
      });
      // Optionally, you can update the user data in the cache here
    } catch (error) {
      console.error("Error verifying user:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/users/${user.username}`}>
                <UserAvatar size={70} avatarUrl={user.avatarUrl} />
              </Link>
              {loggedInUser.id !== user.id && (
                <FollowButton userId={user.id} initialState={followerState} />
              )}
              {loggedInUser.isAdmin && (
                <button
                  className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={handleVerify}
                  disabled={isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify User"}
                }
                </button>
              )}
            </div>
            <div>
              <Link href={`/users/${user.username}`}>
                <div className="flex items-center">
                  <span className="text-lg font-semibold hover:underline">
                    {user.displayName}
                  </span>
                  <VerifiedCheckmark isVerified={user.isVerified} />
                </div>
                <div className="text-muted-foreground">@{user.username}</div>
              </Link>
            </div>
            {user.bio && (
              <Linkify>
                <div className="line-clamp-4 whitespace-pre-line">
                  {user.bio}
                </div>
              </Linkify>
            )}
            <FollowerCount userId={user.id} initialState={followerState} />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}