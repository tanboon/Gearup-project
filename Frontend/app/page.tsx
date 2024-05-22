'use client'

import Hero from "@/components/Hero";
import CarLists from "@/components/Home";
import getUser from "@/libs/getUser";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<any>()
  let isLoggedIn = false;

  useEffect(() => {
    const fetchUser =async () => {
      if(session)
      var profile = await getUser(session.user.token);
      setUserProfile(profile)
    }
    fetchUser()
  }, [])
  
  if (session) {
   var username = userProfile?.data.name;
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  return (
    <main className="overflow-hidden">
      {session ? (
        <Hero loggedIn={isLoggedIn} username={username} />
      ) : (
        <Hero loggedIn={isLoggedIn}  />
      )}
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        {session ? 
          null
          :
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Car Catalog</h1>
            <p>Explore the cars you might like</p>
          </div>
        }
        
        <CarLists />
      </div>
    </main>
  );
}

