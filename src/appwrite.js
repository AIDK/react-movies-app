import {Client, Databases, ID, Query} from "appwrite";

const DATABASE_ID  = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID  = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID  = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

const database = new Databases(client)

export const updateSearchCount = async(searchTerm, movie) => {

    try {
        //TODO: use appwrite to check if the search term exists in the database
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", searchTerm),
        ]);

        //TODO: update count if search term is found in database
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1
            })
        } else {
            //TODO: create new document with search term and count
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_url}`,
            })
        }

    } catch (error) {
       console.log(`Error updating search term: ${error}`)
    }
}