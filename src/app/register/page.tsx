import { Metadata } from 'next';
import RegisterForm from './RegisterForm';
import { PAGE_TITLE } from '@/utils/constants';

export const metadata: Metadata = {
    title: `Register | ${PAGE_TITLE}`
};

const RegisterPage: React.FC<{}> = () => {
    return (
        <RegisterForm />
    );
};

export default RegisterPage;