import Config from "backend/config.json";
import Axios from "axios";


export async function search(searchRequest, accessToken) {
    const searchParams = {
        title: searchRequest.title,
        genre: searchRequest.genre,
        year: searchRequest.year,
        director: searchRequest.director,
        limit:searchRequest.limit,
        page:searchRequest.page,
        orderBy:searchRequest.orderBy,
        direction:searchRequest.direction
    };

    for (const key of Object.keys(searchParams)) {
        if (searchParams[key] === "") {
            delete searchParams[key];
        }
    }

    const options = {
        method: "GET",
        baseURL: Config.movieUrl,
        url: Config.movies.search,
        headers: {
            Authorization: "Bearer " + accessToken
        },
        params: searchParams
    }

    return Axios.request(options);
}

export async function searchByPersonId(searchRequest, accessToken) {
    const searchParams = {
        personId: searchRequest.personId,
        limit:searchRequest.limit,
        page:searchRequest.page,
        orderBy:searchRequest.orderBy,
        direction:searchRequest.direction
    };

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.movieUrl, // Base URL (localhost:8081 for example)
        url: Config.movies.searchByPersonId, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
        params: searchParams // Data to send in Body (The RequestBody to send)
    }

    return Axios.request(options);
}

export async function searchByMovieId(movieId, accessToken) {


    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.movieUrl, // Base URL (localhost:8081 for example)
        url: Config.movies.searchByMovieId+movieId, // Path of URL ("/login")
        headers: {Authorization: "Bearer " + accessToken},
    }

    return Axios.request(options);
}

export async function personSearch(searchRequest, accessToken) {
    const searchParams = {
        name: searchRequest.name,
        birthday: searchRequest.birthday,
        movieTitle: searchRequest.movieTitle,
        limit:searchRequest.limit,
        page:searchRequest.page,
        orderBy:searchRequest.orderBy,
        direction:searchRequest.direction
    };

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.movieUrl, // Base URL (localhost:8081 for example)
        url: Config.movies.personSearch, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
        params: searchParams // Data to send in Body (The RequestBody to send)
    }

    return Axios.request(options);
}

export async function personIdSearch(searchRequest, accessToken) {
    const searchParams = {
        personId:searchRequest.personId,
        limit:searchRequest.limit,
        page:searchRequest.page,
        orderBy:searchRequest.orderBy,
        direction:searchRequest.direction
    };

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.movieUrl, // Base URL (localhost:8081 for example)
        url: Config.movies.personIdSearch, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
        params: searchParams // Data to send in Body (The RequestBody to send)
    }

    return Axios.request(options);
}

