import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
        const rootClassName = `
      ${styles.button} 
      ${styles[variant]} 
      ${styles[size]} 
      ${fullWidth ? styles.fullWidth : ''} 
      ${className}
    `;

        return (
            <button ref={ref} className={rootClassName.trim()} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
