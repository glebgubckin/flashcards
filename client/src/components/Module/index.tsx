import { FC } from 'react';
import { BookA } from 'lucide-react';
import { IModule } from '@/types';
import styles from './module.module.scss';
import { Link } from 'react-router-dom';

const Module: FC<{ folderId: string; module: IModule }> = ({
  folderId,
  module,
}) => {
  return (
    <Link to={`/${folderId}/${module.id}`} className={styles.module}>
      <BookA />
      {module.title}
    </Link>
  );
};

export default Module;
