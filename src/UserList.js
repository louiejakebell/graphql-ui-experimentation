import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

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