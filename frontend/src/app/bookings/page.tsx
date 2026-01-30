"use client";

import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Card } from "@/components/ui/Card/Card";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "./page.module.css";

interface Booking {
    id: string;
    totalPrice: number;
    status: string;
    checkIn: string;
    checkOut: string;
    room: {
        name: string;
        hotel: {
            name: string;
            images: string[];
        }
    }
}

export default function MyBookings() {
    const { address, isConnected } = useAccount();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (address) {
            setLoading(true);
            fetch(`/api/bookings?address=${address}`)
                .then(res => res.json())
                .then(data => {
                    if (data.bookings) setBookings(data.bookings);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [address]);

    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>My Bookings</h1>

                {!isConnected ? (
                    <div className={styles.connectState}>
                        <p>Please connect your wallet to view your bookings.</p>
                        <ConnectButton />
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {loading && <p>Loading bookings...</p>}

                        {!loading && bookings.length === 0 && (
                            <p>No bookings found for this wallet. Time for a vacation?</p>
                        )}

                        {bookings.map(booking => (
                            <Card key={booking.id} className={styles.bookingCard}>
                                <div className={styles.bookingHeader}>
                                    <h3>{booking.room.hotel.name}</h3>
                                    <span className={styles.statusBadge}>{booking.status}</span>
                                </div>
                                <div className={styles.bookingBody}>
                                    <p><strong>Room:</strong> {booking.room.name}</p>
                                    <p><strong>Date:</strong> {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</p>
                                    <p><strong>Total:</strong> {booking.totalPrice} CELO</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
