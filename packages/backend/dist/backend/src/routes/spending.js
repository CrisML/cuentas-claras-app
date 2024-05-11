"use strict";
<<<<<<< HEAD
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const database_1 = require("../services/database");
const router = express.Router();
router.get("/", async (req, res) => {
    var _a;
    const filtered_spending_groups = (await ((_a = database_1.collections.spendingGroups) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
    res.status(200).send(filtered_spending_groups);
});
router.post("/", async (req, res) => {
    var _a;
    try {
        const newSpendingGroup = req.body;
        const result = await ((_a = database_1.collections.spendingGroups) === null || _a === void 0 ? void 0 : _a.insertOne(newSpendingGroup));
        res.status(200).send(result);
    }
    catch (error) {
        let errorMessage = "Falló la creación del grupo";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).send(errorMessage);
        console.log(errorMessage);
    }
=======
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const crud = __importStar(require("../services/crud"));
const router = express.Router();
router.get("/", async (req, res, next) => {
    crud.getSpendingGroups(parseInt(req.query.limit)).then((groups) => {
        res.status(200).json(groups);
    }).catch((error) => {
        next(error);
    });
});
router.get("/:group_id", async (req, res, next) => {
    crud.getSpendingGroupById(req.params.group_id).then((groups) => {
        res.status(200).json(groups);
    }).catch((error) => {
        next(error);
    });
});
router.post("/", async (req, res, next) => {
    const newSpendingGroup = req.body;
    crud.saveSpendingGroup(newSpendingGroup).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        next(error);
    });
>>>>>>> main
});
exports.default = router;
