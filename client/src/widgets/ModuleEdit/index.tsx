import { Modal, ModalButton, ModalInput, ModalTitle } from '@/components';
import config from '@/config';
import { moduleService } from '@/services';
import { IModule } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './moduleEdit.module.scss';
import { Button } from '@nextui-org/react';

interface ModulePageLoaderData {
  module: IModule;
}

const ModuleEdit: FC = () => {
  const { folderId, moduleId } = useParams();
  const { module: moduleLoader } = useLoaderData() as ModulePageLoaderData;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: module } = useQuery({
    queryKey: ['module', moduleId],
    queryFn: () => moduleService.getModuleById(moduleId || ''),
    initialData: moduleLoader,
  });

  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditValue, setModalEditValue] = useState(module.title);

  const [modalDelete, setModalDelete] = useState(false);

  const { mutate: updateModuleHandler } = useMutation({
    mutationKey: ['update module', moduleId],
    mutationFn: () =>
      moduleService.updateModule(module.id, folderId || '-1', modalEditValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module', moduleId] });
      toast.success('Успешно сохранено!');
      setModalEdit(false);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const { mutate: deleteModuleHandler } = useMutation({
    mutationKey: ['delete module', moduleId],
    mutationFn: () => moduleService.deleteModule(module.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      setModalEdit(false);
      navigate(`/${folderId}`);
      toast.success('Папка успешно удалена');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <>
      <Link to={`/${folderId}`} className={styles.back}>
        Назад
      </Link>
      <div className={styles.moduleEdit}>
        <h1 className={styles.moduleName}>{module.title}</h1>
        <button className={styles.btn} onClick={() => setModalEdit(true)}>
          <Edit color={config.baseColor} />
        </button>
        <button className={styles.btn} onClick={() => setModalDelete(true)}>
          <Trash2 color={config.dangerColor} />
        </button>
        <Link to={`/test/${moduleId}`}>
          <Button color='success'>Начать тест</Button>
        </Link>
      </div>
      {modalEdit ? (
        <Modal isShow={modalEdit} setIsShow={setModalEdit}>
          <ModalTitle>Редактировать модуль</ModalTitle>
          <ModalInput
            value={modalEditValue}
            onChange={(e) => setModalEditValue(e.target.value)}
          />
          <ModalButton onClick={() => updateModuleHandler()}>
            Сохранить
          </ModalButton>
        </Modal>
      ) : null}
      {modalDelete ? (
        <Modal isShow={modalDelete} setIsShow={setModalDelete}>
          <ModalTitle>Удалить модуль</ModalTitle>
          <ModalButton onClick={() => deleteModuleHandler()} danger>
            Удалить
          </ModalButton>
        </Modal>
      ) : null}
    </>
  );
};

export default ModuleEdit;
