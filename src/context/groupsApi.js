import { api } from "./api";

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRegistration: builder.mutation({
      query: (newRegistration) => ({
        url: '/api/groups/',
        method: 'POST',
        body: newRegistration,
      }),
      invalidatesTags: ['Registration']
    }),
    getAllRegistrations: builder.query({
      query: () => '/api/groups/',
      providesTags: ['Registration']
    }),
    getRegistration: builder.query({
      query: (id) => `/api/groups/${id}`,
      providesTags: ['Registration']
    }),
    updateRegistration: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/groups/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Registration']
    }),
    deleteRegistration: builder.mutation({
      query: (id) => ({
        url: `/api/groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Registration']
    }),
  }),
});

export const {
  useCreateRegistrationMutation,
  useGetAllRegistrationsQuery,
  useGetRegistrationQuery,
  useUpdateRegistrationMutation,
  useDeleteRegistrationMutation,
} = groupsApi;


