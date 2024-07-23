import { api } from "./api";

export const balansApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBalans: builder.query({
            query: () => '/balans',
        }),
        getBalansById: builder.query({
            query: (id) => `/balans/${id}`,
        }),
        createBalans: builder.mutation({
            query: (newBalans) => ({
                url: '/balans',
                method: 'POST',
                body: newBalans,
            }),
        }),
        updateBalans: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/balans/${id}`,
                method: 'PUT',
                body: rest,
            }),
        }),
        deleteBalans: builder.mutation({
            query: (id) => ({
                url: `/balans/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetBalansQuery,
    useGetBalansByIdQuery,
    useCreateBalansMutation,
    useUpdateBalansMutation,
    useDeleteBalansMutation,
} = balansApi;
