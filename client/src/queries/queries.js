import { gql } from "apollo-boost";

const getOwnersQuery = gql`
  {
    owners {
      name
      lastName
      id
    }
  }
`;

const getCarsQuery = gql`
  {
    cars {
      make
      model
      year
      price
      id
    }
  }
`;

const addCarMutation = gql`
  mutation(
    $year: Integer!
    $make: String!
    $model: String!
    $price: Integer!
    $ownerID: ID!
  ) {
    addBook(
      year: $year
      make: $make
      model: $model
      price: $price
      ownerID: $ownerID
    ) {
      make
      year
    }
  }
`;

const getOwnerQuery = gql`
  query($id: ID) {
    owner(id: $id) {
      id
      name
      lastName
      cars {
        id
        make
        model
        price
      }
    }
  }
`;

export { getOwnersQuery, getCarsQuery, addCarMutation, getOwnerQuery };
