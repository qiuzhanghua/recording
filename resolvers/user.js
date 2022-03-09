import {cars, users} from "../models/index.js";

export default {
	Query: {
		users: () => {
			return users;
		},
		user: (parent, {id}) => {
			const user = users.filter(u => u.id === id);
			return user[0];
		},
	},
	Mutation: {
		makeUser: (parent, {id, name}) => {
			let user = {
				id,
				name,
				car: []
			}
			users.push(user);
			return user;
		},
		removeUser: (parent, {id}) => {
			let index = users.findIndex(user => user.id === id);
			if (index >= 0) {
				users.splice(index, 1);
				return true;
			}
			return false;
		},
	},
	User: {
		car: parent => {
			return parent.cars.map(carId => cars[carId - 1])
		}
	}
};
