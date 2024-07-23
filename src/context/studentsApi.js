import { api } from "./api";

export const studentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStudent: builder.query({
            query: () => '/api/student/',
            providesTags: ['Student']
        }),
        createStudent: builder.mutation({
            query: (newStudent) => ({
                url: '/api/student/',
                method: 'POST',
                body: newStudent,
            }),
            invalidatesTags: ['Student']
        }),
        updateStudent: builder.mutation({
            query: ({ id, body }) => ({
                url: `/api/student/${id}`,
                method: 'PUT',
                body,
            }),
            invalidTags: ["Student"]

        }),
        updateStudentsState: builder.mutation({
            query: (groupId) => ({
                url: `/api/students/update-state/${groupId}`,
                method: 'PUT',
            }),
            invalidTags: ["Student"]

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
    useUpdateStudentsStateMutation
} = studentApi;








