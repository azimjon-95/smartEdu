import { api } from "./api";

export const payStudentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (payment) => ({
                url: '/api/payments',
                method: 'POST',
                body: payment,
            }),
        }),
        getPayments: builder.query({
            query: () => '/api/payments',
        }),
        getPaymentById: builder.query({
            query: (id) => `/api/payments/${id}`,
        }),
        updatePayment: builder.mutation({
            query: ({ id, body }) => ({
                url: `/api/payments/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deletePayment: builder.mutation({
            query: (id) => ({
                url: `/api/payments/${id}`,
                method: 'DELETE',
            }),
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
