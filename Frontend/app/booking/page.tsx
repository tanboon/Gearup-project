import BookingLists from "@/components/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export default async function bookings(){
  const session = await getServerSession(authOptions)
  if (!session || !session.user.token) return null

  const token = session.user.token

  return (
    <main className="overflow-hidden">

      <div className="mt-24 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold ">Your Booking</h1>
        </div>

        <BookingLists token={token}/>
      </div>
    </main>
  );

}
