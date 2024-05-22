import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../libs/authOptions";
import CustomButton from "./CustomButton";
import { IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PaymentIcon from '@mui/icons-material/Payment';
import getUser from "@/libs/getUser";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    let isAdmin = false;
    let isUser = false;

    if (session) {
        var userProfile = await getUser(session.user.token);
        if (userProfile.data.role === 'admin') {
            isAdmin = true;
        }
        if (userProfile.data.role === 'user') {
            isUser = true;
        }
    }
    
    return (
        <header className="w-full absolute z-10">
            <nav className="max-w-full flex justify-between items-center sm:px-16 px-6 py-4">
                <Link href="/" className="flex justify-center items-center animate-fade-down">
                    <Image src="/new-logo-gearup.png" alt="Car Hub Logo" width={130} height={29} className="object-contain transition-transform duration-500 ease-in-out hover:scale-110"/>
                </Link>

                <div className="flex items-center gap-5 ">
                    {
                        isAdmin ? 
                        <IconButton href="/admin" className="animate-fade-down animate-delay-500" style={{ color: "#6667AB" }}>
                            <AdminPanelSettingsIcon sx={{ fontSize: 30 }} className="transition-transform duration-300 ease-in-out hover:scale-110"/>
                        </IconButton>
                        : null
                    } 
                    {
                        isUser ?
                        <IconButton href="/payment" className="animate-fade-down animate-delay-500" style={{ color: "#6667AB" }}>
                            <PaymentIcon sx={{ fontSize: 30 }} className="transition-transform duration-300 ease-in-out hover:scale-110" />
                        </IconButton>
                        : null
                    }
                    {
                        session ?
                        <IconButton href="/booking" className="animate-fade-down animate-delay-500" style={{ color: "#6667AB" }}>
                            <DirectionsCarIcon sx={{ fontSize: 30 }} className="transition-transform duration-300 ease-in-out hover:scale-110"/>
                        </IconButton>
                        : null
                    }
                    {
                        session ?
                        <IconButton href="/info" className="animate-fade-down animate-delay-500" style={{ color: "#6667AB" }}>
                            <AccountCircleIcon sx={{ fontSize: 30 }} className="transition-transform duration-300 ease-in-out hover:scale-110"/>
                        </IconButton>
                        : null
                    }
                    {
                        session ? null 
                        : 
                        <Link href="/api/auth/signin" className="transition-transform duration-500 ease-in-out hover:scale-105">
                            <button className="transition text-bold  duration-300 xl:text-primary-blue-100 xl:hover:text-zinc-200 text-primary-blue animate-fade-down animate-delay-1000">Log In</button>
                        </Link> 
                    }
                  
                    {
                        session ?
                        <Link href="/api/auth/signout" className="transition-transform duration-500 ease-in-out hover:scale-105">
                            <CustomButton title="Sign Out" btnType="button" containerStyles=" bg-primary-blue rounded-full  min-w-[130px] animate-fade-down animate-delay-1000"/>
                        </Link>
                        : 
                        <Link href="/signup" className="transition-transform duration-500 ease-in-out hover:scale-105">
                            <CustomButton title="Sign Up" btnType="button" containerStyles="  transition duration-300 xl:text-primary-blue text-white rounded-full xl:bg-white xl:hover:bg-zinc-100 xl:hover:border-zinc-100 bg-primary-blue min-w-[130px] animate-fade-down animate-delay-1000"/>
                        </Link> 
                    }
            
                </div>
            </nav>
        </header>
    );
};
