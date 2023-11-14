import { FC, useState } from 'react';
import styles from './cards.module.scss';
import {
  Add,
  Card,
  Modal,
  ModalButton,
  ModalDescription,
  ModalInput,
  ModalTitle,
} from '@/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';
import { cardService } from '@/services';
import { ICard } from '@/types';
import clsx from 'clsx';
import { toast } from 'react-toastify';

const Cards: FC = () => {
  const { moduleId } = useParams() as { moduleId: string };
  const { cards: cardsLoader } = useLoaderData() as { cards: ICard[] };
  const queryClient = useQueryClient();

  const { data: cards } = useQuery({
    queryKey: ['cards', moduleId],
    queryFn: () => cardService.getCards(moduleId),
    initialData: cardsLoader,
  });

  const [modalAddCard, setModalAddCard] = useState(false);
  const [modalAddCardValue, setModalAddCardValue] = useState({
    firstValue: '',
    secondValue: '',
  });

  const createCardValidate = () => {
    return (
      !modalAddCardValue.firstValue.length ||
      !modalAddCardValue.secondValue.length
    );
  };

  const { mutate: createCard } = useMutation({
    mutationKey: ['create card'],
    mutationFn: () =>
      cardService.createCard(
        moduleId,
        modalAddCardValue.firstValue,
        modalAddCardValue.secondValue
      ),
    onSuccess: () => {
      setModalAddCardValue({ firstValue: '', secondValue: '' });
      setModalAddCard(false);
      queryClient.invalidateQueries({ queryKey: ['cards', moduleId] });
      toast.success('Карточка успешна создана');
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={clsx({
            [styles.cards]: cards.length,
          })}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} moduleId={moduleId} />
          ))}
        </div>
        <Add onClick={() => setModalAddCard(true)} />
      </div>
      {modalAddCard ? (
        <Modal isShow={modalAddCard} setIsShow={setModalAddCard}>
          <ModalTitle>Добавить карточку</ModalTitle>
          <ModalDescription>Первое значение</ModalDescription>
          <ModalInput
            value={modalAddCardValue.firstValue}
            onChange={(e) =>
              setModalAddCardValue({
                ...modalAddCardValue,
                firstValue: e.target.value,
              })
            }
            onKeyDown={(e) => e.key === 'Enter' && createCard()}
          />
          <ModalDescription>Второе значение</ModalDescription>
          <ModalInput
            value={modalAddCardValue.secondValue}
            onChange={(e) =>
              setModalAddCardValue({
                ...modalAddCardValue,
                secondValue: e.target.value,
              })
            }
            onKeyDown={(e) => e.key === 'Enter' && createCard()}
          />
          <ModalButton
            disabled={createCardValidate()}
            onClick={() => createCard()}
          >
            Создать
          </ModalButton>
        </Modal>
      ) : null}
    </>
  );
};

export default Cards;
