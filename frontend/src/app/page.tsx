import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Card } from "@/components/ui/Card/Card";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma"; // Direct server import

// Force dynamic rendering if needed, though default usually works
export const dynamic = 'force-dynamic';

export default async function Home() {
  const hotels = await prisma.hotel.findMany({
    take: 3,
    orderBy: { rating: 'desc' }
  });

  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Discover the Heart <br />
            of <span className={styles.highlight}>Mazatlán</span>
          </h1>
          <p className={styles.subtitle}>
            Experience luxury, culture, and the golden sands of the Pearl of the Pacific.
          </p>

          <Card className={styles.searchCard} variant="elevated">
            <div className={styles.searchGrid}>
              <Input placeholder="Location" label="Where to?" />
              <Input type="date" label="Check-in" />
              <Input type="date" label="Check-out" />
              <Input type="number" min={1} defaultValue={2} label="Guests" />
              <div className={styles.searchAction}>
                <Button fullWidth size="lg">Search Hotels</Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className={styles.filters}>
              {['Zona Dorada', 'Malecón', 'Centro Histórico', 'Marina', 'Pet Friendly'].map(filter => (
                <span key={filter} className={styles.filterChip}>{filter}</span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Section */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Stays</h2>
          <div className={styles.grid}>
            {hotels.map((hotel) => (
              <Card key={hotel.id} className={styles.hotelCard} noPadding>
                <div
                  className={styles.imagePlaceholder}
                  style={{ backgroundImage: `url(${hotel.images[0]})` }}
                />
                <div className={styles.cardContent}>
                  <div className={styles.hotelHeader}>
                    <h3 className={styles.hotelName}>{hotel.name}</h3>
                    <span className={styles.price}>from $100<small>/night</small></span>
                  </div>
                  <p className={styles.location}>{hotel.address}</p>
                  <div className={styles.rating}>★★★★★ {hotel.rating} (Review Count)</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
