'use client';

import * as React from 'react';
import {
    Alert,
    Button,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Stack, 
    TextField, 
    Tooltip,
    Typography
} from '@mui/material';

import { User } from '@/interfaces';
import { LoginData, validateLoginUser } from '@/utils/validation/auth';
import { Role } from '@/utils/constants';
import { delay } from '@/utils/delay';
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui';
import { USERS } from '@/database';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC<{}> = () => {
    const router = useRouter();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [errors, setErrors] = React.useState<LoginData>({} as LoginData);

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setErrors({} as LoginData);
    };

    const toggleShowPassword = (): void => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = (data: LoginData): { user: User | null; msg: string; success: boolean } => {
        const user =  USERS.find((item: User) => item.email === data.email.toLowerCase());

        if (!user) {
            return {
                user: null,
                msg: 'User does not exist!',
                success: false
            };
        }
        if (user.password !== data.password) {
            return {
                user: null,
                msg: 'Incorrect password',
                success: false
            };
        }

        return {
            user: user,
            msg: 'User registered',
            success: true
        };
    };

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({} as LoginData);

        const data: LoginData = {
            email,
            password,
        };

        const { errors, isValid } = validateLoginUser(data);

        if (!isValid) {
            return setErrors(errors);
        }
        setLoading(true);
        await delay(2000);

        const { success, user, msg } = handleLogin(data);
        setLoading(false);

        if(!success) {
            return setMsg(msg);
        }

        localStorage.setItem('user', JSON.stringify(user));
        resetForm();
        router.push('/users');
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} noValidate>
                {msg && <Alert severity="info">{msg}</Alert>}
                <Typography variant="h5" sx={{ my: 5 }} align="center">User Login</Typography>
                <Stack direction="column" spacing={5}>
                    <TextField 
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        fullWidth
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        disabled={loading}
                    />
                    <TextField 
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        fullWidth
                        helperText={errors.password || 'Password should be at least 8 characters long'}
                        error={errors.password ? true : false}
                        disabled={loading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                    >
                                        {showPassword ? 
                                            <Tooltip title="Hide Password" placement="bottom" arrow>
                                                <EyeOutline />
                                            </Tooltip>
                                                : 
                                                <Tooltip title="Show Password" placement="bottom" arrow>
                                                    <EyeOffOutline />
                                                </Tooltip>
                                            }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <><CircularProgress />&nbsp;&nbsp;One Moment . . .</> : 'Log In'}
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default LoginForm;