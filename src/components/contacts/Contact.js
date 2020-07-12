import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortDown,
  faTimes,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showContactInfo: false,
  };
  onShowClick = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo,
    });
  };
  onClickDelete = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({
      type: "DELETE_CONTACT",
      payload: id,
    });
  };
  render() {
    const { id, name, email, phone } = this.props;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <FontAwesomeIcon
                  onClick={this.onShowClick}
                  icon={faSortDown}
                  style={{ cursor: "pointer" }}
                />
                <FontAwesomeIcon
                  onClick={this.onClickDelete.bind(this, id, dispatch)}
                  icon={faTimes}
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                />
                <Link to={`contact/edit/${id}`}>
                  <FontAwesomeIcon
                    onClick={this.onShowClick}
                    icon={faPencilAlt}
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      fontSize: "1.5rem",
                      marginRight: "2rem",
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email : {email}</li>
                  <li className="list-group-item">Phone : {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.prototypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
export default Contact;
