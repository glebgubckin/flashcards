import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { folders } from '../db/schema';
import db from '..';

class FolderService {
  getFolders(req: Request, res: Response) {
    const foldersList = db.select().from(folders).all();
    res.status(200).send(foldersList);
  }

  async getFolderById(req: Request, res: Response) {
    try {
      const folder = await db
        .select()
        .from(folders)
        .where(eq(folders.id, +req.params.folderId));
      if (!folder.length) {
        res.status(404).send('Папка не найдена');
      }
      res.status(200).send(folder[0]);
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }

  async createFolder(req: Request, res: Response) {
    try {
      const newFolder = await db
        .insert(folders)
        .values({ title: req.body.title })
        .returning();
      res.status(201).send(newFolder);
    } catch (e: any) {
      if (e.message === 'UNIQUE constraint failed: folders.title') {
        res.status(400).send('Папка с таким названием уже существует');
      } else {
        res.status(400).send('Произошла ошибка! Попробуйте позже');
      }
    }
  }

  async updateFolder(req: Request, res: Response) {
    try {
      const updatedFolder = await db
        .update(folders)
        .set({ title: req.body.title })
        .where(eq(folders.id, +req.params.folderId))
        .returning();
      res.status(204).send(updatedFolder);
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }

  async deleteFolder(req: Request, res: Response) {
    try {
      const deletedFolder = await db
        .delete(folders)
        .where(eq(folders.id, +req.params.folderId))
        .returning();
      res.status(204).send(deletedFolder);
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }
}

const folderService = new FolderService();

export default folderService;
