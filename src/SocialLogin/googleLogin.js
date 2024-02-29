import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { registerSocial } from "src/store/features/AuthSlice";





export default function GoogleLoginCustom(props) {
   
    const data1 = props

    const dispatch = useDispatch()
    
    const responseGoogle = (response) => {
       

        let data = {
            "user_type": data1.userType,
            'social_type': "google",
            'token':response?.credential,
        }
    
        if (response) {
            dispatch(registerSocial(data))
        }
    }
    return (
        <>
        <div className="inner-google-wrap"> 
        <GoogleOAuthProvider clientId="1092342128245-pkcm74odif1n94k74cbouq5n5t9lkmul.apps.googleusercontent.com">
            <GoogleLogin
              
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                
                />
                </GoogleOAuthProvider>
                </div>
        </>
    )
}