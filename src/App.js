import React, { useState } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import UserList from './UserList';
import Spinner from './Spinner';
import logo from './acre-logo.svg';

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
`;

const Header = styled.h2`
  font-family: "Playfair Display", serif;
`;

const App = ({ client }) => {
  const [role, setRole] = useState('ADMIN');

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
        if (loading) return <Spinner />;
        if (error) return `error! ${error.message}`;

        const filteredData = data.users.filter(entry => entry.name !== '');

        return (
          <Wrapper>
            <img src={logo} alt="logo" />

            <Title>Welcome to acre</Title>

            <Header>Users</Header>

            <Select value={role} onChange={handleChange}>
              <MenuItem value='ADMIN'>Admin</MenuItem>
              <MenuItem value='BROKER'>Broker</MenuItem>
              <MenuItem value='ADVISOR'>Advisor</MenuItem>
            </Select>

            <UserList data={data} />
          </Wrapper>
        );
      }}
      </Query>
    </ApolloProvider>
  );
};

export default App;