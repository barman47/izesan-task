'use client';

import { User } from '@/interfaces';
import { Role } from '@/utils/constants';
import { USERS } from '@/database';

import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Delete } from 'mdi-material-ui';

interface Props {
    users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
    const currentUser: User = JSON.parse(localStorage.getItem('user')!);

    const handleDeleteUser = (email: string) => {
        // prevent the user from deleting themselves
        USERS.filter((item: User) => item.email !== email);
        console.log(USERS);
    };

    return (
        <Container>
            <Typography variant="h5">Users list</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" component="th">Name</TableCell>
                        <TableCell align="center" component="th">Email</TableCell>
                        <TableCell align="center" component="th">Role</TableCell>
                        <TableCell align="center" component="th"></TableCell>
                        <TableCell align="center" component="th"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: User) => (
                            <TableRow
                                key={user.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{user.name}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.role}</TableCell>
                                {(currentUser.role === Role.ADMIN && user.email !== currentUser.email) &&  
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleDeleteUser(user.email)}>
                                            <Delete />
                                        </IconButton>
                                </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UsersList;