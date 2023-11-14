import { FC, useState } from 'react';
import {
  Add,
  Folder,
  Modal,
  ModalButton,
  ModalInput,
  ModalTitle,
} from '@/components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { folderService } from '@/services';
import styles from './folders.module.scss';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { IFolder } from '@/types';

const Folders: FC = () => {
  const [newFolderTitle, setNewFolderTitle] = useState('');
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const foldersLoader = useLoaderData() as IFolder[];

  const { data: folders } = useQuery({
    queryKey: ['folders'],
    queryFn: () => folderService.getFolders(),
    initialData: foldersLoader,
  });

  const { mutate: createFolder } = useMutation({
    mutationKey: ['add folder'],
    mutationFn: () => folderService.createFolder(newFolderTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      setNewFolderTitle('');
      toast.success('Папка успешно добавлена');
      setOpen(false);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <div className={styles.folders}>
      {folders.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
      <Add onClick={() => setOpen(true)} />
      {open ? (
        <Modal isShow={open} setIsShow={setOpen}>
          <ModalTitle>Создать новую папку</ModalTitle>
          <ModalInput
            value={newFolderTitle}
            onChange={(e) => setNewFolderTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createFolder()}
          />
          <ModalButton onClick={() => createFolder()}>
            Создать новую папку
          </ModalButton>
        </Modal>
      ) : null}
    </div>
  );
};

export default Folders;
