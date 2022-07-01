import axios from "axios";

export function RegisterUser(data){
    // console.log(data);
    const url = "https://bill-list.herokuapp.com/api/registration"
    return axios.post(url,data).then((res)=>{
        console.log(res);
        if(res.status === 200){
            return true
        }else{
            return false
        }
    }).catch((err)=>{
        console.log(err)
        return false;
    })
}

export function LoginUser(data){
    const url = "https://bill-list.herokuapp.com/api/login"
    return axios.post(url,data).then((res)=>{
        if(res.status === 200){
            return res
        }else{
            return false
        }
    }).catch((err)=>{
        console.log(err)
        return false;
    })
}