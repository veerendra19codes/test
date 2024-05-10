"use client";

import React, { useState, useEffect } from 'react'
import { useFormState } from "react-dom";
import { addCompany } from '@/lib/actions';
import { ToastContainer, toast } from 'react-toastify';

import { useRouter, useServerInsertedHTML } from 'next/navigation';
import mongoose from 'mongoose';

import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
    const router = useRouter();
    const userId = "6631248f03003d3a90a871cc";
    const createdBy = new mongoose.Types.ObjectId(userId); 
    console.log("userId:", userId);
    console.log("createdBy:",createdBy);

    const [info, setInfo] = useState({ companyname: "", jobdetails: "",createdBy });
    

    const handleInput = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const [state, formAction] = useFormState(addCompany, undefined);

    useEffect(() => {
        if (state?.success) {
            toast("Company listed successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            router.refresh("/dashboardbd")
            router.push("/dashboardbd");
        }
    }, [router,createdBy]);

    return (
        <div className="flex  h-screen justify-center items-center ">

                <form action={formAction} className="w-[450px] m-auto mt-24 p-12 pb-8 bg-white rounded-xl flex flex-col justify-center items-center gap-4 shadow-xl ">
                    <h1 className="text-3xl font-bold text-purple ">Add new openings</h1>

                    <input type="hidden" name="createdBy" value={createdBy} />

                    <div className="w-full flex flex-col">

                        <label className="text-lg font-normal text-purple">Company name</label>
                        <input type="text" name="companyname" placeholder="Ex. Infosys Ltd" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full  " onChange={e => handleInput(e)} />
                    </div>

                    <div className="w-full flex flex-col">

                        <label className="text-lg font-normal text-purple">Job details</label>
                        <input type="text" name="jobdetails" placeholder="mail url" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full " onChange={e => handleInput(e)} />
                        <p className="text-purple">Use <a href="https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa" target="_blank" className="underline text-blue-500">cloudhq</a> and paste the mail url here</p>
                    </div>



                    {state?.error && (
                        <span className="w-full font-semibold text-center text-red-600">
                            {state.error}
                        </span>
                    )}

                    <button type="submit" className="px-12 bg-purple-500 text-2xl font-medium rounded-xl py-4 text-white  hover:bg-purple">Add</button>
                    <ToastContainer />

                </form>
        </div>
    )
}

export default HomePage
