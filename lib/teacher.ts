export const isTeacher = (userId?: string | null) => {
    return userId === process.env.NEXT_PUBLICK_TEACHER_ID;

}