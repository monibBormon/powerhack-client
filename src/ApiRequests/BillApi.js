import axios from "axios"

const token = localStorage.getItem("token")

export function CreateBill(data){
    const url = "https://bill-list.herokuapp.com/api/add-billing"
    const headers = {
        'Content-Type': 'application/json',
        'token': token
      }
    return axios.post(url,data,{
        headers:headers
    }).then((res)=>{
        // console.log(res);
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


export function fetchBills(){
    const url = "https://bill-list.herokuapp.com/api/billing-list"
    const headers = {
        'token': token
      }
    return axios.get(url,{headers:headers}).then((res)=>{
        if(res.status === 200){
            return res.data['data']
        }
    }).catch((err)=>{
        console.log(err)
        return false
    })
}


export function DeleteBill(id){
    const url = `https://bill-list.herokuapp.com/api/delete-billing/${id}`
    const headers = {
        'token': token
      }
    return axios.get(url,{headers:headers}).then((res)=>{
        if(res.status === 200){
            return true
        }else{
            return false
        }
    }).catch((err)=>{
        console.log(err)
        return false
    })
}


export function UpdateBill(id,body){
    const url = `https://bill-list.herokuapp.com/api/update-billing/${id}`
    const headers = {
        'token': token
      }
    return axios.post(url,body,{headers:headers}).then((res)=>{
        if(res.status === 200){
            return true
        }else{
            return false
        }
    }).catch((err)=>{
        console.log(err)
        return false
    })
}