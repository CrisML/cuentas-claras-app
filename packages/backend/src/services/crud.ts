import { GroupMember, LoginRequest, SpendingGroup} from "@common/api/types";
import {spendingGroupsCollection, usersCollection} from "../services/database"
import { ObjectId, Collection} from 'mongodb';

export const getSpendingGroupById = async (group_id: string) => {
    return await spendingGroupsCollection.findOne<SpendingGroup>({ _id: new ObjectId(group_id) });
}

export const getSpendingGroups = async (limit: number) => {
    return await spendingGroupsCollection.find().sort({_id: -1}).limit(limit).toArray();
}

export const saveSpendingGroup = async (newSpendingGroup: SpendingGroup) => {
    return await spendingGroupsCollection.insertOne(newSpendingGroup);
}

const addMember = async (group_id: string, member: GroupMember, groupCollection: Collection) => {
     return await groupCollection.updateOne({_id: new ObjectId(group_id)}, {$push: {members: member} as any})
}

export const addMemberToSpendingGroup = async (group_id: string, member: GroupMember) => {
    await addMember(group_id, member, spendingGroupsCollection);
    return await getSpendingGroupById(group_id);
}

export const getUser = async (userInfo: LoginRequest) => {
    return await usersCollection.findOne<LoginRequest>({email: userInfo.email, password: userInfo.password});
}

export const getUsers = async () => {
    return await usersCollection.find().toArray();
}

export const SaveUser = async (userInfo: LoginRequest) => {
    return await usersCollection.insertOne(userInfo);
}

