import React from 'react';
import styles from './ProtocolCard.module.css';

export interface ProtocolCardProps {
  title: string;
  description: string;
  warnings?: string[];
  suggestions?: string[];
  stepNumber?: number;
  totalSteps?: number;
}

export const ProtocolCard: React.FC<ProtocolCardProps> = ({
  title,
  description,
  warnings = [],
  suggestions = [],
  stepNumber,
  totalSteps,
}) => {
  return (
    <div className={styles.card}>
      {stepNumber && totalSteps && (
        <div className={styles.progress}>
          Etapa {stepNumber} de {totalSteps}
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      {warnings.length > 0 && (
        <div className={styles.warningsSection}>
          <h4 className={styles.sectionTitle}>Importante:</h4>
          <ul className={styles.list}>
            {warnings.map((warning, index) => (
              <li key={index} className={styles.warningItem}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className={styles.suggestionsSection}>
          <h4 className={styles.sectionTitle}>O que dizer:</h4>
          <div className={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <div key={index} className={styles.suggestionBubble}>
                "{suggestion}"
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
