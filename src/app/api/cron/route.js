import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET() {
// console.log("hello bro")
  try {
        var transport = nodemailer.createTransport({
            host: "bulk.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "api",
                pass: process.env.MAILTRAP_PASSWORD,
            }
          });

          const info = await transport.sendMail({
            from: 'info@talentcornertaskmanager.com',
            to: "me@gmail.com",
            bcc: ["veerendragumate@gmail.com","yashkalia4215@gmail.com"],
            subject: "Test Email: This is a Test Message ✔",
            text: "CRON JOBS",
            html: "<p>TEST CRON JOB</p>",
        });
        // console.log("info:", info);
        // console.log("Message sent: %s", info.messageId);
        return NextResponse.json({success:"successfully sent email"}, {status: 201})
    } 
    catch (error) {
        // console.error("Error sending email:", error);
        if (error.code === 'ETIMEDOUT') {
            // Handle timeout error, e.g., retry after a delay
            // console.error("SMTP Connection Timeout:", error.message);
            return NextResponse.json({message:"Connection Timed Out , Please try again later sometime"}, {status:501})
        }
    }
    const result = "Helo, World! This is CRON route."

    return NextResponse.json({ data: result })
}