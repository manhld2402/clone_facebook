import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";

export default function ForgetPassword() {
  const navigate=useNavigate()
  let {id}=useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const user_email = queryParams.get('user_email');
  const forgetcode = queryParams.get('forgetcode');
  let [password,setPassword]=useState({password:""})
  
  const handleRecreatePassword= async()=>{
    if(password.password.length<6||password.password.length>12){
      toast.warning(`Mật khẩu có chiều dài 6-12 kí tự!!!`,{
        position:toast.POSITION.TOP_RIGHT
      })
    }else{
    axios.post(`http://localhost:8000/api/v1/auth/new-password?user_email=${user_email}&forgetcode=${forgetcode}&index=${id}`,password)
      .then(()=>{ toast.success(`Bạn đã tạo lại mật khẩu thành công!!!`,{
        position:toast.POSITION.TOP_RIGHT
      })
      setTimeout(() => {
        navigate("/login")
      }, 3000);}
      )
      .catch(()=>{
        toast.error(`Kiểm tra lại Link!!!`,{
        position:toast.POSITION.TOP_RIGHT
      })}
      )}
  }
  return (
    <div>
      <p>Nhập mật khẩu mới và đừng quên nó nhé!!</p>
      <input type="text" name="password" onChange={(e)=>setPassword({password:e.target.value})} value={password.password} />
      <button onClick={handleRecreatePassword}>Đặt lại mật khẩu</button>
      <ToastContainer autoClose={2000} />
    </div>
  )
}
