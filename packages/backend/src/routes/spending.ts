const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
import { Request, Response } from 'express';
import {collections} from "../services/database"
import SpendingGroup from '../models/group';
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

        const filtered_spending_groups = (await collections.spendingGroups?.find<SpendingGroup>({}).toArray()) as SpendingGroup[];
        res.status(200).send(filtered_spending_groups);
 
  });

  router.post("/",async (req: Request, res: Response) => {
    try {
        const newSpendingGroup: SpendingGroup = req.body as SpendingGroup;
        const result = await collections.spendingGroups?.insertOne(newSpendingGroup);
        res.status(200).send(result);
    }catch(error)
    {
        let errorMessage = "Falló la creación del grupo"
        if (error instanceof Error){
            errorMessage = error.message;
        }
        res.status(400).send(errorMessage);
        console.log(errorMessage);
    }
  })
export default router;
