import { api } from "./api";

export const attendancesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAttendances: builder.query({
            query: () => 'attendances',
            providesTags: ['Attendances']
        }),
        getAttendanceById: builder.query({
            query: (id) => `attendances/${id}`,
            providesTags: ['Attendances']
        }),
        createAttendance: builder.mutation({
            query: (newAttendance) => ({
                url: 'attendances',
                method: 'POST',
                body: newAttendance,
            }),
            invalidatesTags: ['Attendances']
        }),
        updateAttendance: builder.mutation({
            query: ({ id, ...updatedAttendance }) => ({
                url: `attendances/${id}`,
                method: 'PUT',
                body: updatedAttendance,
            }),
            invalidatesTags: ['Attendances']
        }),
        deleteAttendance: builder.mutation({
            query: (id) => ({
                url: `attendances/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Attendances']
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
