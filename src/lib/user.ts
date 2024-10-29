export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    isVerified: true,
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
    followers: {
      where: {
        followerId: loggedInUserId,
      },
    },
  };
}
