import React, { useMemo, useState } from 'react';
import {useStripe, useElements, PaymentElement, CardElement} from '@stripe/react-stripe-js';
import { BsX } from 'react-icons/bs';
import { CreditCard } from '../icons';
import CountrySelect from '../country-select/CountrySelect';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import api from '../../utils/api';
import { useSaveCardMutation } from '../../store/api';
import { notification } from 'antd';


type CardStateTypes = {
  first_name: string,
  last_name: string,
  country: string,
  post_code: string
};

const SaveCard = ({onClose}:{onClose:() => void}) => {

  const [cardState, setCardState] = useState<CardStateTypes>({
    first_name: '',
    last_name: '',
    country: '',
    post_code: ''
  });
  const [saveCard, result] = useSaveCardMutation();
  const { token, user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  const options = useMemo(() => ({
        showIcon: true,
        hidePostalCode: true,
        style: {
            base: {
                display:"block",
                padding: "4px 2px",
                // fontSize: "16px",
                fontFamily: "Poppins, monospace",
                // "::placeholder": {
                // color: "#aab7c4"
                // }
            },
            // invalid: {
            //     color: "#9e2146"
            // }
        }
    }),
    []
    );

  const handleSubmit = async (event:any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      //`Elements` instance that was used to create the Payment Element
      type: 'card',
      card: elements.getElement(CardElement)!,
      billing_details: {
        address: {
            postal_code: '15657',
            country: 'us'
        },
        name: 'Jahid'
      }
    });


    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      console.log(paymentMethod);
      
      try{
        await saveCard({ payment_method: paymentMethod?.id });
        notification.success({message: 'Card added successfully!'})
        onClose();
      }catch(err:any){
        notification.error({message: err?.message});
        console.log(err);
      }
    }
  };

  const handleOnChange = (name:string, val:any) => {
    setCardState(prev => ({
      ...prev,
      [name]: val
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mb-10">
            <h3 className='mx-auto text-lg font-bold text-[#1E1147]'>Add new card</h3>
            <button onClick={onClose} className="w-6 h-6 rounded-full grid place-items-center bg-primary-purple bg-opacity-10 text-primary">
                <BsX />
            </button>
        </div>
        <h4 className='text-base font-medium text-primary'>Card information</h4>
        <div className="border border-[#F1F0FF] rounded-lg box-border overflow-hidden">
            <div className="border-b border-[#F1F0FF] px-2">
                <CardElement options={options} className="text-primary py-[18px]" />
            </div>
            <div className="flex items-center py-1">
                <input value={cardState?.first_name} onChange={(e) => handleOnChange(e.target.name, e.target.value)} placeholder='First name' name='first_name' className='h-11 w-[50%] focus:outline-none focus:ring-0 px-2 border-r border-[#F1F0FF]' />
                <input value={cardState?.last_name} onChange={(e) => handleOnChange(e.target.name, e.target.value)} placeholder='Last Name' name='last_name' className='h-11 w-[50%] focus:outline-none focus:ring-0 px-2' />
            </div>
        </div>
        <div className="flex gap-4 mt-2">
            <div className="w-[50%]">
                <CountrySelect value={cardState?.country} label='Country' onChange={(v) => handleOnChange('country', v)} isFloatingLabel={true} />
            </div>
            <input placeholder='Postal Code' name='post_code' className='h-12 w-[50%] focus:outline-none focus:ring-0 px-2 border border-primary-stroke rounded-lg' />
        </div>
        <label className='flex items-center cursor-pointer'>
            <input type={"checkbox"} className="w-[14px] h-[14px] focus:ring-0 focus:outline-none rounded-sm border border-primary-stroke focus:ring-offset-0 checked:text-primary-purple" />
            <span className='ml-2 text-sm text-primary'>Remember this card for later user</span>
        </label>
        <div className="flex items-center justify-end mt-4">
            <button disabled={result.isLoading} className='text-white bg-primary-purple rounded-lg text-base font-medium h-12 w-[98px] flex items-center justify-center'>
                Add Card
            </button>
        </div>
    </form>
  )
};

export default SaveCard;