"use strict";
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
});
exports.default = router;
