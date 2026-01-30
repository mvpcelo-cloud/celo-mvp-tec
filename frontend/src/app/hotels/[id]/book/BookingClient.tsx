"use client";

import React, { useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/Button/Button";
import { HOTEL_BOOKING_ADDRESS } from "@/config/contracts";
import HotelBookingABI from "@/abi/HotelBooking.json";
import styles from "./BookingClient.module.css";

interface BookingClientProps {
    roomId: string; // The ID from our internal DB (mapped to contract ID if needed)
    price: number;
}

export function BookingClient({ roomId, price }: BookingClientProps) {
    const { isConnected, address } = useAccount();
    const { data: hash, writeContract, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const handleBooking = async () => {
        if (!isConnected || !address) return;

        try {
            // 1. Authenticate/Register User
            const authReq = await fetch('/api/auth/wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address })
            });

            if (!authReq.ok) throw new Error("Auth failed");

            // 2. Execute Contract Transaction
            // Note: In a real app we would map internal Room UUID to Contract Room ID (uint256).
            // For MVP, we pass a random numeric ID or hashing logic (e.g. last 8 chars of hex).
            // We'll use a numeric hash of the UUID for demo purposes.
            const numericRoomId = parseInt(roomId.slice(0, 8), 16);

            writeContract({
                address: HOTEL_BOOKING_ADDRESS as `0x${string}`,
                abi: HotelBookingABI.abi,
                functionName: 'bookRoom',
                args: [BigInt(numericRoomId)],
                value: BigInt(price * 1e18),
            });
        } catch (e) {
            console.error(e);
            alert("Error initializing booking");
        }
    };

    // 3. Sync Booking to DB on Success
    useEffect(() => {
        if (isSuccess && hash && address) {
            const syncBooking = async () => {
                try {
                    await fetch('/api/bookings/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            txHash: hash,
                            walletAddress: address,
                            roomId: roomId,
                            totalPrice: price,
                            checkIn: new Date().toISOString(),
                            checkOut: new Date(Date.now() + 86400000).toISOString()
                        })
                    });
                    console.log("Booking synced to DB");
                } catch (e) {
                    console.error("Failed to sync booking", e);
                }
            };
            syncBooking();
        }
    }, [isSuccess, hash, address, roomId, price]);

    return (
        <div className={styles.container}>
            {!isConnected ? (
                <div className={styles.connectWrapper}>
                    <ConnectButton label="Connect Wallet to Pay" />
                </div>
            ) : (
                <>
                    <Button
                        size="lg"
                        fullWidth
                        onClick={handleBooking}
                        disabled={isPending || isConfirming || isSuccess}
                        className={styles.payButton}
                    >
                        {isPending ? 'Confirming in Wallet...' :
                            isConfirming ? 'Processing Transaction...' :
                                isSuccess ? 'Booking Confirmed! 🎉' :
                                    `Pay ${price} CELO`}
                    </Button>

                    {error && (
                        <p className={styles.error}>Error: {error.message.slice(0, 50)}...</p>
                    )}

                    {isSuccess && (
                        <div className={styles.successMessage}>
                            <p>Transaction: {hash?.slice(0, 10)}...</p>
                            <p>See you at check-in!</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
