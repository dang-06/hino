import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import { identity } from "lodash";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        // console.log(getState())
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJPbmVsaW5rVGVjaG5vbG9neSIsInVzZXJuYW1lIjoiT25lbGlua0BBZG1pbmlzdHJhdG9yIiwicGFzc3dvcmQiOiJQQHNzdzByRCIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwiZXhwIjoyMDI1NTIxNDExfQ.nGIAiv2UuQMd3SQu5dkpnfqsOBv8RLPBl5jQ3vbr1_k';
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        // headers.set('Access-Control-Allow-Origin', '*')
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    // keepUnusedDataFor: 1,
    tagTypes: [
        'Installation',
        'SaleOrder',
    ],
    endpoints: (builder) => ({
        getInstallation: builder.query({
            query: (data) => ({
                url: `installation${data}`,
                method: "GET",
            }),
            providesTags: ["Installation"],
        }),
        getInstallationDetail: builder.query({
            query: (id) => ({
                url: `installation/{installation_id}?id=${id}`,
                method: "GET",
            }),
            providesTags: ["Installation Detail"],
        }),
        addInstallation: builder.mutation({
            query: (data) => ({
                url: "job/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['installation']
                }
                return []
            },
        }),
        updateInstallation: builder.mutation({
            query: (data) => ({
                url: `installation/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Installation']
                }
                return []
            },
        }),
        deleteInstallation: builder.mutation({
            query: (data) => ({
                url: `job/delete`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Installation']
                }
                return []
            },
        }),

        // Sale order
        getSaleOrder: builder.query({
            query: (data) => ({
                url: `sale-order${data}`,
                method: "GET",
            }),
            providesTags: ["SaleOrder"],
        }),
        getSaleOrderDetail: builder.query({
            query: (id) => ({
                url: `sale-order/{SaleOrder_id}?id=${id}`,
                method: "GET",
            }),
            providesTags: ["SaleOrder Detail"],
        }),
        addSaleOrder: builder.mutation({
            query: (data) => ({
                url: "sale-order",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['SaleOrder']
                }
                return []
            },
        }),
        updateSaleOrder: builder.mutation({
            query: (data) => ({
                url: `sale-order/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['SaleOrder']
                }
                return []
            },
        }),
        deleteSaleOrder: builder.mutation({
            query: (id) => ({
                url: `SaleOrder/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['SaleOrder']
                }
                return []
            },
        }),

        // Invoice
        getInvoice: builder.query({
            query: (data) => ({
                url: `invoice${data}`,
                method: "GET",
            }),
            providesTags: ["Invoice"],
        }),
        getInvoiceDetail: builder.query({
            query: (id) => ({
                url: `invoice/{Invoice_id}?id=${id}`,
                method: "GET",
            }),
            providesTags: ["Invoice Detail"],
        }),
        addInvoice: builder.mutation({
            query: (data) => ({
                url: "invoice",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Invoice']
                }
                return []
            },
        }),
        updateInvoice: builder.mutation({
            query: (data) => ({
                url: `invoice/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Invoice']
                }
                return []
            },
        }),
        deleteInvoice: builder.mutation({
            query: (id) => ({
                url: `invoice/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Invoice']
                }
                return []
            },
        }),

        registerUser: builder.mutation({
            query: (data) => ({
                url: "auth/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Register']
                }
                return []
            },
        }),

    }),
});

export const {
    //Installation
    useGetInstallationQuery,
    useGetInstallationDetailQuery,
    useAddInstallationMutation,
    useUpdateInstallationMutation,
    useDeleteInstallationMutation,

    //Sale order
    useGetSaleOrderQuery,
    useGetSaleOrderDetailQuery,
    useAddSaleOrderMutation,
    useUpdateSaleOrderMutation,
    useDeleteSaleOrderMutation,

    //Invoice
    useGetInvoiceQuery,
    useGetInvoiceDetailQuery,
    useAddInvoiceMutation,
    useUpdateInvoiceMutation,
    useDeleteInvoiceMutation,

    //Register
    useRegisterUserMutation,
} = apiSlice;
