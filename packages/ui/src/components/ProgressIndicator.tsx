import React from 'react';
import styles from './ProgressIndicator.module.css';

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  inverted?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  inverted = false,
}) => {
  const percentage = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <div className={[styles.container, inverted ? styles.inverted : ''].join(' ')}>
      <div className={styles.label}>
        <span>Progresso do Protocolo</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={styles.steps}>
        Etapa {currentStep} de {totalSteps}
      </div>
    </div>
  );
};
