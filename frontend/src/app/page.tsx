import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Card } from "@/components/ui/Card/Card";
import styles from "./page.module.css";

export default function Home() {
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
          </Card>
        </div>
      </section>

      {/* Featured Section */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Stays</h2>
          <div className={styles.grid}>
            {[1, 2, 3].map((i) => (
              <Card key={i} className={styles.hotelCard} noPadding>
                <div className={styles.imagePlaceholder} />
                <div className={styles.cardContent}>
                  <div className={styles.hotelHeader}>
                    <h3 className={styles.hotelName}>Hotel Mazatlán Royal</h3>
                    <span className={styles.price}>$120<small>/night</small></span>
                  </div>
                  <p className={styles.location}>Zona Dorada • 500m from beach</p>
                  <div className={styles.rating}>★★★★★ 4.9 (120 reviews)</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
