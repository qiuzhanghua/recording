import {cars, users} from "../models/index.js";

export default {
	Query: {
		cars: () => {
			return cars;
		},
		car: (parent, {id}) => {
			const car = cars.filter(c => c.id === id);
			return car[0];
		},
	},
	Mutation: {
		createCar: (parent, {id, make, model, color}) => {
			let car = {
				id,
				make,
				model,
				color
			}
			cars.push(car);
			return car;
		},
		removeCar: (parent, {id}) => {
			let index = cars.findIndex(car => car.id === id);
			if (index >= 0) {
				cars.splice(index, 1);
				return true;
			}
			return false;
		}
	},
	Car: {
		owner: (parent) => {
			return users[parent.ownedBy - 1]
		}
	},
};
