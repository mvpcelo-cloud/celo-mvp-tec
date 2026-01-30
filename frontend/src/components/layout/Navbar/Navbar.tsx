import React from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '../../ui/Button/Button';
import styles from './Navbar.module.css';

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Mazatlán<span className={styles.highlight}>Stay</span>
                </Link>
                <div className={styles.links}>
                    <Link href="/bookings" className={styles.navLink}>My Bookings</Link>
                    <ConnectButton showBalance={false} />
                    <Button size="sm" variant="primary">Book Now</Button>
                </div>
            </div>
        </nav>
    );
}
