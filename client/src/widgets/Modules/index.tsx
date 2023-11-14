import { FC, useState } from 'react';
import styles from './modules.module.scss';
import {
  Add,
  Modal,
  ModalButton,
  ModalInput,
  ModalTitle,
  Module,
} from '@/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { moduleService } from '@/services';
import { useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IFolder, IModule } from '@/types';

interface ModulesLoaderData {
  modules: IModule[];
  folder: IFolder;
}

const Modules: FC = () => {
  const queryCLient = useQueryClient();
  const { modules: modulesLoader } = useLoaderData() as ModulesLoaderData;

  const { folderId } = useParams();

  const { data: modules } = useQuery({
    queryKey: ['modules'],
    queryFn: () => moduleService.getModules(folderId || ''),
    initialData: modulesLoader,
  });
  const [modalCreateModule, setModalCreateModule] = useState(false);
  const [newModalTitle, setNewModalTitle] = useState('');

  const { mutate: createModule } = useMutation({
    mutationKey: ['create module'],
    mutationFn: () => moduleService.createModule(folderId || '', newModalTitle),
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ['modules'] });
      toast.success('Модуль успешно создан');
      setNewModalTitle('');
      setModalCreateModule(false);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <>
      <div className={styles.modules}>
        {modules.map((module) => (
          <Module key={module.id} folderId={folderId || '-1'} module={module} />
        ))}
        <Add onClick={() => setModalCreateModule(true)} />
      </div>
      {modalCreateModule ? (
        <Modal isShow={modalCreateModule} setIsShow={setModalCreateModule}>
          <ModalTitle>Создать модуль</ModalTitle>
          <ModalInput
            value={newModalTitle}
            onChange={(e) => setNewModalTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createModule()}
          />
          <ModalButton onClick={() => createModule()}>Создать</ModalButton>
        </Modal>
      ) : null}
    </>
  );
};

export default Modules;
