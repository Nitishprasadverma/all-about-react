const conf ={

    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteDatabseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID)

}


export default conf;