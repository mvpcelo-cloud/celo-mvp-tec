import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Input } from "@/components/ui/Input/Input";
import styles from "./page.module.css";

type Params = Promise<{ id: string }>;

export default async function BookingPage({ params }: { params: Params }) {
    const { id } = await params;

    // Mock Hotel Data
    const hotel = {
        id,
        name: "Hotel Mazatlán Royal",
        roomName: "Ocean View Suite",
        pricePerNight: 150,
        hotelImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop"
    };

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
                                <Button variant="outline" className={styles.paymentBtn} fullWidth>Credit Card</Button>
                                <Button variant="outline" className={styles.paymentBtn} fullWidth>Celo Dollar (cUSD)</Button>
                            </div>
                            <p className={styles.secureNotice}>🔒 Payments are secure and encrypted</p>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className={styles.summarySection}>
                        <Card className={styles.summaryCard}>
                            <div className={styles.hotelHeader}>
                                <div className={styles.thumb} style={{ backgroundImage: `url(${hotel.hotelImage})` }} />
                                <div>
                                    <h3 className={styles.hotelName}>{hotel.name}</h3>
                                    <p className={styles.roomName}>{hotel.roomName}</p>
                                </div>
                            </div>

                            <div className={styles.divider} />

                            <h4 className={styles.priceTitle}>Price Details</h4>
                            <div className={styles.lineItem}>
                                <span>${hotel.pricePerNight} x 3 nights</span>
                                <span>${hotel.pricePerNight * 3}</span>
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
                                <span>Total (USD)</span>
                                <span>${(hotel.pricePerNight * 3) + 45 + 30}</span>
                            </div>

                            <Button size="lg" fullWidth style={{ marginTop: '24px' }}>
                                Confirm & Pay
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
