import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.thinkific.com/api/public/v1",
});

// axiosClient.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// axiosClient.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   async function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log("axiosClient Interceptors Errors", error);
//     const { response } = error;
//     if (response.status === 401) {
//       const tenantRepo = getRepository(Tenant);
//       const sessionRepo = getRepository(Session);
//       try {
//         const tenantRes = await tenantRepo.findOne({
//           where: {},
//         });
//       } catch (error) {}
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosClient;
