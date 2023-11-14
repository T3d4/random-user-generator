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
    generateUniqueEmail,
    generateMatricNo,
    generateRandomAdmissionYear,
    generateRandomDepartment,
    generateRandomQualifications,
    generateRandomRole,
} from "./generator-functions";


//Number of user to generate
const user: number = 5000;

// Name of user base that will be given to the file generated
const fileName: string = "student";

//Qualification to create {Super Admin, Admin, Security Officer}
const staticQualification: string = "Admin";

//Role level to assign{}
const staticRole: number = 1;

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
    const userDirectoryPath = '../user-data/student';

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(userDirectoryPath)) {
        fs.mkdirSync(userDirectoryPath);
    }


    for (let i = 0; i < numberOfUsers; i++) {


        const admissionYear: number = generateRandomAdmissionYear();
        const department: string = generateRandomDepartment();
        const fullName: string = `${generateRandomFirstName()} ${generateRandomLastName()}`
        const matricNo: string = generateMatricNo(department, admissionYear);
        const phone: string = generateRandomMobileNumber();

        // spinner.color = "magenta";
        // spinner.text = (`Generating data of ${i} ==> ${numberOfUsers}`);

        // const firstName: string = "admin"
        // const lastName: string = "admin"
        // const email: string = await generateUniqueEmail(firstName, lastName);
        // const mobile: string = generateRandomMobileNumber();
        // const password: string = generateRandomPassword();
        // const hash: string = hashPassword(password);
        // const isAdmin: boolean = true;
        // const profile: string = generateRandomProfile();
        // const role: number = generateStaticRole(staticRole);
        // const qualifications: string = generateStaticQualification(staticQualification);
        // const availaiblity: boolean = getRandomBoolean();
        // const refreshtkn: string = generateRandomRefreshToken();
        // const otp: number = generateRandomOTP();
        // const otpExpiresBy = Date.now() + 60 * 1000;
        // const firstLogin = true;
        // const staffNo: string = await generateLinearStaffNo();

        console.log(`Generating data of ${i} ==> ${numberOfUsers} , ${matricNo}, ${department}, ${fullName}`)

        hashedUserData.push({
            matricNo,
            phone,
            fullName,
            department,
            admissionYear,
        })

        // hashedUserData.push({
        //     staffNo,
        //     firstName,
        //     lastName,
        //     email,
        //     mobile,
        //     hash,
        //     isAdmin,
        //     profile,
        //     role,
        //     qualifications,
        //     availaiblity,
        //     refreshtkn,
        //     otp,
        //     otpExpiresBy,
        //     firstLogin,
        // });

        //     unhashedUserData.push({
        //         email,
        //         password,
        //     });
        // }

        // spinner.succeed(`User generation completed.`);

        // Export hashed user data to JSON
        const hashedUserDataJSON = JSON.stringify(hashedUserData);
        fs.writeFileSync(`../user-data/student/hashed-${fileName.toLowerCase()}-data.json`, hashedUserDataJSON);

        // Export unhashed user data to XLSX
        // const unhashedUserDataExcel = xlsx.utils.json_to_sheet(unhashedUserData);
        // const unhashedUserDataWorkbook = xlsx.utils.book_new();
        // xlsx.utils.book_append_sheet(unhashedUserDataWorkbook, unhashedUserDataExcel, `Unhashed-${fileName}-data`);
        // xlsx.utils.book_append_sheet(unhashedUserDataWorkbook, { name: `${fileName.toLowerCase()}` });
        // xlsx.writeFile(unhashedUserDataWorkbook, `../user-data/unhashed-${fileName.toLowerCase()}-data.xlsx`);
    };
}
generateUserData(user);
