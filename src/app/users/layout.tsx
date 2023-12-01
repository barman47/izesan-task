'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


interface Props {
    children: React.ReactElement
}

const Dashboard: React.FC<Props> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.replace('/');
        }
    }, [router]);
    
    return (
        <>
            {children}
        </>
    );
};

export default Dashboard;