import express from 'express';
import { folderService } from '../services';

const folderController = express.Router();

/**
 * @swagger
 * /api/folders:
 *   get:
 *     summary: Получить список папок
 *     description: Возвращает список всех папок
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает список папок.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: Нормальное название папки
 *               - id: 2
 *                 title: Другое название папки
 *       400:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             example:
 *               error: Произошла ошибка! Попробуйте позже
 */
folderController.get('/', folderService.getFolders);
/**
 * @swagger
 * /api/folders/{folderId}:
 *   get:
 *     summary: Получение папки по её ID
 *     description: Возвращает папку с указанным ID.
 *     parameters:
 *       - in: path
 *         name: folderId
 *         required: true
 *         description: ID папки для получения.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешный ответ. Возвращает данные папки.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: Название папки
 *       404:
 *         description: Папка с указанным ID не найдена.
 *         content:
 *           application/json:
 *             example:
 *               error: Папка не найдена
 *       400:
 *         description: Ошибка сервера.
 *         content:
 *           application/json:
 *             example:
 *               error: Произошла ошибка! Попробуйте позже
 */
folderController.get('/:folderId', folderService.getFolderById);

folderController.post('/', folderService.createFolder);
folderController.patch('/:folderId', folderService.updateFolder);
folderController.delete('/:folderId', folderService.deleteFolder);

export default folderController;
