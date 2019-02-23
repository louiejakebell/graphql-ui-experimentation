import React, { useState } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import UserList from './UserList';
import Spinner from './Spinner';

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  vertical-align: middle;
`;

const Title = styled.div`
  font-size: 30px;
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

        return (
          <Wrapper>
            <Title>graphql / material ui experimentation</Title>

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