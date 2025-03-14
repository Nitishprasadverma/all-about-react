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
                return this.login({ email, password })
                //  return userAccount;

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
             await this.account.createEmailPasswordSession(email, password, true)

            await new Promise((resolve) => setTimeout(resolve,500))
            return await this.getCurrentUser();
        } catch (error) {
            throw error
        }
    }

    // getting the current user
    async getCurrentUser() {

        try {
            const session = await this.account.getSession("current");
            if (!session) {
                console.log("❌ No active session! Please log in.");
                return null;
            }
    
            console.log("✅ Active session found! Fetching user...");
            return await this.account.get();
        } catch (error) {
            console.error("❌ getCurrentUser ERROR:", error.message);
            return null;
        }

    //      try {
    //     const user = await this.account.get(); // Fetch user details
    //     console.log("User fetched:", user); // Debugging output
    //     return user;
    // } catch (error) {
    //     console.error("Error fetching user:", error);
    //     return null;
    // }
    }

    //Logout method
    async logOut() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service:: logout::error", error)
        }
    }
}


const authService = new AuthService();

export default authService;