import { LoginRequest, SpendingGroup} from "@common/api/types";
import {spendingGroupsCollection, usersCollection} from "../services/database"
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

export const getUser = async (userInfo: LoginRequest) => {
    return await usersCollection.findOne<LoginRequest>({email: userInfo.email, password: userInfo.password});
}

export const SaveUser = async (userInfo: LoginRequest) => {
    return await usersCollection.insertOne(userInfo);
}

