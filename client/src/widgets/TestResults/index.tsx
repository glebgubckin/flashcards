import { FC } from 'react';
import { useTestStore } from '@/stores';
import styles from './testResults.module.scss';

const TestResults: FC = () => {
  const { cards, known, unknown } = useTestStore((state) => state);

  return (
    <p className={styles.results}>
      Из {cards.length} выучено {known}, невыучено {unknown}
    </p>
  );
};

export default TestResults;
