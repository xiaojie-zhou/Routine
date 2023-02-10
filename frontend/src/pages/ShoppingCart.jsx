import React, {useState} from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import "./Home.css"
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {cartInsert, cartRetrieve, cartDelete, cartUpdate, cartClear} from "../backend/billing";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";



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
        cartRetrieve(accessToken)
            .then(response => setPost(response.data))
            .catch(error => {
                console.log(JSON.stringify(error.response,null,2))});},[])

    const [cart,setCart] = React.useState();
    const updateCart =(movieId)=> {
        const quantity = getValues("q" + movieId);
        const payload ={
            movieId: movieId,
            quantity: quantity,
        }
        cartUpdate(payload, accessToken)
            .catch(error => console.log(JSON.stringify(error.response,null,2)))
        window.location.reload(false);

    }

    const deleteFromCart =(movieId)=> {
        const payload ={
            movieId: movieId
        }
        cartDelete(payload, accessToken)
            .catch(error => console.log(JSON.stringify(error.response,null,2)))
        window.location.reload(false);

    }

    const clearCart = () =>{
        cartClear(accessToken)
            .catch(error => console.log(JSON.stringify(error.response,null,2)))
        window.location.reload(false);

    }

    if (post === undefined || post.total === undefined){
        return (<div><h2>Cart is Empty</h2></div>);
    }
    else {
        return (
            <StyledDiv>
                <h2>Shopping Cart</h2>
                <Table responsive>
                    <tr>
                        <th align={"left"} width="20%"> Movie</th>
                        <th align={"left"} width="20%"> Title</th>
                        <th align={"left"} width="20%"> Quantity</th>
                        <th align={"left"} width="20%"> Modify</th>
                        <th align={"left"} width="20%"> Unit Price</th>
                        <th align={"left"} width="20%"> Subtotal</th>
                    </tr>

                    {(post && post.items && post.items.map(item =>
                        <tr>
                            <td><img src={"https://image.tmdb.org/t/p/original" + item.posterPath} alt="movie poster"
                                     width="100" height="150" onClick={() => navigate("/movie/" + item.movieId)}/></td>
                            <td>{item.movieTitle}</td>
                            <td align={"center"}>
                                {item.quantity}</td>
                            <td>
                                <select style={{width: "100%"}} {...register("q" + item.movieId)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <Button style={{background:"#2D9AB7",width: "100%"}}
                                        onClick={handleSubmit(() => updateCart(item.movieId))}>Update
                                </Button>
                                <Button style={{background:"#2D9AB7",width: "100%"}}
                                        onClick={handleSubmit(() => deleteFromCart(item.movieId))}>Delete
                                </Button>
                            </td>
                            <td align="right">${item.unitPrice}</td>
                            <td align="right">${(item.quantity * item.unitPrice).toFixed(2)}</td>

                        </tr>
                    ))}
                </Table>
                <h3 align={"right"}>Total: ${post && post.total && post.total.toFixed(2)}</h3>
                <Button onClick={() => navigate("/checkout")}>Check Out</Button>
                <Button onClick={clearCart}>Remove All</Button>
            </StyledDiv>
        );
    }

}

export default ShoppingCart;
