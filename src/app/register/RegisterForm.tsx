'use client';

import * as React from 'react';
import {
    Alert,
    Button,
    CircularProgress,
    Container,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack, 
    TextField, 
    Tooltip,
    Typography
} from '@mui/material';

import { User } from '@/interfaces';
import { validateRegisterUser } from '@/utils/validation/auth';
import { Role } from '@/utils/constants';
import { delay } from '@/utils/delay';
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui';
import { USERS } from '@/database';

const RegisterForm: React.FC<{}> = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState<Role>('' as Role);
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [errors, setErrors] = React.useState<User>({} as User);

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setShowPassword(false);
        setErrors({} as User);
    };

    const toggleShowPassword = (): void => {
        setShowPassword((prev) => !prev);
    };

    const handleRegister = (data: User): boolean => {
        const user =  USERS.find((item: User) => item.email === data.email.toLowerCase());

        if (user) {
            return false;
        }
        USERS.push(data);
        return true;
    };

    const handleSubmit = async ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({} as User);

        const data: User = {
            name,
            email: email.toLowerCase(),
            password,
            role
        };

        const { errors, isValid } = validateRegisterUser(data);

        if (!isValid) {
            return setErrors(errors);
        }
        setLoading(true);
        await delay(2000);

        const userRegistered = handleRegister(data);
        setLoading(false);

        if(!userRegistered) {
            return setErrors({ ...errors, email: 'A user with this email already exists!'});
        }
        resetForm();
        return setMsg('Registered successfuly');
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} noValidate>
                {msg && <Alert severity="info">{msg}</Alert>}
                <Typography variant="h5" sx={{ my: 5 }} align="center">User Registration</Typography>
                <Stack direction="column" spacing={5}>
                    <TextField 
                        type="text"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        fullWidth
                        helperText={errors.name}
                        error={errors.name ? true : false}
                        disabled={loading}
                    />
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
                    <FormControl>
                        <Select
                            value={role}
                            onChange={(e: SelectChangeEvent) => setRole(e.target.value as Role)}
                            fullWidth
                            variant="outlined"
                            displayEmpty
                            error={errors.role ? true : false}
                            disabled={loading}
                        >
                            <MenuItem value="" disabled selected>Choose Role</MenuItem>
                            {Object.values(Role).map((value: string) => (
                                <MenuItem key={value} value={value}>{value}</MenuItem>    
                            ))}
                        </Select>
                        {errors.role && <FormHelperText sx={{ color: '#d32f2f' }}>{errors.role}</FormHelperText>}
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <><CircularProgress />&nbsp;&nbsp;One Moment . . .</> : 'Register'}
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default RegisterForm;