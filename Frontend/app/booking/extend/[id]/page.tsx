import { authOptions } from "@/libs/authOptions";
import ExtendDate from "@/components/ExtendDate";
import { getServerSession } from "next-auth";

export default async function ExtendPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null

    const token = session.user.token

    return (
        <ExtendDate bookingID={params.id} token={token}/>
    )
};
