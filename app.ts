import fs from "fs";
import xlsx from "xlsx";
import { hashPassword } from "./utils";
import {
    generateLinearStaffNo,
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
    generateUniqueEmail
} from "./generator-functions";


//Number of user to generate
const user: number = 100;

// Name of user base that will be given to the file generated
const fileName: string = "Security";

//Qualification to create {Super Admin, Admin, Security Officer}
const staticQualification: string = "Security Officer";

//Role level to assign{}
const staticRole: number = 2;

/**
 * 
 * @param numberOfUsers 
 */
const generateUserData = async (numberOfUsers: number) => {
    // const oraImport = await import('ora');
    // const ora = oraImport.default;
    // const spinner = ora(`Generating ${fileName.toLowerCase()}'s data`).start();
    const hashedUserData: object[] = [];
    const unhashedUserData: object[] = [];

    // Specify the directory path
    const userDirectoryPath = '../user-data/';

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(userDirectoryPath)) {
        fs.mkdirSync(userDirectoryPath);
    }

    for (let i = 0; i < numberOfUsers; i++) {

        // spinner.color = "magenta";
        // spinner.text = (`Generating data of ${i} ==> ${numberOfUsers}`);

        const firstName: string = generateRandomFirstName();
        const lastName: string = generateRandomLastName();
        const email: string = generateUniqueEmail(firstName, lastName);
        const mobile: string = generateRandomMobileNumber();
        const password: string = generateRandomPassword();
        const hash: string = hashPassword(password);
        const isAdmin: boolean = false;
        const profile: string = generateRandomProfile();
        const role: number = generateStaticRole(staticRole);
        const qualifications: string = generateStaticQualification(staticQualification);
        const availaiblity: boolean = getRandomBoolean();
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

    // spinner.succeed(`User generation completed.`);

    // Export hashed user data to JSON
    const hashedUserDataJSON = JSON.stringify(hashedUserData);
    fs.writeFileSync(`../user-data/hashed-${fileName.toLowerCase()}-data.json`, hashedUserDataJSON);

    // Export unhashed user data to XLSX
    const unhashedUserDataExcel = xlsx.utils.json_to_sheet(unhashedUserData);
    const unhashedUserDataWorkbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(unhashedUserDataWorkbook, unhashedUserDataExcel, `Unhashed-${fileName}-data`);
    xlsx.utils.book_append_sheet(unhashedUserDataWorkbook, { name: `${fileName.toLowerCase()}` });
    xlsx.writeFile(unhashedUserDataWorkbook, `../user-data/unhashed-${fileName.toLowerCase()}-data.xlsx`);
};

generateUserData(user);
