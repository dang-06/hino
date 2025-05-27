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
                    return ['User']
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
                    search: params?.search || '',
                    status: 'New,Need Update',
                    from_date: params?.from_date || '',
                    to_date: params?.to_date || ''
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
                    search: params?.search || '',
                    status: 'Finished Installation,Updated',
                    from_date: params?.from_date || '',
                    to_date: params?.to_date || ''
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
                    search: params?.search || '',
                    status: 'Completed',
                    from_date: params?.from_date || '',
                    to_date: params?.to_date || ''
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
        getSims: builder.query({
            query: (params) => ({
                url: `device_installation/device-installations`,
                method: "GET",
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
            }),
            transformResponse: (response) => {
                if (response && response.data) {
                    const transformedData = response.data.map((item, index) => ({
                        id: item[5] || index,
                        sim_id: item[0],
                        sim_no: item[1],
                        active_date: item[2],
                        expire_date: item[3],
                        network_carrier: item[4]
                    }));

                    const sortedData = [...transformedData].sort((a, b) => b.id - a.id);
                    
                    return {
                        data: sortedData,
                        total: sortedData.length
                    };
                }
                return { data: [], total: 0 };
            },
            providesTags: ["Sim"],
        }),
        importSim: builder.mutation({
            query: (data) => ({
                url: `device_installation/upload-excel`,
                method: "POST",
                body: data,
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Sim']
                }
                return []
            },
        }),
        deleteSim: builder.mutation({
            query: (sim_no) => ({
                url: `device_installation/device-installations/${sim_no}`,
                method: "DELETE",
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Sim']
                }
                return []
            },
        }),
        //VEHICLE
        getVehicles: builder.query({
            query: () => ({
                url: 'vehicle/vehicles',
                method: 'GET',
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")?.replace(/^"(.*)"$/, '$1')}`
                }
            }),
            transformResponse: (response) => {
                console.log("Raw API response:", response);
                if (response && response.code === 0 && Array.isArray(response.message)) {
                    const sortedVehicles = [...response.message].sort((a, b) => b.id - a.id);
                    return {
                        vehicles: sortedVehicles,
                        total_vehicles: sortedVehicles.length
                    };
                }
                return { vehicles: [], total_vehicles: 0 };
            },
            providesTags: ['Vehicle'],
        }),
        importVehicle: builder.mutation({
            query: (data) => ({
                url: `vehicle/import-vehicles`,
                method: "POST",
                body: data,
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Vehicle']
                }
                return []
            },
        }),
        addVehicle: builder.mutation({
            query: (data) => ({
                url: 'vehicle/vehicles',
                method: 'POST',
                body: {
                    vin_no: data.vin_no,
                    equipmentid: data.equipmentid,
                    simno: data.simno,
                },
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Vehicle']
                }
                return []
            },
        }),
        updateVehicle: builder.mutation({
            query: (data) => ({
                url: `vehicle/vehicles/${data.vin_no}`,
                method: 'PUT',
                body: data,
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Vehicle']
                }
                return []
            },
        }),
        getVehicleDetail: builder.query({
            query: (vin_no) => ({
                url: `vehicle/${vin_no}`,
                method: 'GET',
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
            }),
            providesTags: ['Vehicle'],
        }),
        deleteVehicle: builder.mutation({
            query: (vin_no) => ({
                url: `vehicle/vehicles/${vin_no}`,
                method: 'DELETE',
                baseUrl: 'https://api-mobile.hino-connect.vn/iov-app-api/v1/',
            }),
            invalidatesTags: (result, error, arg) => {
                if (!error && result) {
                    return ['Vehicle']
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
    useDeleteUserMutation,
    //sim
    useGetSimsQuery,
    useDeleteSimMutation,
    useImportSimMutation,
    //Vehicle
    useGetVehiclesQuery,
    useGetVehicleDetailQuery,
    useDeleteVehicleMutation,
    useImportVehicleMutation,
    useAddVehicleMutation,
    useUpdateVehicleMutation,
} = apiSlice;
