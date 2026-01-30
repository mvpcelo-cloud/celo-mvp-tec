
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { address } = await req.json();

        if (!address) {
            return NextResponse.json({ error: "Address required" }, { status: 400 });
        }

        // Find or Create User
        const user = await prisma.user.upsert({
            where: { walletAddress: address },
            update: {},
            create: {
                walletAddress: address,
                role: "GUEST"
            }
        });

        return NextResponse.json({ user });
    } catch (error) {
        console.error("User Auth Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
