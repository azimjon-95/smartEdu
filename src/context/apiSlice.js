import { api } from "./api";

export const apiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadPdf: builder.mutation({
            query: (formData) => ({
                url: '/upload',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Pdf'],
        }),
    }),
});

export const { useUploadPdfMutation } = apiSlice;

