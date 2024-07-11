import { api } from "./api";

export const studentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStudent: builder.query({
            query: () => '/api/student/',
        }),
        createStudent: builder.mutation({
            query: (newStudent) => ({
                url: '/api/student/',
                method: 'POST',
                body: newStudent,
            }),
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...update }) => ({
                url: `/api/student/${id}`,
                method: 'PUT',
                body: update,
            }),
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/api/student/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetStudentQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
} = studentApi;








