/**
 * 
 * @param duration Delay in milliseconds
 * @returns 
 */
export const  delay = (duration: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}