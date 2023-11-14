import express from 'express';
import { moduleService } from '../services';

const moduleController = express.Router();

moduleController.get('/folder/:folderId', moduleService.getModulesByFolder);
moduleController.get('/:moduleId', moduleService.getModuleById);
moduleController.post('/', moduleService.createModule);
moduleController.patch('/:moduleId', moduleService.updateModule);
moduleController.delete('/:moduleId', moduleService.deleteModule);

export default moduleController;
