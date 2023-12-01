import { USERS } from '@/database';
import { PAGE_TITLE } from '@/utils/constants';
import UsersList from './UsersList';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Users | ${PAGE_TITLE}`
};

const UsersPage: React.FC<{}> = () => {
    return (
        <UsersList users={USERS} />
    );
};


export default UsersPage;