import { api } from "./api";

export const payStudentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (payment) => ({
                url: '/api/payments',
                method: 'POST',
                body: payment,
            }),
            invalidatesTags: ['Payment']
        }),
        getPayments: builder.query({
            query: () => '/api/payments',
            providesTags: ['Payment']
        }),
        getPaymentById: builder.query({
            query: (id) => `/api/payments/${id}`,
            providesTags: ['Payment']
        }),
        updatePayment: builder.mutation({
            query: ({ id, body }) => ({
                url: `/api/payments/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Payment']
        }),
        deletePayment: builder.mutation({
            query: (id) => ({
                url: `/api/payments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Payment']
        }),
    }),
});

export const {
    useCreatePaymentMutation,
    useGetPaymentsQuery,
    useGetPaymentByIdQuery,
    useUpdatePaymentMutation,
    useDeletePaymentMutation,
} = payStudentsApi;

export default api;
