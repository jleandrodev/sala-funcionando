import React from 'react';
import styles from './ConditionSelector.module.css';

export interface Condition {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ConditionSelectorProps {
  conditions: Condition[];
  onSelect: (id: string) => void;
  selectedId?: string;
}

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
  conditions,
  onSelect,
  selectedId,
}) => {
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
