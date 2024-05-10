"use client";

import { getAllCompanies } from '@/lib/actions';
import React, { useState, useEffect } from 'react'
import mongoose from 'mongoose';

const DashboardBD = () => {
    const [allCompanies, setAllCompanies] = useState([]);
    // console.log("allcompanies:", allCompanies)
    // const userId = "6631248f03003d3a90a871cc";
    // const createdBy = new mongoose.Types.ObjectId(userId).toString();

    useEffect(() => {
        const fetchData = async () => {
            const allC = await getAllCompanies()
            // console.log("allC:", allC)
            // const mycompanies = allC.filter((c) => c.createdBy.toString() === createdBy);
            // console.log("my companies:", mycompanies);
            setAllCompanies(allC)
        }
        fetchData();
    }, [])
    return (
        <ul>
            {allCompanies.length > 0 &&
                allCompanies?.map((c) => (
                    <li key={c.companyname}>{c.companyname}</li>
                ))
            }
            {allCompanies.length === 0 && <div>Loading...</div>}
        </ul>
    )
}

export default DashboardBD
