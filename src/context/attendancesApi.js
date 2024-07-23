import { api } from "./api";

export const attendancesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAttendances: builder.query({
            query: () => 'attendances',
        }),
        getAttendanceById: builder.query({
            query: (id) => `attendances/${id}`,
        }),
        createAttendance: builder.mutation({
            query: (newAttendance) => ({
                url: 'attendances',
                method: 'POST',
                body: newAttendance,
            }),
        }),
        updateAttendance: builder.mutation({
            query: ({ id, ...updatedAttendance }) => ({
                url: `attendances/${id}`,
                method: 'PUT',
                body: updatedAttendance,
            }),
        }),
        deleteAttendance: builder.mutation({
            query: (id) => ({
                url: `attendances/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAttendancesQuery,
    useGetAttendanceByIdQuery,
    useCreateAttendanceMutation,
    useUpdateAttendanceMutation,
    useDeleteAttendanceMutation,
} = attendancesApi;
