import { api } from "./api";

export const teacherApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTeachers: builder.query({
            query: () => '/api/teacher',
        }),
        getTeacherById: builder.query({
            query: (id) => `/teacher/${id}`,
        }),
        createTeacher: builder.mutation({
            query: (newTeacher) => ({
                url: '/api/teacher',
                method: 'POST',
                body: newTeacher,
            }),
        }),
        updateTeacher: builder.mutation({
            query: ({ id, ...update }) => ({
                url: `/api/teacher/${id}`,
                method: 'PUT',
                body: update,
            }),
        }),
        deleteTeacher: builder.mutation({
            query: (id) => ({
                url: `/api/teacher/${id}`,
                method: 'DELETE',
            }),
        }),
        signIn: builder.mutation({
            query: (credentials) => ({
                url: '/api/teacher/signin',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const {
    useGetAllTeachersQuery,
    useGetTeacherByIdQuery,
    useCreateTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
    useSignInMutation,
} = teacherApi;
