import { IPersonnel } from "../Interfaces";
import { Schema, model } from "mongoose";

const personnelSchema = new Schema<IPersonnel>(
    {
        staffNo: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        mobile: {
            type: String,
        },
        hash: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isSupervisor: {
            type: Boolean,
            default: false,
        },
        profile: {
            type: String,
        },
        role: {
            type: Number,
            required: true,
        },
        qualifications: {
            type: String,
        },
        availaiblity: {
            type: String,
        },
        refreshtkn: {
            type: String,
        },
        otp: {
            type: Number,
        },
        otpExpiresBy: {
            type: Number,
        },
        firstLogin: {
            type: Boolean,
            default: true,
        },
    });

export const Personnel = model<IPersonnel>("personnel", personnelSchema);