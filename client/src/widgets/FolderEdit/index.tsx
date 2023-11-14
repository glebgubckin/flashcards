import { Modal, ModalButton, ModalInput, ModalTitle } from '@/components';
import config from '@/config';
import { folderService } from '@/services';
import { IFolder, IModule } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './folderEdit.module.scss';

interface ModulesLoaderData {
  modules: IModule[];
  folder: IFolder;
}

const FolderEdit: FC = () => {
  const { folderId } = useParams();
  const { folder: folderLoader } = useLoaderData() as ModulesLoaderData;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: folder } = useQuery({
    queryKey: ['folder', folderId],
    queryFn: () => folderService.getFolderById(folderId || ''),
    initialData: folderLoader,
  });

  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditValue, setModalEditValue] = useState(folder.title);

  const [modalDelete, setModalDelete] = useState(false);

  const { mutate: updateFolderHandler } = useMutation({
    mutationKey: ['update folder', folderId],
    mutationFn: () => folderService.updateFolder(folder.id, modalEditValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folder', folderId] });
      toast.success('Успешно сохранено!');
      setModalEdit(false);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const { mutate: deleteFolderHandler } = useMutation({
    mutationKey: ['delete folder', folderId],
    mutationFn: () => folderService.deleteFolder(folder.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      setModalEdit(false);
      navigate('/');
      toast.success('Папка успешно удалена');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <>
      <div className={styles.folderEdit}>
        <h1 className={styles.folderName}>{folder.title}</h1>
        <button className={styles.btn} onClick={() => setModalEdit(true)}>
          <Edit color={config.baseColor} />
        </button>
        <button className={styles.btn} onClick={() => setModalDelete(true)}>
          <Trash2 color={config.dangerColor} />
        </button>
      </div>
      {modalEdit ? (
        <Modal isShow={modalEdit} setIsShow={setModalEdit}>
          <ModalTitle>Редактировать папку</ModalTitle>
          <ModalInput
            value={modalEditValue}
            onChange={(e) => setModalEditValue(e.target.value)}
          />
          <ModalButton onClick={() => updateFolderHandler()}>
            Сохранить
          </ModalButton>
        </Modal>
      ) : null}
      {modalDelete ? (
        <Modal isShow={modalDelete} setIsShow={setModalDelete}>
          <ModalTitle>Удалить папку</ModalTitle>
          <ModalButton onClick={() => deleteFolderHandler()} danger>
            Удалить
          </ModalButton>
        </Modal>
      ) : null}
    </>
  );
};

export default FolderEdit;
