import { Member, LoginRequest, Group} from "@common/api/types";
import {groupsCollection, usersCollection} from "../services/database"
import { ObjectId, Collection} from 'mongodb';

export const getSpendingGroupById = async (group_id: string) => {
    return await groupsCollection.findOne<Group>({ _id: new ObjectId(group_id) });
}

export const getGroups = async (limit: number) => {
    return await groupsCollection.find().sort({_id: -1}).limit(limit).toArray();
}

export const createGroup = async (newSpendingGroup: Group) => {
    return await groupsCollection.insertOne(newSpendingGroup);
}

export const addMember = async (group_id: string, member: Member) => {
     return await groupsCollection.updateOne({_id: new ObjectId(group_id)}, {$push: {members: member} as any})
}

// export const addMember = async (group_id: string, member: GroupMember) => {
//     await addMember(group_id, member, groupsCollection);
//     return await getSpendingGroupById(group_id);
// }

// export const addMemberToSpendingGroup = async (group_id: string, member: GroupMember) => {
//     await addMember(group_id, member, groupsCollection);
//     return await getSpendingGroupById(group_id);
// }


export const getUser = async (userInfo: LoginRequest) => {
    return await usersCollection.findOne<LoginRequest>({email: userInfo.email, password: userInfo.password});
}

export const createUser = async (userInfo: LoginRequest) => {
    return await usersCollection.insertOne(userInfo);
}

