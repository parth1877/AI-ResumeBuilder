import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY


const axiosClient = axios.create({
    baseURL:"http://localhost:1337/api/",
    headers :{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${API_KEY}`
    }
})

const CreateResume = (data)=>{ return axiosClient.post(`/user-resumes`,data)};

const GetUserResumes = (userEmail)=>axiosClient.get("/user-resumes?filters[userEmail][$eq]="+userEmail)

const readData = (data)=>{console.log(data)}

const getResumeByID = (id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")


const updateResumeDetail = (data,id)=>axiosClient.put('/user-resumes/'+id,data)

const deleteResumeByID = (id) => axiosClient.delete('/user-resumes/'+id)

export default {
    CreateResume,readData,GetUserResumes,updateResumeDetail,getResumeByID,deleteResumeByID
}