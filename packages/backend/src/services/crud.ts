import { SpendingGroup } from "../models/group";
import {spendingGroupsCollection} from "../services/database"
import { ObjectId } from 'mongodb';

export const getSpendingGroupById = async (group_id: string) => {
    const filter = { _id: new ObjectId(group_id) };
    return await spendingGroupsCollection.findOne<SpendingGroup>(filter);
}

export const getSpendingGroups = async (limit: number) => {
    return await spendingGroupsCollection.find().sort({_id: -1}).limit(limit).toArray();
}

export const saveSpendingGroup = async (newSpendingGroup: SpendingGroup) => {
    return await spendingGroupsCollection.insertOne(newSpendingGroup);
}
