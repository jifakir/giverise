// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../utils/api'
import { Card, SaveCard } from './types';

// Define a service using a base URL and expected endpoints
export const giveriseApi = createApi({
  reducerPath: 'giveriseApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
        const token:string | undefined = getToken();
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
          headers.set('authorization', `Bearer ${token}`)
        }
        return headers
      },
    }),
  tagTypes: ['Cards', 'Category', 'Campaign','Invitation','Media'],
  endpoints: (builder) => ({
    fetchCards: builder.query<any, any>({
      query: () => `/payment-gateway/stripe/cardlist`,
      providesTags: ['Cards']
    }),
    saveCard: builder.mutation<SaveCard, any>({
      query: (body) => ({
        url: `/payment-gateway/stripe/savecard`,
        method: 'post',
        body
      }),
      invalidatesTags: ['Cards']
    }),
    fetchCategories: builder.query<any, any>({
      query: () => `/categories`,
      providesTags: ['Category']
    }),
    // +++++++++++++ Campaign +++++++++++++++
    createCampaign: builder.mutation<any, any>({
      query: (body) => ({
        url: `/campaigns`,
        method: 'post',
        body
      }),
      invalidatesTags: ['Campaign']
    }),
    updateCampaign: builder.mutation<any, any>({
      query: ({body, campaignId}) => ({
        url: `/campaigns/${campaignId}`,
        method: 'put',
        body
      }),
      invalidatesTags: ['Campaign']
    }),
    // +++++++++++++ Invitations ++++++++++++++
    sendInvitation: builder.mutation<any, any>({
      query: (body) => ({
        url: `/invitations`,
        method: 'post',
        body
      }),
      invalidatesTags: ['Invitation']
    }),
    fetchInvitations: builder.query<any, any>({
      query: () => `/invitations`,
      providesTags: ['Invitation']
    }),
    uploadImage: builder.mutation<any, any>({
      query: (body) => ({
        url: `/media/upload`,
        method: 'post',
        body
      }),
      invalidatesTags: ['Media']
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useFetchCardsQuery,
    useSaveCardMutation,
    useFetchCategoriesQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useFetchInvitationsQuery,
    useSendInvitationMutation,
    useUploadImageMutation,
 } = giveriseApi;
 