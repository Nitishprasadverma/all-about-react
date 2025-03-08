import conf from "../conf/conf.js"

import { Client, Account, ID } from "appwrite"


//create the AuthService
export class AuthService {
    client = new Client;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    // Create account method
    async creatAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                // call another method
                this.login({ email, password })

            } else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    // Login Method
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    // getting the current user
    async getCurrentUser() {

        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service:", error)
        }
        return null;
    }

    //Logout method
    async logOut() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service:", error)
        }
    }
}


const authService = new AuthService();

export default authService;