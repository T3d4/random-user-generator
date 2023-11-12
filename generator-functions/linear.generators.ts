import fs from 'fs/promises';
import path from 'path';

const staffNoDigits: number = 3;
const counterFilePath: string = '../user-data/linearStaffCounter.txt';
const usedStaffNumbersFilePath: string = '../user-data/usedStaffNumbers.txt';
const maxRandomDigits: number = Math.pow(10, staffNoDigits);

const isStaffNumberUsed = async (staffNumber: string): Promise<boolean> => {
    try {
        const usedNumbersData = await fs.readFile(usedStaffNumbersFilePath, 'utf8');
        const usedNumbers = usedNumbersData.split('\n').map((num) => num.trim());
        return usedNumbers.includes(staffNumber);
    } catch (err) {
        return false;
    }
};

const markStaffNumberAsUsed = async (staffNumber: string): Promise<void> => {
    await fs.appendFile(usedStaffNumbersFilePath, `${staffNumber}\n`, 'utf8');
};

export const generateLinearStaffNo = async (): Promise<string> => {
    let counter;

    // Check if the directory exists, if not, create it
    try {
        await fs.access(path.dirname(counterFilePath));
    } catch (dirErr) {
        await fs.mkdir(path.dirname(counterFilePath));
    }

    try {
        // Check if the file exists
        await fs.access(counterFilePath);

        // Load the last generated counter from file
        const data = await fs.readFile(counterFilePath, 'utf8');
        counter = parseInt(data, 10) || 2;
    } catch (err) {
        // File doesn't exist, create it with an initial value
        counter = 2;

        await fs.writeFile(counterFilePath, counter.toString(), 'utf8');
    }

    let generatedStaffNo: string = ' ';
    let isUnique: boolean = false;

    // Keep generating until a unique staff number is found
    while (!isUnique) {
        // Increment the counter
        counter++;

        // Save the updated counter to the file
        await fs.writeFile(counterFilePath, counter.toString(), 'utf8');

        // Generate the staff number
        generatedStaffNo = `${counter % maxRandomDigits}`;

        // Check if the staff number is already used
        isUnique = !(await isStaffNumberUsed(generatedStaffNo));
    }

    // Mark the generated staff number as used
    await markStaffNumberAsUsed(generatedStaffNo);

    return generatedStaffNo;
};
