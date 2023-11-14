import { FC, MouseEvent, useState } from 'react';
import { Button } from '@nextui-org/react';
import styles from './testWidget.module.scss';
import { useTestStore } from '@/stores';

const TestWidget: FC = () => {
  const {
    cards,
    currentCard,
    setCurrentCard,
    known,
    setKnown,
    unknown,
    setUnknown,
  } = useTestStore((state) => state);
  const [secondValueWatch, setSecondValueWatch] = useState(false);

  const handler = (
    e: MouseEvent<HTMLButtonElement>,
    type: 'known' | 'unknown'
  ) => {
    e.preventDefault();
    if (type === 'known') {
      setKnown(known + 1);
    } else {
      setUnknown(unknown + 1);
    }
    setSecondValueWatch(false);
    setCurrentCard(currentCard + 1);
  };

  return (
    <div className={styles.test}>
      <Button
        variant='ghost'
        color='danger'
        size='lg'
        onClick={(e) => handler(e, 'unknown')}
      >
        Не знаю
      </Button>
      <div
        className={styles.card}
        onClick={() => setSecondValueWatch((prev) => !prev)}
      >
        {secondValueWatch
          ? cards[currentCard]?.secondValue
          : cards[currentCard]?.firstValue}
      </div>
      <Button color='success' size='lg' onClick={(e) => handler(e, 'known')}>
        Знаю
      </Button>
    </div>
  );
};

export default TestWidget;
