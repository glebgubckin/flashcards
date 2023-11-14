import express from 'express';
import {
  folderController,
  moduleController,
  cardsController,
} from '../controllers';

const router = express.Router();

router.use('/folders', folderController);
router.use('/modules', moduleController);
router.use('/cards', cardsController);

export default router;
