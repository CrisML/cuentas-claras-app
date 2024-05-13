const express = require('express')
import { Request, Response, NextFunction } from 'express';
import * as crud from "../services/crud"
import {Member, Group, Spending} from "@common/api/types";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next:  NextFunction) => {
  crud.getGroups(parseInt(req.query.limit as string)).then((groups) => {
    res.status(200).json(groups);
  }).catch((error) => {
    next(error);
  })
});

router.get("/:group_id", async (req: Request, res: Response, next:  NextFunction) => {
  crud.getGroupById(req.params.group_id).then((groups) => {
    res.status(200).json(groups);
  }).catch((error) => {
    next(error);
  })
});

router.post("/:group_id/members/", async (req: Request, res: Response, next:  NextFunction) => {
  crud.addMember(req.params.group_id as string, req.body as Member).then((groups) => {
    res.status(200).json(groups);
  }).catch((error) => {
    next(error);
  })
});

router.post("/:group_id/spendings/", async (req: Request, res: Response, next:  NextFunction) => {
  crud.createSpending(req.params.group_id, req.body as Spending).then((group) => {
    res.status(200).json(group);
  }).catch((error) => {
    next(error);
  })
});

router.post("/",async (req: Request, res: Response, next: NextFunction) => {
    const newSpendingGroup = req.body as Group;
    crud.createGroup(newSpendingGroup).then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      next(error);
    })
})

export default router;
