
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { txHash, walletAddress, roomId, totalPrice, checkIn, checkOut } = await req.json();

        if (!txHash || !walletAddress || !roomId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // 1. Get User (ensure exists)
        const user = await prisma.user.findUnique({
            where: { walletAddress },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // 2. Create Booking
        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                roomId: roomId,
                totalPrice: totalPrice || 0,
                checkIn: new Date(checkIn || Date.now()),
                checkOut: new Date(checkOut || Date.now() + 86400000),
                status: "CONFIRMED", // Assumes verification done on client for MVP
            }
        });

        return NextResponse.json({ booking });
    } catch (error) {
        console.error("Booking Sync Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
