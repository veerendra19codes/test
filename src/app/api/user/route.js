import models from "@/lib/models";
const User = models.Company;
import { connectToDB } from "@/lib/connectToDB";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        connectToDB();

        const users = await User.find();
        return NextResponse.json(users,{status: 200});
    }
    catch(err) {
        return NextResponse.json({error:"error in getting all users"}, {status: 501})
        // console.log("Error in getting companies in route.js:", err);
    }
}
