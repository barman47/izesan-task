import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ThemeRegistry from './ThemeRegistry';
import Header from '@/components/Header';

import './globals.css'
import { PAGE_TITLE } from '@/utils/constants';

export const metadata: Metadata = {
    title: PAGE_TITLE
};

interface Props {
	children: React.ReactElement;
	params: { id: string };
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  	children
}: Props) {
	return (
		<html lang="en">
			<body className={inter.className}>
        <ThemeRegistry options={{ key: 'mui' }}>
          <Header />
            {children}
        </ThemeRegistry>
			</body>
		</html>
	);
}
