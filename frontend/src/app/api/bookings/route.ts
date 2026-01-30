
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ error: "Address required" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { walletAddress: address },
            include: {
                bookings: {
                    include: {
                        room: {
                            include: {
                                hotel: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ bookings: [] });
        }

        return NextResponse.json({ bookings: user.bookings });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
