import React from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

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

const UserList = ({ data }) => {
    const filteredData = data.users.filter(entry => entry.name !== '');

    return (
        <List>
            {filteredData.map((entry, index) => {
                const canCreateCustomer = entry.permissions.createCustomer;

                return (
                    <ListItem key={index} >
                        {entry.name}
                        {canCreateCustomer &&
                            <Button variant="contained" color='primary' size='small'>
                                CREATE
                      </Button>
                        }
                    </ListItem>
                )
            })}
        </List>
    );
};

export default UserList;