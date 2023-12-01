import { Metadata } from 'next';

import LoginForm from '@/components/LoginForm';
import { PAGE_TITLE } from '@/utils/constants';
import {
	Box
} from '@mui/material';

export const metadata: Metadata = {
    title: `Login | ${PAGE_TITLE}`
};

const HomePage: React.FC<{}> = () => {
    return (
		<Box>
			<LoginForm />
		</Box>
    )
}

export default HomePage;