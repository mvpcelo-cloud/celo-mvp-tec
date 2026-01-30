import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'elevated' | 'outlined' | 'flat';
    noPadding?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', variant = 'elevated', noPadding = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`
          ${styles.card} 
          ${styles[variant]} 
          ${noPadding ? styles.noPadding : ''} 
          ${className}
        `}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
