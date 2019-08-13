import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getOwnersQuery } from "../queries/queries";
import OwnerDetails from "./OwnerDetails";
// const uuidv1 = require("uuid/v1");

class OwnerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  displayOwners() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading Owners...</div>;
    } else {
      return data.owners.map(owner => {
        return (
          <li key={owner.id}>
            {owner.name} {owner.lastName}
          </li>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="owner-list">{this.displayOwners()}</ul>
        <OwnerDetails ownerID={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getOwnersQuery)(OwnerList);
