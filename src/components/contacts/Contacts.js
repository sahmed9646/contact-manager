import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <div>
                <h1 className="display-4 mb-2">
                  <span className="text-danger">Contact</span> List
                </h1>
              </div>
              {contacts.map((contact) => (
                <Contact
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  email={contact.email}
                  phone={contact.phone}
                />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
