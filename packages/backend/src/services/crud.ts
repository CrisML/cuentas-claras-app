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
    return await usersCollection.findOne<LoginRequest>({username: userInfo.email, password: userInfo.password});
}

export const createUser = async (userInfo: LoginRequest) => {
    return await usersCollection.insertOne(userInfo);
}

export const getUsersNotInGroup = async (group_id: string) => {
    // Devuelve un array de usuarios que no están en el grupo
    // Para ello se realiza una query que busca todos los usuarios que no estén en el grupo
    // Existe una collection users que tiene los atributos user_id y username
    // y una collection groups que tiene los atributos group_id, name y members. Dentro de members hay un array de objetos con los atributos user_id y username
    // Se debe devolver un array de objetos con los atributos user_id y username de los usuarios que no están en el grupo
    console.log('Obteniendo usuarios que no están en el grupo con id: ' + group_id)
    const group = await getGroupById(group_id);
    if (!group) {
        return [];
    }
    const users = await usersCollection.find().toArray();
    const usersNotInGroup = users.filter(user => !group.members?.some(member => member.user_id === user._id.toString()))
        .map(user => ({user_id: user._id.toString(), username: user.username}));

    return usersNotInGroup;
}
