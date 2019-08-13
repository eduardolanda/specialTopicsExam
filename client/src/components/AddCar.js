import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  getOwnersQuery,
  addCarMutation,
  getOwnerQuery
} from "../queries/queries";
import { flowRight as compose } from "lodash";
class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      make: "",
      model: "",
      price: "",
      ownerID: ""
    };
  }
  displayOwners() {
    var data = this.props.getOwnersQuery;
    if (data.loading) {
      return <option>Loading Owners...</option>;
    } else {
      return data.owners.map(owner => {
        return (
          <option key={owner.id} value={owner.id}>
            {owner.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addCarMutation({
      variables: {
        year: this.state.year,
        make: this.state.make,
        model: this.state.model,
        price: this.state.price,
        ownerID: this.state.ownerID
      },
      refetchQueries: [
        {
          query: getOwnerQuery
        }
      ]
    });
  }
  render() {
    return (
      <form id="add-car" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Car Year:</label>
          <input
            type="text"
            onChange={e => this.setState({ year: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Make:</label>
          <input
            type="text"
            onChange={e => this.setState({ make: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Model:</label>
          <input
            type="text"
            onChange={e => this.setState({ model: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Price:</label>
          <input
            type="text"
            onChange={e => this.setState({ price: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Owners:</label>
          <select onChange={e => this.setState({ ownerID: e.target.value })}>
            <option>Select Owner</option>
            {this.displayOwners()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getOwnersQuery, { name: "getOwnersQuery" }),
  graphql(addCarMutation, { name: "addCarMutation" })
)(AddBook);
