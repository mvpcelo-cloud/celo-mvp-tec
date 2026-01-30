import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
// import { ConnectButton } from '@rainbow-me/rainbowkit'; // Moved to Client Component
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BookingClient } from "./BookingClient";

type Params = Promise<{ id: string }>;

export default async function BookingPage({ params }: { params: Params }) {
    const { id } = await params;

    // Fetch Room Data (Room is connected to Hotel via ID)
    // Actually we need to fetch Hotel AND Room info. 
    // The URL structure is /hotels/[id]/book, but we need to know WHICH room.
    // For MVP simplicity, we will assume user selected the *first* room or pass ?roomId query param.
    // Let's just fetch the Hotel and its first room for demo.

    const hotel = await prisma.hotel.findUnique({
        where: { id },
        include: { rooms: true }
    });

    if (!hotel || hotel.rooms.length === 0) {
        notFound();
    }

    const room = hotel.rooms[0]; // Logic simplification for MVP

    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Confirm your booking</h1>

                <div className={styles.grid}>
                    {/* Booking Form */}
                    <div className={styles.formSection}>
                        <Card className={styles.card}>
                            <h2 className={styles.sectionTitle}>Your Details</h2>
                            <div className={styles.formGrid}>
                                <Input label="First Name" placeholder="John" />
                                <Input label="Last Name" placeholder="Doe" />
                                <Input label="Email" type="email" placeholder="john@example.com" block />
                                <Input label="Phone" type="tel" placeholder="+52 ..." block />
                            </div>

                            <h2 className={styles.sectionTitle} style={{ marginTop: '32px' }}>Payment</h2>
                            <div className={styles.paymentMethods}>
                                {/* <Button variant="outline" className={styles.paymentBtn} fullWidth>Credit Card (Disabled)</Button> */}
                                <div className={styles.connectWrapper}>
                                    {/* Client Component Handles Connection & Transaction */}
                                    <BookingClient roomId={room.id} price={room.price} />
                                </div>
                            </div>
                            <p className={styles.secureNotice}>🔒 Payments are secure and encrypted</p>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className={styles.summarySection}>
                        <Card className={styles.summaryCard}>
                            <div className={styles.hotelHeader}>
                                <div className={styles.thumb} style={{ backgroundImage: `url(${hotel.images[0]})` }} />
                                <div>
                                    <h3 className={styles.hotelName}>{hotel.name}</h3>
                                    <p className={styles.roomName}>{room.name}</p>
                                </div>
                            </div>

                            <div className={styles.divider} />

                            <h4 className={styles.priceTitle}>Price Details</h4>
                            <div className={styles.lineItem}>
                                <span>{room.price} CELO x 1 night</span>
                                <span>{room.price} CELO</span>
                            </div>
                            <div className={styles.lineItem}>
                                <span>Service Fee</span>
                                <span>$45</span>
                            </div>
                            <div className={styles.lineItem}>
                                <span>Taxes</span>
                                <span>$30</span>
                            </div>

                            <div className={styles.divider} />

                            <div className={styles.totalRow}>
                                <span>Total (CELO)</span>
                                <span>{room.price} CELO</span>
                            </div>

                            {/* <Button size="lg" fullWidth style={{ marginTop: '24px' }}>
                                Confirm & Pay
                            </Button> */ }
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
