import React from 'react';
import styles from './ConditionSelector.module.css';

export interface Condition {
  id: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  textColor?: string;
}

export interface ConditionSelectorProps {
  conditions: Condition[];
  onSelect: (id: string) => void;
  selectedId?: string;
  variant?: 'grid' | 'list' | 'color-grid' | 'rect-grid';
}

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  conditions,
  onSelect,
  selectedId,
  variant = 'grid',
}) => {
  if (variant === 'rect-grid') {
    return (
      <div className={styles.rectGrid}>
        {conditions.map((condition) => (
          <button
            key={condition.id}
            className={[
              styles.rectGridItem,
              selectedId === condition.id ? styles.rectGridItemSelected : '',
            ].join(' ')}
            style={{
              backgroundColor: condition.color ?? '#6366F1',
              color: condition.textColor ?? '#ffffff',
            }}
            onClick={() => onSelect(condition.id)}
          >
            <span className={styles.rectGridIcon}>{condition.icon}</span>
            <span className={styles.rectGridLabel}>
              {condition.label.replace('\\n', '\n')}
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'color-grid') {
    return (
      <div className={styles.colorGrid}>
        {conditions.map((condition) => (
          <button
            key={condition.id}
            className={[
              styles.colorGridItem,
              selectedId === condition.id ? styles.colorGridItemSelected : '',
            ].join(' ')}
            style={{
              backgroundColor: condition.color ?? '#6366F1',
              color: condition.textColor ?? '#ffffff',
            }}
            onClick={() => onSelect(condition.id)}
          >
            <span className={styles.colorGridIcon}>{condition.icon}</span>
            <span className={styles.colorGridLabel}>
              {condition.label.replace('\\n', '\n')}
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={styles.list}>
        {conditions.map((condition) => (
          <button
            key={condition.id}
            className={[
              styles.listItem,
              selectedId === condition.id ? styles.listItemSelected : '',
            ].join(' ')}
            style={{
              backgroundColor: condition.color ?? '#f3f4f6',
              color: condition.textColor ?? '#111827',
            }}
            onClick={() => onSelect(condition.id)}
          >
            <span className={styles.listLabel}>{condition.label}</span>
            {condition.icon && <span className={styles.listIcon}>{condition.icon}</span>}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {conditions.map((condition) => (
        <button
          key={condition.id}
          className={[
            styles.item,
            selectedId === condition.id ? styles.selected : '',
          ].join(' ')}
          onClick={() => onSelect(condition.id)}
        >
          {condition.icon && <span className={styles.icon}>{condition.icon}</span>}
          <span className={styles.label}>{condition.label}</span>
        </button>
      ))}
    </div>
  );
};
