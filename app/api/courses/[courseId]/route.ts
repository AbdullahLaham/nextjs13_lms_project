import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {
    courseId: string
}}) {
    try {
        const {userId} = auth();
        const values = await req.json();
        const {courseId} = params;
         
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
        });
        return NextResponse.json(course)

    } catch(error) {
        console.log("[COURSES_ID]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}