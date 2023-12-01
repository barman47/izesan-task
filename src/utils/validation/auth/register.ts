import Validator from 'validator';
import { isEmpty } from '@/utils/isEmpty';
import { User } from '@/interfaces';
import { ErrorObject, Role } from '@/utils/constants';

export const validateRegisterUser = (data: User): ErrorObject<User> => {
    let errors = {} as User;

    data.name = !isEmpty(data.name) ?  data.name : '';
    data.email = !isEmpty(data.email) ?  data.email : '';
    data.password = !isEmpty(data.password) ?  data.password : '';
    data.role = !isEmpty(data.role) ?  data.role : '' as Role;

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required!';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email Address is required!';
    }

    if (data.password.length < 8) {
        errors.password = 'Password should be at least 8 characters long!';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }
    
    if (!Object.values(Role).includes(data.role.toUpperCase() as Role)) {
        errors.role = `Invalid role: ${data.role}` as Role;
    }
    
    if (Validator.isEmpty(data.role)) {
        errors.role = 'User role is required!' as Role;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    } as ErrorObject<User>;
};