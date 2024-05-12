const express = require('express')
import { Request, Response, NextFunction } from 'express';
import * as crud from "../services/crud"
import {GroupMember, SpendingGroup} from "@common/api/types";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next:  NextFunction) => {
  crud.getSpendingGroups(parseInt(req.query.limit as string)).then((groups) => {
    res.status(200).json(groups);
  }).catch((error) => {
    next(error);
  })
});

router.get("/:group_id", async (req: Request, res: Response, next:  NextFunction) => {
  crud.getSpendingGroupById(req.params.group_id).then((groups) => {
    res.status(200).json(groups);
  }).catch((error) => {
    next(error);
  })
});

router.post("/:group_id/members/", async (req: Request, res: Response, next:  NextFunction) => {
  crud.addMemberToSpendingGroup(req.params.group_id as string, req.body as GroupMember).then((groups) => {
    res.status(200).json(groups);
  }).catch((error) => {
    next(error);
  })
});

router.post("/",async (req: Request, res: Response, next: NextFunction) => {
    const newSpendingGroup = req.body as SpendingGroup;
    crud.saveSpendingGroup(newSpendingGroup).then((result) => {
      res.status(200).json(result);
    }).catch((error) => {
      next(error);
    })
})

export default router;
