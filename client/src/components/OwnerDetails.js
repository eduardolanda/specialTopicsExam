import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getOwnerQuery } from "../queries/queries";

class OwnerDetails extends Component {
  displayOwnerDetails() {
    const { owner } = this.props.data;
    console.log(owner);
    if (owner) {
      return (
        <div>
          <h2>{owner.name}</h2>
          <p>{owner.lastName}</p>
          <p>All cars by this ownerr:</p>
          {/* <ul className="cars">
                  {owner.author.books.map(item => {
                      return <li key={uuidv1()}>{item.name}</li>;
                  })}
              </ul> */}
        </div>
      );
    } else {
      return <div>No Owner selected...</div>;
    }
  }
  render() {
    return <div id="owner-details">{this.displayOwnerDetails()}</div>;
  }
}

export default graphql(getOwnerQuery, {
  options: props => {
    return {
      variables: {
        id: props.ownerID
      }
    };
  }
})(OwnerDetails);
