import Layout from '@/layouts';
import { FolderPage, HomePage, ModulePage, TestPage } from '@/pages';
import { folderService, moduleService, cardService } from '@/services';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        loader: async () => folderService.getFolders(),
      },
      {
        path: '/test/:moduleId',
        element: <TestPage />,
        loader: async ({ params }) => {
          const module = await moduleService.getModuleById(
            params.moduleId || ''
          );
          const cards = await cardService.getCards(params.moduleId || '');
          return {
            module,
            cards,
          };
        },
      },
      {
        path: '/:folderId',
        element: <FolderPage />,
        loader: async ({ params }) => {
          const modules = await moduleService.getModules(params.folderId || '');
          const folder = await folderService.getFolderById(
            params.folderId || ''
          );
          return {
            modules,
            folder,
          };
        },
      },
      {
        path: '/:folderId/:moduleId',
        element: <ModulePage />,
        loader: async ({ params }) => {
          const module = await moduleService.getModuleById(
            params.moduleId || ''
          );
          const cards = await cardService.getCards(params.moduleId || '');
          return {
            module,
            cards,
          };
        },
      },
    ],
  },
]);

export default router;
