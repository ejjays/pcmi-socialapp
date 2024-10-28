import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { username } }: { params: { username: string } }
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
      select: getUserDataSelect(loggedInUser.id),
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { username } }: { params: { username: string } }
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser || !loggedInUser.isAdmin) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await req.json();

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user's isVerified field using a raw SQL query
    await prisma.$queryRaw`
      UPDATE "users"
      SET "isVerified" = true
      WHERE "id" = ${userId}
    `;

    const updatedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return Response.json({ error: "Error updating user" }, { status: 500 });
  }
}