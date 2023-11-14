import { IModule } from '@/types';
import request from './api';

class ModuleService {
  async getModules(folderId: string): Promise<IModule[]> {
    return (await request.get(`modules/folder/${folderId}`)).data;
  }

  async getModuleById(moduleId: string): Promise<IModule> {
    return (await request.get(`modules/${moduleId}`)).data;
  }

  async createModule(folderId: string, title: string): Promise<IModule> {
    try {
      return (await request.post('modules', { folderId: +folderId, title }))
        .data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  async updateModule(moduleId: number, folderId: string, title: string) {
    try {
      return (
        await request.patch(`modules/${moduleId}`, {
          folderId: +folderId,
          title,
        })
      ).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  async deleteModule(moduleId: number) {
    try {
      return (await request.delete(`modules/${moduleId}`)).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }
}

const moduleService = new ModuleService();

export default moduleService;
