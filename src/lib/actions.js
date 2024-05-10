"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "./connectToDB";
import models from "./models";
const User = models.User;
const Company = models.Company;

export const addCompany = async (prevState, formData) => {
        try {
        
        const { companyname, jobdetails , createdBy } = Object.fromEntries(formData);
        // console.log(formData);

        if (!jobdetails && !companyname) {
            return { error: "Must provide all fields" };
        }
        if (!companyname) {
            return { error: "Must provide companyname" };
        }
        if (!jobdetails) {
            return { error: "Must provide jobdetails" };
        }

        connectToDB();

        const newCompany = new Company({
            companyname,
            jobdetails,
            createdBy, //coming from frontend inside formData
            status: "in progress",
        });

        // console.log(newCompany);

        await newCompany.save();
        console.log("New Company added");
        revalidatePath('/api/company');
        return { success: true };
    } catch (err) {
        console.error(err);
        return { error: "Above company details already exists" };
    }
}

export const getAllCompanies = async () => {
    try {
        connectToDB();

        const url = `${process.env.NEXTAUTH_URL}/api/company`;
        const res = await fetch(url, { cache: 'no-store' });
        // console.log("res:",res.json())

        if (res.status !== 200) {
            return { error: "Error in getting companies" };
        }
        return res.json();
    }
    catch (err) {
        console.log("error in getting companies: ", err);
        return null;
    }
}
