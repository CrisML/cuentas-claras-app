"use strict";
<<<<<<< HEAD
=======
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSpendingGroup = exports.getSpendingGroups = exports.getSpendingGroupById = void 0;
const database_1 = require("../services/database");
const mongodb_1 = require("mongodb");
const getSpendingGroupById = async (group_id) => {
    const filter = { _id: new mongodb_1.ObjectId(group_id) };
    const spendingGroups = await database_1.spendingGroupsCollection.findOne(filter);
    return spendingGroups;
};
exports.getSpendingGroupById = getSpendingGroupById;
const getSpendingGroups = async (limit) => {
    return await database_1.spendingGroupsCollection.find().sort({ _id: -1 }).limit(limit).toArray();
};
exports.getSpendingGroups = getSpendingGroups;
const saveSpendingGroup = async (newSpendingGroup) => {
    return await database_1.spendingGroupsCollection.insertOne(newSpendingGroup);
};
exports.saveSpendingGroup = saveSpendingGroup;
>>>>>>> main
