export default {
	Query: {
		users: (parent, args, {users}) => {
			return users;
		},
		user: (parent, {id}, {users}) => {
			const user = users.filter(u => u.id === id);
			return user[0];
		},
	},
	Mutation: {
		makeUser: (parent, {id, name}, {users}) => {
			let user = {
				id,
				name,
				cars: []
			}
			users.push(user);
			return user;
		},
		removeUser: (parent, {id}, {users}) => {
			let index = users.findIndex(user => user.id === id);
			if (index >= 0) {
				users.splice(index, 1);
				return true;
			}
			return false;
		},
	},
	User: {
		car: (parent, _, {cars}) => {
			return parent.cars.map(carId => cars[carId - 1])
		}
	}
};
