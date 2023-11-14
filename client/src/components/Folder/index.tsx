import { FC } from 'react';
import { Folder as FolderIcon } from 'lucide-react';
import { IFolder } from '@/types';
import styles from './folder.module.scss';
import { Link } from 'react-router-dom';

const Folder: FC<{ folder: IFolder }> = ({ folder }) => {
  return (
    <Link to={`/${folder.id}`} className={styles.folder}>
      <FolderIcon />
      {folder.title}
    </Link>
  );
};

export default Folder;
