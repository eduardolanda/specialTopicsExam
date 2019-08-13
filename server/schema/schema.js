const graphql = require("graphql");
const _ = require("lodash");
const uuidv1 = require("uuid/v1");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

var cars = [
  {
    year: 1993,
    make: "Ford",
    model: "Mustang",
    price: 20000,
    id: uuidv1(),
    ownerID: "1"
  },
  { year: 2016, make: "BMW", model: "M5", price: 20000, id: "2", ownerID: "2" },
  {
    year: 2012,
    make: "VW",
    model: "Jetta",
    price: 20000,
    id: uuidv1(),
    ownerID: "2"
  },
  {
    year: 2020,
    make: "Chevrolet",
    model: "Camaro",
    price: 20000,
    id: uuidv1(),
    ownerID: "3"
  }
];

var owners = [
  { name: "Gianlucci", lastName: "Minarelli", id: "1" },
  { name: "Eduardo", lastName: "Landa", id: "2" },
  { name: "Jean", lastName: "Lima", id: "3" }
];

const CarType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: GraphQLID },
    year: { type: GraphQLInt },
    make: { type: GraphQLString },
    model: { type: GraphQLString },
    price: { type: GraphQLInt },
    owner: {
      type: OwnerType,
      resolve(parent, args) {
        return _.find(owners, { id: parent.ownerID });
      }
    }
  })
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    lastName: { type: GraphQLString },
    cars: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return _.filter(cars, { ownerID: parent.id });
      }
    }
  })
});

// ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    car: {
      type: CarType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code to get data from db/other source
        return _.find(cars, { id: args.id });
      }
    },
    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(owners, { id: args.id });
      }
    },
    cars: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return cars;
      }
    },
    owners: {
      type: new GraphQLList(OwnerType),
      resolve(parent, args) {
        return owners;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOwner: {
      type: OwnerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let NewOwner = {
          name: args.name,
          lastName: args.lastName,
          id: uuidv1()
        };
        owners.push(NewOwner);
        return NewOwner;
      }
    },
    addCar: {
      type: CarType,
      args: {
        year: { type: new GraphQLNonNull(GraphQLInt) },
        make: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        ownerID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let newCar = {
          id: uuidv1(),
          year: args.year,
          make: args.make,
          model: args.model,
          price: args.price,
          ownerID: args.ownerID
        };
        cars.push(newCar);
        return newCar;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
