import {ApolloServer, AuthenticationError, gql} from 'apollo-server-micro'
import {getAllPhones} from "./utils/dbOperations";
import {getSession} from "next-auth/client";


const typeDefs = gql`
    type Query {
    getAllPhones: [Phone]
    }

     type Phone {
            id:String,
            name:String,
            manufacturer:String,
            description:String,
            color:String,
            price:Float,
            imageFileName:String,
            screen:String,
            processor:String,
            ram: Int,
            dateCreated:String,
            dateUpdated:String,
            version: Int
      }

    
    `;

const resolvers = {
    Query: {
        getAllPhones(parent, args, context,info){
           return getAllPhones()
        },
    }

    ,
}

export const config = {
    api: {
        bodyParser: false,
    },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers,context: async ({ req }) => {

        const session = await getSession({ req })
        if (!session) throw new AuthenticationError('you must be logged in');
        return {session}
    },
    playground: {
        settings: {
            "editor.theme": "light",
            "request.credentials": "include",
        },
    },
})


export default apolloServer.createHandler({ path: '/api/graphql' })


