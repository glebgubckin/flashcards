import { FC } from 'react';
import styles from './testHeader.module.scss';
import { useLoaderData } from 'react-router-dom';
import { IModule } from '@/types';
import { useTestStore } from '@/stores';

const TestHeader: FC = () => {
  const { module } = useLoaderData() as { module: IModule };
  const { testLength, known, unknown } = useTestStore((state) => state);

  return (
    <div className={styles.testHeader}>
      <p className={styles.info}>Тест по модулю: {module.title}</p>
      <p className={styles.info}>Осталось: {testLength - known - unknown}</p>
    </div>
  );
};

export default TestHeader;
