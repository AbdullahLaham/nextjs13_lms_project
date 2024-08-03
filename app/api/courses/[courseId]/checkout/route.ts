import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST({params}: {params: {courseId: string}}) {
    try {
        const user = await currentUser();
        if (!user?.id || !user?.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", {status: 401})
        }

    } catch (error) {
        console.log('COURSEID_CHECKOUT', error);
        return new NextResponse("internal error", {status: 500})
    }
}