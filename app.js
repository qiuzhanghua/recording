import http from 'http'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core'
import {userResolver, carResolver} from './resolvers/index.js'
import {defaultTypes, userTypes, carTypes} from './typeDefs/index.js'

startApolloServer([defaultTypes, userTypes, carTypes],
	[userResolver, carResolver]).then(() => {
})

async function startApolloServer(typeDefs, resolvers) {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
	});

	await server.start().then(() => {
		console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
	});
	server.applyMiddleware({app});
	await new Promise(() => httpServer.listen(3000));
}
