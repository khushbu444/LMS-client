import axiosInstance from "@/api/axiosInstance";


export async function registerService(formData) {

    const body = {...formData, role: 'user'}
    console.log(body)
    const {data} = await axiosInstance.post('/auth/register', body)
        console.log(data);
        
       return data
}

export async function loginService(formData) {
    const {data} = await axiosInstance.post('/auth/login', formData)
        
        return data;
}
export async function checkAuth () {
    const {data} = await axiosInstance.get('/auth/check-auth')
        
        return data;
}
export async function mediaUploadService (formData, onProgressCallback) {
    const {data} = await axiosInstance.post('/media/upload', formData,{
        onUploadProgress : (progressEvent=>{
            const percentCompleted = Math.random((progressEvent.loaded * 100)/progressEvent.total)
            onProgressCallback(percentCompleted)

        })
    })
        
        return data;
}

