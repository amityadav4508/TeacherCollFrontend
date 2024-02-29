import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Url_Protected = (props) => {
    const navigate = useNavigate();
    let login = JSON.parse(localStorage.getItem('userAuth'));
    let teacherLogin=JSON.parse(localStorage.getItem('teacherAuth'));
    const {status}=useSelector((state)=>state.auth)
    
    useEffect(()=>{
        
        if (!login && !status===200){
        navigate('/admin/login')
       }
        if(!teacherLogin && !status===200){
        navigate('teacher/login')
       }
    },[login]);

    return <props.Component />  
}

export default Url_Protected