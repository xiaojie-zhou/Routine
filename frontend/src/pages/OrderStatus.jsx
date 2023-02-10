import React, {useState} from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";

import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {orderComplete, orderList} from "../backend/billing";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import {useStripe} from "@stripe/react-stripe-js/dist/react-stripe.esm";
import {useElements} from "@stripe/react-stripe-js";



const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color : #fff;
`

const OrderStatus = () => {

    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();
    const [post, setPost] = useState()

    let [searchParams] = useSearchParams();

    React.useEffect(() => {
        orderComplete(searchParams.get("payment_intent"), accessToken)
            .then(response => setPost(response))
            .catch(error => {
                console.log(error.response)});},[])


    return (
            <div>
                <p>Success!</p>
            </div>
    );
}

export default OrderStatus;
