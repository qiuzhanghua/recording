import http from 'http'
import express from 'express'
import cors from 'cors'
import {ApolloServer} from 'apollo-server-express'
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core'
import {userResolver, carResolver} from './resolvers/index.js'
import {defaultTypes, userTypes, carTypes} from './typeDefs/index.js'
import {users, cars} from "./models/index.js";

let me = users[0]

startApolloServer([defaultTypes, userTypes, carTypes],
	[userResolver, carResolver],
	{
		users,
		cars,
		me
	}
).then(() => {
})

async function startApolloServer(typeDefs, resolvers, context) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context,
		plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
	});

	await server.start().then(() => {
		console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
	});
	server.applyMiddleware({app});
	app.use(cors())
	await new Promise(() => httpServer.listen(3000));
}
