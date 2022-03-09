export default {
	Query: {
		cars: (parent, args, {cars}) => {
			return cars;
		},
		car: (parent, {id}, {cars}) => {
			const car = cars.filter(c => c.id === id);
			return car[0];
		},
	},
	Mutation: {
		createCar: (parent, {id, make, model, color}, {cars}) => {
			let car = {
				id,
				make,
				model,
				color
			}
			cars.push(car);
			return car;
		},
		removeCar: (parent, {id}, {cars}) => {
			let index = cars.findIndex(car => car.id === id);
			if (index >= 0) {
				cars.splice(index, 1);
				return true;
			}
			return false;
		}
	},
	Car: {
		owner: (parent, _, {users}) => {
			return users[parent.ownedBy - 1]
		}
	},
};
