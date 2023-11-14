import { FC, ComponentPropsWithoutRef } from 'react';
import styles from './add.module.scss';

const Add: FC<ComponentPropsWithoutRef<'button'>> = ({ ...props }) => {
  return (
    <button type='button' {...props} className={styles.add}>
      +
    </button>
  );
};

export default Add;
