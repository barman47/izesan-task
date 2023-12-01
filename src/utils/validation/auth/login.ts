import Validator from 'validator';
import { isEmpty } from '@/utils/isEmpty';
import { User } from '@/interfaces';
import { ErrorObject } from '@/utils/constants';


export type LoginData = Pick<User, 'email' | 'password'>;

export const validateLoginUser = (data: LoginData): ErrorObject<LoginData> => {
    let errors = {} as LoginData;

    data.email = !isEmpty(data.email) ?  data.email : '';
    data.password = !isEmpty(data.password) ?  data.password : '';


    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email Address is required!';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    } as ErrorObject<LoginData>;
};