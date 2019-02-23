import React, { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
// import styled from 'styled-components';

import logo from "./acre-logo.svg";
import "./App.css";

const App = ({ client }) => {
  const [role, setRole] = useState("ADMIN");

  const handleChange = (event) => {
    event.preventDefault();

    setRole(event.target.value);
  }

  return (
    <ApolloProvider client={client}>
      <Query
        query={gql`
        {
          users(role: "${role}") {
            name
            permissions {
              createCustomer
            }
          }
        }
      `}
      >{({ loading, error, data }) => {
        if (loading) return "loading...";
        if (error) return `error! ${error.message}`;

        const filteredData = data.users.filter(entry => entry.name !== '');

        return (
          <div className="app">
            <header className="app-header">
              <img src={logo} className="app-logo" alt="logo" />

              <h1>Welcome to acre</h1>

              <h2>Users</h2>

              <select value={role} onChange={handleChange}>
                <option value="ADMIN">Admin</option>
                <option value="BROKER">Broker</option>
                <option value="ADVISOR">Advisor</option>
              </select>

              <ul>
                {filteredData.map((entry, index) => {
                  const canCreateCustomer = entry.permissions.createCustomer;

                  return (
                    <li key={index} >
                      {entry.name} {canCreateCustomer && <button>create customer</button>}
                    </li>
                  )
                })}
              </ul>
            </header>
          </div>
        );
      }}
      </Query>
    </ApolloProvider>
  );
}

export default App;




