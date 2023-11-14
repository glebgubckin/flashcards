import { ICard } from '@/types';
import request from './api';

class CardService {
  async getCards(moduleId: string): Promise<ICard[]> {
    try {
      return (await request.get(`cards/${moduleId}`)).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  async createCard(
    moduleId: string,
    firstValue: string,
    secondValue: string
  ): Promise<ICard> {
    try {
      return (
        await request.post('cards', { moduleId, firstValue, secondValue })
      ).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  async updateCard(
    cardId: number,
    firstValue: string,
    secondValue: string
  ): Promise<ICard> {
    try {
      return (
        await request.patch(`cards/${cardId}`, { firstValue, secondValue })
      ).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }

  async deleteCard(cardId: number): Promise<ICard> {
    try {
      return (await request.delete(`cards/${cardId}`)).data;
    } catch (e: any) {
      throw new Error(e.response.data);
    }
  }
}

const cardService = new CardService();

export default cardService;
