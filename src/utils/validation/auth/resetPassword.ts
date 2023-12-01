import Validator from 'validator';

import { ErrorObject } from '@/utils/constants';
import { isEmpty } from '@/utils/isEmpty';

export interface ResetData {
    password: string;
    confirmPassword: string;
    resetToken?: string;
}

export const validateResetPassword = (data: ResetData): ErrorObject<ResetData> => {
    let errors = {} as ResetData;

    data.password = !isEmpty(data.password) ?  data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ?  data.confirmPassword : '';

    if (!Validator.isLength(data.password, { min: 8 })) {
        errors.password = 'Password must be at least 8 characters long!';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords do not match!';
    }
    if (Validator.isEmpty(data.confirmPassword!)) {
        errors.confirmPassword = 'Please confirm your password!';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    } as ErrorObject<ResetData>;
};