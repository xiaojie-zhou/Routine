import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import {orderPayment} from "../backend/billing";
import {useUser} from "../hook/User";



// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.

const stripePromise = loadStripe("pk_test_51KwEtaLfLrIwjzSxRr7N0IQ58haObrkJEuctn24gQTbZUCPfyFLCOTD2pEPNoEn6WZIBhpPxw0Vav0x5liZ35jFk00fKFe0PaL");

export default function Checkout() {
    const {
        accessToken, setAccessToken,
        refreshToken, setRefreshToken
    } = useUser();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {orderPayment(accessToken)
        .then(response => setClientSecret(response.data.clientSecret))
        .catch(error=>console.log(error.response))},[]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}