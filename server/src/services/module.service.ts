import type { Request, Response } from 'express';
import { and, eq } from 'drizzle-orm';
import { Module, modules } from '../db/schema';
import db from '../index';

class ModulesService {
  async getModulesByFolder(req: Request, res: Response) {
    try {
      const modulesList = await db
        .select()
        .from(modules)
        .where(eq(modules.folderId, +req.params.folderId));
      res.status(200).send(modulesList);
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }

  async getModuleById(req: Request, res: Response) {
    try {
      const folder = await db
        .select()
        .from(modules)
        .where(eq(modules.id, +req.params.moduleId));
      res.status(200).send(folder[0]);
    } catch (e: any) {
      res.status(404).send('Модуль не найден');
    }
  }

  async createModule(req: Request, res: Response) {
    try {
      const moduleInFolderExists: Module[] = await db
        .select()
        .from(modules)
        .where(
          and(
            eq(modules.title, req.body.title),
            eq(modules.folderId, req.body.folderId),
          ),
        );
      if (moduleInFolderExists[0]) {
        res
          .status(400)
          .send('Модуль с таким названием в этой папке уже существует');
      } else {
        const newModule = await db
          .insert(modules)
          .values({ title: req.body.title, folderId: req.body.folderId })
          .returning();
        res.status(201).send(newModule);
      }
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }

  async updateModule(req: Request, res: Response) {
    try {
      const moduleInFolderExists: Module[] = await db
        .select()
        .from(modules)
        .where(
          and(
            eq(modules.title, req.body.title),
            eq(modules.folderId, req.body.folderId),
          ),
        );
      if (moduleInFolderExists.length) {
        res.status(400).send('Модуль с таким названием в этой папке уже есть');
      } else {
        const updatedModule = await db
          .update(modules)
          .set({ title: req.body.title })
          .where(eq(modules.id, +req.params.moduleId))
          .returning();
        res.status(204).send(updatedModule);
      }
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }

  async deleteModule(req: Request, res: Response) {
    try {
      const deletedModule = await db
        .delete(modules)
        .where(eq(modules.id, +req.params.moduleId))
        .returning();
      res.status(204).send(deletedModule);
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }
}

const moduleService = new ModulesService();

export default moduleService;
