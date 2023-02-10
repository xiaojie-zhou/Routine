import React, {useState} from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";

import {useNavigate} from "react-router-dom";
import {orderList} from "../backend/billing";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";



const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color : #fff;
`

const ShoppingCart = () => {
    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();

    const [post,setPost] = React.useState();
    const navigate = useNavigate();

    const {register, getValues, handleSubmit} = useForm();

    React.useEffect(() => {
        orderList(accessToken)
            .then(response => {setPost(response.data)
            console.log(response)})
            .catch(error => {
                console.log(JSON.stringify(error.response,null,2))});},[])


    if (post === undefined || post.sales === undefined){
        return (<div><h2>No Records</h2></div>);
    }
    else {
        return (
            <StyledDiv>
                <h2>Shopping Cart</h2>
                <Table responsive>
                    <tr>
                        <th align={"left"} width="20%"> Order #</th>
                        <th align={"left"} width="20%"> Total</th>
                        <th align={"left"} width="20%"> Date</th>
                    </tr>

                    {(post && post.sales.map(sale =>
                        <tr>
                            <td>{sale.saleId}</td>
                            <td align={"center"}>
                                {sale.total}</td>
                            <td align="right">{sale.orderDate}</td>
                        </tr>
                    ))}
                </Table>
            </StyledDiv>
        );
    }
}

export default ShoppingCart;
