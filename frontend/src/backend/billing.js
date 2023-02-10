import Config from "backend/config.json";
import Axios from "axios";

// "cartInsert": "/cart/insert",
//     "cartUpdate": "/cart/update",
//     "cartDelete": "/cart/delete/{movieId}",
//     "cartRetrieve": "/cart/retrieve",
//     "cartClear": "/cart/clear",
//     "orderPayment": "/order/payment",
//     "orderComplete": "/order/complete",
//     "orderList": "/order/list",
//     "orderDetail": "/order/detail/{saleId}"

export async function cartInsert(cartRequest, accessToken) {
    const cartParams = {
        movieId: cartRequest.movieId,
        quantity:cartRequest.quantity,
    };

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.billing.cartInsert, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
        data: cartRequest // Data to send in Body (The RequestBody to send)
    }

    return Axios.request(options);
}
export async function cartUpdate(cartRequest, accessToken) {
    const cartParams = {
        movieId: cartRequest.movieId,
        quantity:cartRequest.quantity,
    };

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.billing.cartUpdate, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
        data: cartParams // Data to send in Body (The RequestBody to send)
    }

    return Axios.request(options);
}
export async function cartDelete(cartRequest, accessToken) {


    const options = {
        method: "DELETE", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.billing.cartDelete+cartRequest.movieId, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },

    }

    return Axios.request(options);
}

export async function cartRetrieve(accessToken) {

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.billing.cartRetrieve, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
    }

    return Axios.request(options);
}

export async function cartClear(accessToken) {

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.billing.cartClear, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
    }

    return Axios.request(options);
}

export async function orderPayment(accessToken) {

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.billing.orderPayment, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
    }

    return Axios.request(options);
}

export async function orderComplete(paymentintent, accessToken) {
    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.billing.orderComplete, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
        data: {
            paymentIntentId : paymentintent
        }

    }

    return Axios.request(options);
}
export async function orderList(accessToken) {

    const options = {
        method: "GET", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: Config.billingUrl, // Base URL (localhost:8081 for example)
        url: Config.billing.orderList, // Path of URL ("/login")
        headers: {
            Authorization: "Bearer " + accessToken
        },
    }

    return Axios.request(options);
}