import { api } from "./api";

// API xizmatini yaratamiz
export const fetchBaseQuery = api.injectEndpoints({
    endpoints: (builder) => ({
        // CREATE: Yangi xarajat qo'shish
        createExpense: builder.mutation({
            query: (body) => ({
                url: '/expenses',
                method: 'POST',
                body,
            }),
            // Create operatsiyasi muvaffaqiyatli bo'lsa, 'expenses' tagini invalidatsiya qiladi
            invalidatesTags: ['expenses'],
        }),

        // READ: Barcha xarajatlarni olish
        getAllExpenses: builder.query({
            query: () => '/expenses',
            providesTags: ['expenses'], // Barcha xarajatlar uchun tag
        }),

        // READ: ID bo'yicha xarajatni olish
        getExpenseById: builder.query({
            query: (id) => `/expenses/${id}`,
            providesTags: (result) =>
                result ? [{ type: 'expenses', id: result._id }] : [], // Xarajat mavjud bo'lsa, tegishli tag beradi
        }),

        // UPDATE: Xarajatni yangilash
        updateExpense: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/expenses/${id}`,
                method: 'PATCH',
                body: body,
            }),
            // Yangilash operatsiyasi muvaffaqiyatli bo'lsa, 'expenses' tagini invalidatsiya qiladi
            invalidatesTags: (result) => [{ type: 'expenses', id: result._id }],
        }),

        // DELETE: Xarajatni o'chirish
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: 'DELETE',
            }),
            // O'chirish operatsiyasi muvaffaqiyatli bo'lsa, 'expenses' tagini invalidatsiya qiladi
            invalidatesTags: ['expenses'],
        }),
    }),
});

export const {
    useCreateExpenseMutation,
    useGetAllExpensesQuery,
    useGetExpenseByIdQuery,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
} = fetchBaseQuery;

