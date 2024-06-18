import { api } from "./api";

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createRegistration: builder.mutation({
      query: (newRegistration) => ({
        url: '/api/groups/',
        method: 'POST',
        body: newRegistration,
      }),
    }),
    getAllRegistrations: builder.query({
      query: () => '/api/groups/',
    }),
    getRegistration: builder.query({
      query: (id) => `/api/groups/${id}`,
    }),
    updateRegistration: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `/api/groups/${id}`,
        method: 'PUT',
        body: update,
      }),
    }),
    deleteRegistration: builder.mutation({
      query: (id) => ({
        url: `/api/groups/${id}`,
        method: 'DELETE',
      }),
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


