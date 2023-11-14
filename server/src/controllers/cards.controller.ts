import express from 'express';
import { cardsService } from '../services';

const cardsController = express.Router();

cardsController.get('/:moduleId', cardsService.getCards);
cardsController.post('/', cardsService.createCard);
cardsController.patch('/:id', cardsService.updateCard);
cardsController.delete('/:id', cardsService.deleteCard);

export default cardsController;
