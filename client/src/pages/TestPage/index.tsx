import { StartTestButton } from '@/components';
import { useTestStore } from '@/stores';
import { ICard } from '@/types';
import { FC, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { TestHeader, TestResults, TestWidget } from '@/widgets';
import { shuffleCards } from '@/utils';
import styles from './testPage.module.scss';

const TestPage: FC = () => {
  const { cards } = useLoaderData() as { cards: ICard[] };
  const { testIsStarted, setCards, setTestLength, currentCard } = useTestStore(
    (state) => state
  );

  useEffect(() => {
    setCards(shuffleCards(cards));
    setTestLength(cards.length);
  }, [cards, setCards, setTestLength]);

  return (
    <>
      {!testIsStarted ? <StartTestButton /> : null}
      {testIsStarted && currentCard !== cards.length ? (
        <div className={styles.test}>
          <TestHeader />
          <TestWidget />
        </div>
      ) : null}
      {testIsStarted && currentCard === cards.length ? <TestResults /> : null}
    </>
  );
};

export default TestPage;
