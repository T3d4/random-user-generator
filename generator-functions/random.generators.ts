export const generateRandomOTP = (): number => {
    const min: number = 1000;
    const max: number = 9999;
    const randomNumber: number = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber < 1000 ? randomNumber + 1000 : randomNumber;
};

export const generateRandomAvailaiblity = (): string => {
    const availabilities: string[] = ["Unavailable", "Available"];
    return getRandomItemFromArray(availabilities);
};


export const generateRandomProfile = (): string => {
    const profiles: string[] = ["http://bit.ly/3FXZRHG", "https://bit.ly/46bPRW9", "https://unsplash.com/photos/persons-silhouette-during-golden-hour-x_8oJhYU31k", "https://unsplash.com/photos/black-pug-with-gray-knit-scarf-Mv9hjnEUHR4"];
    return getRandomItemFromArray(profiles);
};

export const getRandomBoolean = (): boolean => {
    return Math.random() < 0.5;
};

export const generateRandomQualifications = (): string => {
    const qualifications: string[] = ["Super Admin", "Admin", "Security Officer"];
    return getRandomItemFromArray(qualifications);
};

export const getRandomItemFromArray = <T>(array: T[]): T => {
    const randomIndex: number = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export const generateRandomRole = (): number => {
    const roles: number[] = [0, 1, 2]; // Assuming role IDs are 1, 2, and 3
    return getRandomItemFromArray(roles);
};

export const generateRandomPassword = (): string => {
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const passwordLength: number = 10;
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    return password;
};

export const generateRandomMobileNumber = (): string => {
    const countryCode = "+234"; // Change this based on your country code
    const randomNumbers = Math.floor(1000000000 + Math.random() * 9000000000);
    return `${countryCode}${randomNumbers}`;
};

export const generateRandomRefreshToken = (): string => {
    const refreshTokenLength: number = 32;
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let refreshToken: string = "";

    for (let i = 0; i < refreshTokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        refreshToken += characters.charAt(randomIndex);
    }

    return refreshToken;
};

export const generateRandomLastName = (): string => {
    const lastNames = ["David", "Ireoluwa", "Daniel", "Joshua", "Teda", "Miller"];
    return getRandomItemFromArray(lastNames);
};

export const generateRandomFirstName = (): string => {
    const firstNames = ["John", "Jane", "David", "Musk", "Michael", "Erioluwa"];
    return getRandomItemFromArray(firstNames);
};
