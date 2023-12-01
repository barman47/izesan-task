import { createTheme } from '@mui/material/styles';

export const OFF_BLACK = '#605C5C';
export const GREY = '#f6f6f6';
export const DARK_GREY = '#AAAAAA';
export const LIGHT_GREY = 'rgba(0, 0, 0, 0.12)';
export const WHITE = '#FFFFFF';
export const TEXT_COLOR = '#636363';
export const LINK_COLOR = '#2973b7';

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,     // Up to 480px
			sm: 481,   // 481px to 767px
			md: 769,   // 768px to 1023px
			lg: 1025,  // 1024px to 1279px
			xl: 1281   // 1280px and above
		}
	}
});