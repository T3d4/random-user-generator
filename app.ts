import fs from "fs";
import xlsx from "xlsx";
import { hashPassword } from "./utils";
import {
    generateLinearStaffNo,
    generateRandomAvailaiblity,
    generateRandomFirstName,
    generateRandomLastName,
    generateRandomMobileNumber,
    generateRandomOTP,
    generateRandomPassword,
    generateRandomProfile,
    generateStaticQualification,
    getRandomBoolean,
    generateStaticRole,
    generateRandomRefreshToken,
} from "./generator-functions";

//Number of user to generate
const user: number = 100;


//Qualification to create {Super Admin, Admin, Security Officer}
const staticQualification: string = "Security Officer";

//Role level to assign{}
const staticRole: number = 2;

const generateUserData = async (numberOfUsers: number) => {
    const hashedUserData: object[] = [];
    const unhashedUserData: object[] = [];

    // Specify the directory path
    const userDirectoryPath = '../user-data/';

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(userDirectoryPath)) {
        fs.mkdirSync(userDirectoryPath);
    }


    for (let i = 0; i < numberOfUsers; i++) {
        const firstName: string = generateRandomFirstName();
        const lastName: string = generateRandomLastName();
        const email: string = `${firstName}.${lastName}@example.com`.toLowerCase();
        const mobile: string = generateRandomMobileNumber();
        const password: string = generateRandomPassword();
        const hash: string = hashPassword(password);
        const isAdmin: boolean = getRandomBoolean();
        const isSupervisor: boolean = getRandomBoolean();
        const profile: string = generateRandomProfile();
        const role: number = generateStaticRole(staticRole);
        const qualifications: string = generateStaticQualification(staticQualification);
        const availaiblity: string = generateRandomAvailaiblity();
        const refreshtkn: string = generateRandomRefreshToken();
        const otp: number = generateRandomOTP();
        const otpExpiresBy = Date.now() + 60 * 1000;
        const firstLogin = true;
        const staffNo: string = await generateLinearStaffNo();


        hashedUserData.push({
            staffNo,
            firstName,
            lastName,
            email,
            mobile,
            hash,
            isAdmin,
            isSupervisor,
            profile,
            role,
            qualifications,
            availaiblity,
            refreshtkn,
            otp,
            otpExpiresBy,
            firstLogin,
        });

        unhashedUserData.push({
            email,
            password,
        });
    }

    // Export hashed user data to JSON
    const hashedUserDataJSON = JSON.stringify(hashedUserData);
    fs.writeFileSync('../user-data/hashedUserData.json', hashedUserDataJSON);

    // Export unhashed user data to XLSX
    const unhashedUserDataExcel = xlsx.utils.json_to_sheet(unhashedUserData);
    const unhashedUserDataWorkbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(unhashedUserDataWorkbook, unhashedUserDataExcel, 'UnhashedUserData');
    xlsx.utils.book_append_sheet(unhashedUserDataWorkbook, { name: 'Sheet1' });
    xlsx.writeFile(unhashedUserDataWorkbook, '../user-data/unhashedUserData.xlsx');
};

generateUserData(user);