import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layouts/TextInputGroup";
import uuid from "react-uuid";
import Axios from "axios";
class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await Axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    const updContact = {
      name,
      email,
      phone,
    };
    if (name === "") {
      this.setState({ errors: { name: "This is Required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "This is Required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "This is Required" } });
      return;
    }

    const { id } = this.props.match.params;
    const res = await Axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({
      type: "UPDATE_CONTACT",
      payload: res.data,
    });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {},
    });

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone
                    Number"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-secondary btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContact;
