import React from 'react';
import Link from 'next/link';
import { Button } from '../../ui/Button/Button';
import styles from './Navbar.module.css';

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    Mazatlán<span className={styles.highlight}>Stay</span>
                </Link>
                <div className={styles.actions}>
                    <Link href="/auth/login" className={styles.link}>Sign In</Link>
                    <Button size="sm" variant="primary">Book Now</Button>
                </div>
            </div>
        </nav>
    );
}
