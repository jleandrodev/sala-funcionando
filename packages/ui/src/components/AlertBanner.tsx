import React from 'react';
import styles from './AlertBanner.module.css';

export interface AlertBannerProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type = 'info',
  title,
  message,
  onClose,
}) => {
  return (
    <div className={[styles.banner, styles[type]].join(' ')}>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.message}>{message}</div>
      </div>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">
          ×
        </button>
      )}
    </div>
  );
};
