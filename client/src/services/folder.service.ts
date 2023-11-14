import { IFolder } from '@/types';
import request from './api';

class FolderService {
  async getFolders(): Promise<IFolder[]> {
    return (await request.get('folders')).data;
  }

  async getFolderById(folderId: string): Promise<IFolder> {
    return (await request.get(`folders/${folderId}`)).data;
  }

  async createFolder(title: string): Promise<IFolder> {
    try {
      return (await request.post('folders', { title })).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  async updateFolder(folderId: number, title: string): Promise<IFolder> {
    try {
      return (await request.patch(`folders/${folderId}`, { title })).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  async deleteFolder(folderId: number): Promise<IFolder> {
    try {
      return (await request.delete(`folders/${folderId}`)).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }
}

const folderService = new FolderService();

export default folderService;
