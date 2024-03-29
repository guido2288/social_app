import { ID } from 'appwrite';
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';

export async function createUserAccount( user: INewUser) {
    console.log(user)
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId:newAccount.$id,
            name:newAccount.name,
            email:newAccount.email,
            imageUrl: avatarUrl,
            username: user.username,
        })

        return newUser;
    } catch (error) {
        return console.log(error)
    }
}

export async function saveUserToDB(user:{
    accountId:string,
    name:string,
    email:string,
    imageUrl:URL,
    username?:string
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.dataBaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser;
    } catch (error) {
        console.log(error)
    }
}