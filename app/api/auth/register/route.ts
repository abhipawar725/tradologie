import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    await connectDB()
    const {name, email, password} = await req.json();

    if(!name || !email || !password){
        return NextResponse.json(
            {message: "All fields are required"},
            {status: 400}
        )
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        return NextResponse.json(
            {message: "User already exist"},
            {status: 400}
        )
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password: hashedPassword})

    return NextResponse.json({message: "User registered successfully"})
}