import { FC } from 'react';
import { FolderEdit, Modules } from '@/widgets';

const FolderPage: FC = () => {
  return (
    <>
      <FolderEdit />
      <Modules />
    </>
  );
};

export default FolderPage;
