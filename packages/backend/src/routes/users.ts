const express = require('express')
import { Request, Response, NextFunction } from 'express';
import * as crud from "../services/crud"
import {GroupMember, SpendingGroup} from "@common/api/types";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next:  NextFunction) => {
  crud.getUsers().then((users) => {
    res.status(200).json(users);
  }).catch((error) => {
    next(error);
  })
});
