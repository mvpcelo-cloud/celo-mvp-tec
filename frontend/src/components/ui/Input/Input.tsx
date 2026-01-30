import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    block?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, block, ...props }, ref) => {
        return (
            <div className={`${styles.container} ${block ? styles.block : ''} ${className}`}>
                {label && <label className={styles.label}>{label}</label>}
                <input
                    ref={ref}
                    className={`${styles.input} ${error ? styles.hasError : ''}`}
                    {...props}
                />
                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
