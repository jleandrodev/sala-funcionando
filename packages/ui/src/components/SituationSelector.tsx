import React from 'react';
import styles from './SituationSelector.module.css';

export interface Situation {
  id: string;
  label: string;
  description?: string;
}

export interface SituationSelectorProps {
  situations: Situation[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

export const SituationSelector: React.FC<SituationSelectorProps> = ({
  situations,
  onSelect,
  selectedId,
}) => {
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
