import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {search} from "backend/movies";
import styled from "styled-components";
import {useUser} from "../hook/User";
import Table from "react-bootstrap/Table"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";


const StyledButton = styled.button`
  background-color: ${(props) => "#2D9AB7"}; 
  color: white;
  width: 50%;
  margin-left:25%;
  margin-right:25%;
  padding: 5px 15px;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => "#3077a7"};
  }`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color : #fff;

`



const Search = () => {
    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();
    const {register, getValues, handleSubmit} = useForm();
    const [movies, setMovies] = useState([]);
    let [page, setPage] = useState(1);
    const navigate = useNavigate();

    const nextPage =()=>{
        setPage(page+1);
        page+=1
        submitSearch();
    }
    const prevPage=()=>{
        if (page > 1){
            setPage(page-1);
            page-=1
            submitSearch();
        }
    }

    const submitSearch = () => {
        const title = getValues("Title");
        const year = getValues("Year");
        const director = getValues("Director");
        const genre = getValues("Genre");

        const limit = getValues("limit");

        const orderBy = getValues("orderBy");
        const direction = getValues("direction");

        const query = {
            title: title,
            year: year,
            director: director,
            genre: genre,

            limit: limit,
            page: page,
            orderBy: orderBy,
            direction: direction
        }

        search(query, accessToken)
            .then(response => {
                // alert(JSON.stringify(response.data, null,2))
                setMovies(response.data.movies)})
            .catch(error => alert(JSON.stringify(error.response.data, null, 2))) //correctly prints error
    }


    return (
        <StyledDiv>
            <div className="search">
                <form className="search input">
                    <tr>
                        <th align={"left"}>Movie Title</th>
                        <th align={"left"}>Year</th>
                        <th align={"left"}>Director</th>
                        <th align={"left"}>Genre</th>
                    </tr>
                    <tr>
                        <td><input {...register("Title")} type={"title"} placeholder="Title" ></input></td>

                        <td><input {...register("Year")} type={"year"} placeholder="Year" ></input></td>

                        <td><input {...register("Director")} type={"director"} placeholder="Director" ></input></td>

                        <td><input {...register("Genre")} type="genre" placeholder="Genre" ></input></td>
                    </tr>

                    <tr>
                        <th align={"left"}>Results per page</th>
                        <th align={"left"}>Sort by</th>
                        <th align={"left"}>Direction</th>
                    </tr>
                    <tr>
                        <td><select {...register("limit")}>
                            <option value = {10}>10</option>
                            <option value = {25}>25</option>
                            <option value = {50}>50</option>
                            <option value = {100}>100</option>
                        </select></td>

                        <td><select {...register("orderBy")}>
                            <option value={"title"}>Title</option>
                            <option value={"rating"}>Rating</option>
                            <option value={"year"}>Year</option>
                        </select></td>

                        <td><select {...register("direction")}>
                            <option value={"asc"}>Ascending</option>
                            <option value={"desc"}>Descending</option>
                        </select></td>



                    </tr>
                    <StyledButton type={"search"} onClick={handleSubmit(submitSearch)}>Search</StyledButton>
                </form>
            </div>


            <div className="result">
                <h3>Result</h3>
                <Table responsive>
                    <tr>
                        <th align={"left"}>Movie</th>
                        <th align={"left"}>Title</th>
                        <th align={"left"}>Year</th>
                        <th align={"left"}>Director</th>
                        <th align={"left"}>Rating</th>
                    </tr>
                    <tbody>
                    {movies.map(movies =>
                        <tr>
                            <td><img src={"https://image.tmdb.org/t/p/original" + movies.posterPath} alt="movie poster"
                                     width="100" height="150" onClick={() => navigate("/movie/" + movies.id)}/></td>
                            <td>{movies.title}</td>
                            <td>{movies.year}</td>
                            <td>{movies.director}</td>
                            <td>{movies.rating}</td>
                            <Button style={{background:"#2D9AB7"}} onClick={()=>navigate("/movie/"+movies.id)}>View More</Button>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>

            <StyledButton onClick={prevPage}> Previous </StyledButton>
            <h4 align={"center"}> {page} </h4>
            <StyledButton onClick={nextPage}> Next </StyledButton>
        </StyledDiv>
    );
}


export default Search;

