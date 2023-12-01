export const PAGE_TITLE = 'User Management';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface ErrorObject<T> {
    errors: T;
    isValid: boolean;
};