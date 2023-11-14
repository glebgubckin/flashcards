import { FC, useState } from 'react';
import {
  Modal,
  ModalButton,
  ModalDescription,
  ModalInput,
  ModalTitle,
} from '..';
import styles from './card.module.scss';
import { ICard } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cardService } from '@/services';
import { toast } from 'react-toastify';

interface CardProps {
  card: ICard;
  moduleId: string;
}

const Card: FC<CardProps> = ({ card, moduleId }) => {
  const queryClient = useQueryClient();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditValue, setModalEditValue] = useState({
    firstValue: card.firstValue,
    secondValue: card.secondValue,
  });

  const { mutate: updateCard } = useMutation({
    mutationKey: ['update card', card.id],
    mutationFn: () =>
      cardService.updateCard(
        card.id,
        modalEditValue.firstValue,
        modalEditValue.secondValue
      ),
    onSuccess: (data) => {
      setModalEdit(false);
      setModalEditValue(data);
      queryClient.invalidateQueries({ queryKey: ['cards', moduleId] });
      toast.success('Карточка успешно обновлена');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const { mutate: deleteCard } = useMutation({
    mutationKey: ['delete card', card.id],
    mutationFn: () => cardService.deleteCard(card.id),
    onSuccess: () => {
      setModalEdit(false);
      setModalEditValue({
        firstValue: card.firstValue,
        secondValue: card.secondValue,
      });
      queryClient.invalidateQueries({ queryKey: ['cards', moduleId] });
      toast.success('Карточка успешно удалена');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <>
      <div className={styles.card} onClick={() => setModalEdit(true)}>
        <p className={styles.text}>
          {card.firstValue} / {card.secondValue}
        </p>
      </div>
      {modalEdit ? (
        <Modal isShow={modalEdit} setIsShow={setModalEdit}>
          <ModalTitle>Редактировать карточку</ModalTitle>
          <ModalDescription>Первое значение</ModalDescription>
          <ModalInput
            value={modalEditValue.firstValue}
            onChange={(e) =>
              setModalEditValue({
                ...modalEditValue,
                firstValue: e.target.value,
              })
            }
          ></ModalInput>
          <ModalDescription>Второе значение</ModalDescription>
          <ModalInput
            value={modalEditValue.secondValue}
            onChange={(e) =>
              setModalEditValue({
                ...modalEditValue,
                secondValue: e.target.value,
              })
            }
          ></ModalInput>
          <ModalButton onClick={() => updateCard()}>Сохранить</ModalButton>
          <ModalButton danger onClick={() => deleteCard()}>
            Удалить
          </ModalButton>
        </Modal>
      ) : null}
    </>
  );
};

export default Card;
