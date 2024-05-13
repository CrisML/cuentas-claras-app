const express = require('express')
import { Request, Response, NextFunction } from 'express';
import * as crud from "../services/crud"
import {Member, Group} from "@common/api/types";
const router = express.Router();

router.post("/:group_id/spendings/", async (req: Request, res: Response, next:  NextFunction) => {
    crud.addMember(req.params.group_id as string, req.body as Member).then((groups) => {
      res.status(200).json(groups);
    }).catch((error) => {
      next(error);
    })
  });
  