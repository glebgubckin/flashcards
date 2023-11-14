import { FC, ReactNode, ComponentPropsWithoutRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import clsx from 'clsx';

interface ModalProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isShow, setIsShow, children }) => {
  return createPortal(
    <div
      className={clsx({
        [styles.modal]: true,
        [styles['modal--show']]: isShow,
      })}
      onClick={() => setIsShow(false)}
    >
      <div
        className={clsx({
          [styles.modal__inner]: true,
          [styles['modal__inner--show']]: isShow,
        })}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const ModalTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return <h3 className={styles.heading}>{children}</h3>;
};

const ModalDescription: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className={styles.description}>{children}</p>;
};

const ModalInput: FC<ComponentPropsWithoutRef<'input'>> = ({ ...props }) => {
  return <input className={styles.input} {...props} />;
};

interface ModalButtonProps extends ComponentPropsWithoutRef<'button'> {
  danger?: boolean;
  children: ReactNode;
}

const ModalButton: FC<ModalButtonProps> = ({
  danger = false,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx({
        [styles.btn]: true,
        [styles.btn__danger]: danger,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export { Modal, ModalTitle, ModalDescription, ModalInput, ModalButton };
