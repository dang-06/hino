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
        'Job',
        'User'
    ],
    endpoints: (builder) => ({
        // getInstallation: builder.query({
        //     query: (params) => ({
        //         url: `installation?page=${params.page}&size=${params.rowsPerPage}`,
        //         method: "GET",
        //     }),
        //     providesTags: ["Installation"],
        // }),
        // getInstallationDetail: builder.query({
        //     query: (id) => ({
        //         url: `installation/{installation_id}?id=${id}`,
        //         method: "GET",
        //     }),
        //     providesTags: ["Installation Detail"],
        // }),
        // addInstallation: builder.mutation({
        //     query: (data) => ({
        //         url: "installation",
        //         method: "POST",
        //         body: data,
        //     }),
        //     invalidatesTags: (result, error, arg) => {
        //         if (!error && result) {
        //             return ['installation']
        //         }
        //         return []
        //     },
        // }),
        getInstallation: builder.query({
            query: (params) => ({
                url: `installation?page=${params.page}&size=${params.rowsPerPage}`,
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
                    return ['Installation']
                }
                return []
            },
        }),
        updateInstallation: builder.mutation({
            query: (data) => ({
                url: '/installation',
                method: 'PUT',
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
                    return ['Installation', 'Job Completed']
                }
                return []
            },
            // invalidatesTags: ['Installation'],
        }),
        reviewInstallation: builder.mutation({
            query: (data) => ({
                url: `job/review-installation/${data.job_id}`,
                method: "POST",
                body: data.body,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Installation']
                }
                return []
            },
            invalidatesTags: ['Installation'],
        }),
        // deleteInstallation: builder.mutation({
        //     query: (id) => ({
        //         url: `installation/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: (result, error, arg) => {
        //         if (!error && result) {
        //             return ['Installation']
        //         }
        //         return []
        //     },
        // }),

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

        assignJob: builder.mutation({
            query: (data) => ({
                url: "job/assign",
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

        // Job
        getJob: builder.query({
            query: (params) => ({
                url: `job/search`,
                method: "GET",
                params: {
                    page: params?.page,
                    size: params?.size || 10
                }
            }),
            providesTags: ["Job"],
        }),
        getJobDetail: builder.query({
            query: (id) => ({
                url: `job/{job_id}?id=${id}`,
                method: "GET",
            }),
            providesTags: ["Job Detail"],
        }),
        searchJobs: builder.query({
            query: (params) => ({
                url: 'job/search',
                method: 'GET',
                params: {
                    page: params?.page || 1,
                    size: params?.size || 10,
                    search: params?.search || '',
                    status: params?.status || '',
                    from_date: params?.from_date || '',
                    to_date: params?.to_date || ''
                }
            }),
            providesTags: ['Job']
        }),
        getNewJobs: builder.query({
            query: (params) => ({
                url: `job/search`,
                method: "GET",
                params: {
                    page: params?.page,
                    size: params?.size || 10,
                    status: 'New,Need Update'
                }
            }),
            providesTags: ["Job"],
        }),
        getFinishedJobs: builder.query({
            query: (params) => ({
                url: `job/search`,
                method: "GET",
                params: {
                    page: params?.page,
                    size: params?.size || 10,
                    status: 'Finished Installation,Updated'
                }
            }),
            providesTags: ["Job"],
        }),
        getCompletedJobs: builder.query({
            query: (params) => ({
                url: `job/search`,
                method: "GET",
                params: {
                    page: params?.page,
                    size: params?.size || 10,
                    status: 'Completed'
                }
            }),
            providesTags: ["Job Completed"],
        }),
        getOverview: builder.query({
            query: (params) => ({
                url: 'report/overview',
                method: 'GET',
                params: {
                    type: params?.type || 'all',
                }
            }),
            providesTags: ['Overview']
        }),
        getTechnicianKPI: builder.query({
            query: (params) => ({
                url: 'report/technician-kpi/all',
                method: 'GET',
                params: {
                    page: params?.page || 1,
                    size: params?.size || 10,
                    search: params?.search || '',
                    from_date: params?.from_date || '',
                    to_date: params?.to_date || ''
                }
            }),
            providesTags: ['Overview']
        }),

        //user
        getUser: builder.query({
            query: (params) => ({
                url: 'user/users',
                method: 'GET',
                params: {
                    page: params?.page || 1,
                    size: params?.size || 10,
                    user_name: params?.user_name || '',
                    full_name: params?.full_name || '',
                    phone_number: params?.phone_number || '',
                    email: params?.email || ''
                }
            }),
            providesTags: ['User']
        }),
        addUser: builder.mutation({
            query: (data) => ({
                url: "invoice",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['User']
                }
                return []
            },
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `user/users/${data.user_id}`,
                method: "PUT",
                body: {
                    full_name: data.full_name,
                    email: data.email,
                    gender: data.gender,
                    phone_number: data.phone_number,
                    address: data.address,
                    date_of_birth: data.date_of_birth,
                },
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['User']
                }
                return []
            },
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['User']
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
    useReviewInstallationMutation,

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
    //Assign Job
    useAssignJobMutation,
    // Job
    useGetJobQuery,
    useGetJobDetailQuery,
    useSearchJobsQuery,
    useGetNewJobsQuery,
    useGetFinishedJobsQuery,
    useGetCompletedJobsQuery,
    useLazyGetCompletedJobsQuery,
    //KPI
    useGetOverviewQuery,
    useGetTechnicianKPIQuery,
    //User
    useGetUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = apiSlice;
