import React, {useState} from "react";
import {useUser} from "hook/User";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import "./Home.css"
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {searchByMovieId} from "../backend/movies";
import {useSearchParams} from "react-router-dom";
import {cartInsert} from "../backend/billing";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const MovieDetail = () => {
    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();

    const {id} = useParams();
    const [post,setPost] = React.useState();
    const navigate = useNavigate();

    const {register, getValues, handleSubmit} = useForm();

    const addToCart = () =>{
        const quantity = getValues("num");

        const payload ={
            movieId: id,
            quantity: quantity,
        }
        cartInsert(payload, accessToken)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log((error.response)))
    }

    React.useEffect(() => {
        searchByMovieId(id, accessToken)
            .then(response => {
                console.log(response)
                setPost(response.data)})
            .catch(error => console.log(error.response.data));},[])

    return (

        <StyledDiv>
            {post &&
                <React.Fragment>
                    <img src={"https://image.tmdb.org/t/p/original" + post.movie.posterPath} alt="movie poster"
                         width="400" height="500"/>

                    <h1>{post.movie.title}</h1>
                    <p>Year: {post.movie.year}</p>
                    <p>Director: {post.movie.director}</p>
                    <p>Rating: {post.movie.rating}</p>
                    <p>NumVotes: {post.movie.numVotes}</p>
                    <p>Budget: {post.movie.budget}</p>
                    <p>Revenue: {post.movie.revenue}</p>
                    <p>Overview: {post.movie.overview}</p>
                    <img src={"https://image.tmdb.org/t/p/original" + post.movie.backdropPath} alt="movie poster"
                         width="700" height="500"/>
                    <div>
                        <h1>Genres</h1>
                        {post.genres && post.genres.map(genre =>
                            <p>{genre.name}</p>
                        )}
                    </div>
                    <div>
                        <h1>Persons</h1>
                        {post.persons && post.persons.map(person =>
                            <p>{person.name}</p>
                        )}
                    </div>

                </React.Fragment>
            }
                <div>
                <select style={{width: "50%"}}  {...register("num")}>
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
                <Button style={{width: "50%"}} onClick={handleSubmit(addToCart)}>Add to Cart</Button>
                <p>Price will be displayed in cart</p>

                </div>

        </StyledDiv>
    );
}

export default MovieDetail;
