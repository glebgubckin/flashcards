import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets';
import styles from './layout.module.scss';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          <Header />
          <div className={styles.page}>
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='colored'
      />
    </>
  );
};

export default Layout;
