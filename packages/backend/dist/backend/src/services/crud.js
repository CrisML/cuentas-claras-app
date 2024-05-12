"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveUser = exports.getUser = exports.addMemberToSpendingGroup = exports.saveSpendingGroup = exports.getSpendingGroups = exports.getSpendingGroupById = void 0;
const database_1 = require("../services/database");
const mongodb_1 = require("mongodb");
const getSpendingGroupById = async (group_id) => {
    return await database_1.spendingGroupsCollection.findOne({ _id: new mongodb_1.ObjectId(group_id) });
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
const addMember = async (group_id, member, groupCollection) => {
    return await groupCollection.updateOne({ _id: new mongodb_1.ObjectId(group_id) }, { $push: { members: member } });
};
const addMemberToSpendingGroup = async (group_id, member) => {
    await addMember(group_id, member, database_1.spendingGroupsCollection);
    return await (0, exports.getSpendingGroupById)(group_id);
};
exports.addMemberToSpendingGroup = addMemberToSpendingGroup;
const getUser = async (userInfo) => {
    return await database_1.usersCollection.findOne({ email: userInfo.email, password: userInfo.password });
};
exports.getUser = getUser;
const SaveUser = async (userInfo) => {
    return await database_1.usersCollection.insertOne(userInfo);
};
exports.SaveUser = SaveUser;
