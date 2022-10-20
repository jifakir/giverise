import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';
import SaveCard from './SaveCard';

const Stripe = ({ onClose }:{ onClose:() => void }) => {

    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PK}`);

    return (
        <Elements stripe={stripePromise} >
            <SaveCard onClose={onClose} />
        </Elements>
    )
};

export default Stripe;