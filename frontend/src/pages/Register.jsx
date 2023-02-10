import React from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {registering} from "backend/idm";
import {useNavigate} from "react-router-dom";


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Register = () => {
    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();


    const {register, getValues, handleSubmit} = useForm();

    const navigate = useNavigate();

    const submitRegister = () => {
        const email = getValues("Email");
        const password = getValues("Password")
        const passwordConfirm = getValues("PasswordConfirm");


        if (password === passwordConfirm) {


            const payLoad = {
                email: email,
                password: password.split('')
            }

            registering(payLoad)
                .then(response => navigate("/login"))
                .catch(error => alert(JSON.stringify(error.response.data, null, 2))) //correctly prints error


        }
    }


    return (
        <StyledDiv>
            <h1>Register</h1>
            <h4>Email</h4>
            <input {...register("Email")} type={"email"}/>
            <h4>Password</h4>
            <input {...register("Password")} type={"password"}/>
            <h4>Re-enter your password</h4>
            <input {...register("PasswordConfirm")} type={"password"}/>
            <button onClick={handleSubmit(submitRegister)}>Register</button>

        </StyledDiv>
    );
}

export default Register;
