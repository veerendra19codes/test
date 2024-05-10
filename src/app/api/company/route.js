import models from "@/lib/models";
const Company = models.Company;
import { connectToDB } from "@/lib/connectToDB";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        connectToDB();

        const companies = await Company.find();
        return NextResponse.json(companies,{status: 200});
    }
    catch(err) {
        return NextResponse.json({error:"error in getting all companies"}, {status: 501})
        // console.log("Error in getting companies in route.js:", err);
    }
}
