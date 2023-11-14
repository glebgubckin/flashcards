import { FC } from 'react';
import { useTestStore } from '@/stores';
import styles from './startTestButton.module.scss';

const StartTestButton: FC = () => {
  const { setTestIsStarted } = useTestStore((state) => state);

  return (
    <button className={styles.startTest} onClick={() => setTestIsStarted(true)}>
      Начать тест
    </button>
  );
};

export default StartTestButton;
