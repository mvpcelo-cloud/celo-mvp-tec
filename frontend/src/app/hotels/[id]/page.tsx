import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import styles from "./page.module.css";
// import { prisma } from "@/lib/prisma"; // Uncomment when DB is ready

type Params = Promise<{ id: string }>;

export default async function HotelDetails({ params }: { params: Params }) {
    const { id } = await params;

    // Mock Data (Replace with Prisma query later)
    const hotel = {
        id,
        name: "Hotel Mazatlán Royal",
        description: "Experience the ultimate luxury in our oceanfront suites. Located in the heart of the Golden Zone, we offer premium amenities, a private beach club, and world-class dining.",
        address: "Av. Camarón Sábalo 123, Zona Dorada",
        rating: 4.8,
        reviews: 124,
        images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop"],
        rooms: [
            { id: "r1", name: "Ocean View Suite", price: 150, capacity: 2, image: "https://images.unsplash.com/photo-1590490360182-137d62341e1d?q=80&w=2072&auto=format&fit=crop" },
            { id: "r2", name: "Family Room", price: 220, capacity: 4, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop" }
        ]
    };

    return (
        <main className={styles.main}>
            <Navbar />

            {/* Hero */}
            <div className={styles.hero} style={{ backgroundImage: `url(${hotel.images[0]})` }}>
                <div className={styles.heroOverlay}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>{hotel.name}</h1>
                        <p className={styles.address}>📍 {hotel.address}</p>
                    </div>
                </div>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.grid}>
                    {/* Main Content */}
                    <div className={styles.details}>
                        <Card className={styles.infoCard}>
                            <div className={styles.ratingRow}>
                                <span className={styles.stars}>★ {hotel.rating}</span>
                                <span className={styles.reviewCount}>({hotel.reviews} reviews)</span>
                            </div>
                            <h2 className={styles.sectionTitle}>About this stay</h2>
                            <p className={styles.description}>{hotel.description}</p>

                            <div className={styles.amenities}>
                                {["Pool", "Wifi", "Beach Access", "Restaurant", "Bar"].map(a => (
                                    <span key={a} className={styles.amenity}>✓ {a}</span>
                                ))}
                            </div>
                        </Card>

                        <h2 className={styles.sectionTitle}>Available Rooms</h2>
                        <div className={styles.roomsList}>
                            {hotel.rooms.map(room => (
                                <Card key={room.id} className={styles.roomCard} noPadding>
                                    <div className={styles.roomImage} style={{ backgroundImage: `url(${room.image})` }} />
                                    <div className={styles.roomContent}>
                                        <div className={styles.roomHeader}>
                                            <h3 className={styles.roomName}>{room.name}</h3>
                                            <span className={styles.roomPrice}>${room.price} <small>/ night</small></span>
                                        </div>
                                        <p className={styles.capacity}>Suitable for {room.capacity} guests</p>
                                        <Button fullWidth size="sm" variant="secondary">Select Room</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        <Card className={styles.bookingCard} variant="elevated">
                            <h3 className={styles.bookingTitle}>Reserve your stay</h3>
                            <div className={styles.bookingForm}>
                                <div className={styles.priceSummary}>
                                    <span>Average Nightly</span>
                                    <span className={styles.totalPrice}>$185</span>
                                </div>
                                <Button fullWidth size="lg">Check Availability</Button>
                                <p className={styles.disclaimer}>You won't be charged yet</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
