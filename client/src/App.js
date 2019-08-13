import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components
import OwnerList from "./components/OwnerList";
import AddCar from "./components/AddCar";
// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Rich People and Cars with GraphQL</h1>
          <OwnerList />
          <AddCar />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
