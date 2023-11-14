import path from 'path';
import fs from 'fs/promises';
import { firstNames, lastNames } from '../data';

export const generateRandomOTP = (): number => {
    const min: number = 1000;
    const max: number = 9999;
    const randomNumber: number = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber < 1000 ? randomNumber + 1000 : randomNumber;
};

// export const generateRandomAvailaiblity = (): string => {
//     const availabilities: string[] = ["Unavailable", "Available"];
//     return getRandomItemFromArray(availabilities);
// };


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

export const generateRandomDepartment = (): string => {
    const qualifications: string[] = ["CSC", "ACC", "CYB", "SEN", "CA", "MBBS", "ARC", "ANA"];
    return getRandomItemFromArray(qualifications);
};

export const generateRandomAdmissionYear = (): number => {
    const qualifications: number[] = [2018, 2019, 2020, 2021, 2022, 2023];
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

export const generateMatricNo = (department: string, admissionYear: number, counter: number) => {
    const departmentCounters: Record<string, Record<number, number>> = {};

    if (!departmentCounters[department]) {
        departmentCounters[department] = {};
    }

    if (!departmentCounters[department][admissionYear]) {
        departmentCounters[department][admissionYear] = counter;
    }

    const formattedAdmissionYear = admissionYear.toString().slice(-2);
    const paddedCounter = departmentCounters[department][admissionYear].toString();
    const matricNo = `BU${formattedAdmissionYear}${department.toUpperCase()}${paddedCounter}`;

    departmentCounters[department][admissionYear]++;

    return matricNo;
}

//random last name, first name, email

const usedEmailsFileName = '../user-data/usedEmails.txt';
const usedEmailsFilePath = '../user-data/usedEmails.txt';

let usedEmails: Set<string>;

export const generateUniqueEmail = async (firstName: string, lastName: string): Promise<string> => {
    let email: string;
    await loadUsedEmails().then((emails) => {
        usedEmails = emails;
    })

    try {
        await fs.access(path.dirname(usedEmailsFilePath));
    } catch (dirErr) {
        await fs.mkdir(path.dirname(usedEmailsFilePath));
    }

    // Use the resolved value of usedEmails directly in the loop condition
    do {
        email = `${firstName}.${lastName}@patrolpulse.com`.toLowerCase();
    } while (usedEmails.has(email));

    usedEmails.add(email);
    await saveUsedEmails();

    return email;
};

async function loadUsedEmails(): Promise<Set<string>> {
    try {
        const data = await fs.readFile(usedEmailsFileName, 'utf-8');
        const emailsArray = data.split('\n').map((email) => email.trim());
        return new Set(emailsArray);
    } catch (error) {
        // If the file doesn't exist or there's an error, return an empty set
        return new Set();
    }
}

async function saveUsedEmails(): Promise<void> {
    const emailsArray = Array.from(usedEmails);
    const emailsString = emailsArray.join('\n');
    await fs.writeFile(usedEmailsFileName, emailsString, 'utf-8');
}

export const generateRandomLastName = (): string => {
    return getRandomItemFromArray(lastNames);
};

export const generateRandomFirstName = (): string => {
    return getRandomItemFromArray(firstNames);
};