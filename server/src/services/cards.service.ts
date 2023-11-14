import { Request, Response } from 'express';
import { and, eq } from 'drizzle-orm';
import { cards } from '../db/schema';
import db from '..';

class CardsService {
  async getCards(req: Request, res: Response) {
    const cardsList = await db
      .select()
      .from(cards)
      .where(eq(cards.moduleId, +req.params.moduleId));
    res.status(200).send(cardsList);
  }

  async createCard(req: Request, res: Response) {
    try {
      const cardExists = await db
        .select()
        .from(cards)
        .where(
          and(
            eq(cards.moduleId, req.body.moduleId),
            eq(cards.firstValue, req.body.firstValue),
            eq(cards.secondValue, req.body.secondValue),
          ),
        );
      if (cardExists.length) {
        res
          .status(404)
          .send('Карточка с такими значениями в этом модуле уже есть');
      }
      const createdCard = await db
        .insert(cards)
        .values({ ...req.body })
        .returning();
      res.status(201).send(createdCard[0]);
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }

  async updateCard(req: Request, res: Response) {
    try {
      const cardExists = await db
        .select()
        .from(cards)
        .where(eq(cards.id, +req.params.id));
      if (!cardExists.length) {
        res.status(404).send('Карточка не найдена');
      } else {
        const updatedCard = await db
          .update(cards)
          .set({ ...req.body })
          .where(eq(cards.id, +req.params.id))
          .returning();
        res.status(204).send(updatedCard[0]);
      }
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }

  async deleteCard(req: Request, res: Response) {
    try {
      const cardExists = await db
        .select()
        .from(cards)
        .where(eq(cards.id, +req.params.id));
      if (!cardExists.length) {
        res.status(404).send('Карточка не найдена');
      } else {
        const deletedCard = await db
          .delete(cards)
          .where(eq(cards.id, +req.params.id))
          .returning();
        res.status(204).send(deletedCard[0]);
      }
    } catch (e: any) {
      res.status(400).send('Произошла ошибка! Попробуйте позже');
    }
  }
}

const cardsService = new CardsService();

export default cardsService;
