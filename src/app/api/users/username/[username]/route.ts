import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { username } }: { params: { username: string } }
) {
  // Existing GET handler code
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