import React from 'react';
import styles from './SituationSelector.module.css';

export interface Situation {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
  textColor?: string;
}

export interface SituationSelectorProps {
  situations: Situation[];
  onSelect: (id: string) => void;
  selectedId?: string;
  variant?: 'list' | 'rect-grid';
}

export const SituationSelector: React.FC<SituationSelectorProps> = ({
  situations,
  onSelect,
  selectedId,
  variant = 'list',
}) => {
  if (variant === 'rect-grid') {
    return (
      <div className={styles.rectGrid}>
        {situations.map((situation) => (
          <button
            key={situation.id}
            className={[
              styles.rectItem,
              selectedId === situation.id ? styles.rectItemSelected : '',
            ].join(' ')}
            style={situation.color ? {
              backgroundColor: situation.color,
              color: situation.textColor ?? '#ffffff',
            } : undefined}
            onClick={() => onSelect(situation.id)}
          >
            {situation.icon && (
              <span className={styles.rectIcon}>{situation.icon}</span>
            )}
            <div className={styles.rectContent}>
              <span className={styles.rectLabel}>{situation.label}</span>
              {situation.description && (
                <span className={styles.rectDescription}>{situation.description}</span>
              )}
            </div>
            <span className={styles.rectArrow}>→</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {situations.map((situation) => (
        <button
          key={situation.id}
          className={[
            styles.item,
            selectedId === situation.id ? styles.selected : '',
          ].join(' ')}
          onClick={() => onSelect(situation.id)}
        >
          <div className={styles.content}>
            <span className={styles.label}>{situation.label}</span>
            {situation.description && (
              <span className={styles.description}>{situation.description}</span>
            )}
          </div>
          <div className={styles.arrow}>→</div>
        </button>
      ))}
    </div>
  );
};
