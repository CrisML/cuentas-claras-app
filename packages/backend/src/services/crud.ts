import { Member, LoginRequest, Group, Spending} from "@common/api/types";
import {groupsCollection, usersCollection} from "../services/database"
import { ObjectId} from 'mongodb';

export const getGroupById = async (group_id: string) => {
    return await groupsCollection.findOne<Group>({ _id: new ObjectId(group_id) });
}

export const getGroups = async (limit: number) => {
    return await groupsCollection.find().sort({_id: -1}).limit(limit).toArray();
}

export const createGroup = async (newSpendingGroup: Group) => {
    return await groupsCollection.insertOne(newSpendingGroup);
}

export const addMember = async (group_id: string, member: Member) => {
     await groupsCollection.updateOne({_id: new ObjectId(group_id)}, {$push: {members: member} as any});
     return await getGroupById(group_id);
}

export const createSpending = async (group_id: string, spending: Spending) => {
     await groupsCollection.updateOne({_id: new ObjectId(group_id)}, {$push: {spendings: spending} as any});
     return await getGroupById(group_id);
}

export const getUser = async (userInfo: LoginRequest) => {
    return await usersCollection.findOne<LoginRequest>({email: userInfo.email, password: userInfo.password});
}

export const createUser = async (userInfo: LoginRequest) => {
    return await usersCollection.insertOne(userInfo);
}

