import express from 'express'
import {ApolloServer, gql} from 'apollo-server-express'
import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core'
import http from 'http'
import {users, cars} from './data.js'
const me = users[0];

const typeDefs = gql`
 type Query {
   users: [User],
   user(id: Int!): User,
   cars: [Car],
   car(id: Int!): Car,
   me: User
 }
 
 type User {
   id: ID!
   name: String!
   car: [Car]
 }
 
 type Car {
   id: ID!
   make: String!
   model: String!
   color: String!
   owner: User!
 }
`;

const resolvers = {
	Query: {
		users: () => {
			return users;
		},
		user: (parent, {id}) => {
			const user = users.filter(u => u.id === id);
			return user[0];
		},
		cars: () => {
			return cars;
		},
		car: (parent, {id}) => {
			const car = cars.filter(c => c.id === id);
			return car[0];
		},
		me: () => me
	},
	Car: {
		owner: (parent) => {
			return users[parent.ownedBy - 1]
		}
	},
	User: {
		car: parent => {
			return parent.cars.map(carId => cars[carId - 1])
		}
	}
};

// startApollo(typeDefs, resolvers).then(r => {})
//
// async function startApollo(typeDefs, resolvers) {
//  const server = new ApolloServer({
//   typeDefs,
//   resolvers
//  });
//
//  await server.start();
//  server.applyMiddleware({app});
//  app.listen(3000);
// }

startApolloServer(typeDefs, resolvers).then(r => {
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
	await new Promise(resolve => httpServer.listen(3000));
}
