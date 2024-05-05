const express = require('express')
import { Request, Response } from 'express';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    res.json({version: "0.0.1"});
  });

export default router;