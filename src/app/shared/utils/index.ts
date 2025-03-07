export function generateRandomString (length : number): string  {
    const characters = 'ASDFGHwereytruyt456789';
    let result = '';
    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}