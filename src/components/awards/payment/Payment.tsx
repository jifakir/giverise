import { Dropdown, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { BsX } from 'react-icons/bs';
import { FaAngleDown, FaPlus } from 'react-icons/fa';
import { awardForm } from '../../../pages/awards/create';
import { useFetchCardsQuery } from '../../../store/api';
import api from '../../../utils/api';
import TextInput from '../../auth-modal/TextInput';
import CountrySelect from '../../country-select/CountrySelect';
import { CustomRadio } from '../../forms';
import { CreditCard } from '../../icons';
import Stripe from '../../stripe';
import { MultiSelectCheckBox } from '../multi-select-checkbox';


interface IPMProps {
    options: { value: string, label: string, type: string }[],
    selected?: { value: string, label: string, type:string },
    onChange: (value: Record<string, string>) => void,
};

const PaymentMethodSelect = ({ options, selected, onChange }: IPMProps) => {
    const [visible, setVisible] = useState(false);

    const handleOnClick = (value: Record<string, string>) => {
        onChange?.(value);
        setVisible(false);
    }

    return (
        <Dropdown
            onVisibleChange={setVisible}
            visible={visible}
            trigger={['click']}
            overlay={(
                <div className='w-full max-h-[300px] rounded-lg shadow-lg bg-white custom-scrollbar overflow-y-auto'>
                    {options.map((option, index) => (
                        <div onClick={() => handleOnClick(option)} key={index} className={`cursor-pointer flex items-center px-4 py-3 gap-3 ${selected?.value === option.value ? 'bg-primary-purple bg-opacity-40 text-white' : 'hover:bg-primary-purple hover:bg-opacity-40 hover:text-white'}`}>
                            <img src={`/images/logos/${option.type}.${option.type === 'mastercard' || option.type === 'visa' ? 'svg' : 'png'}`} className='object-cover h-[12px]' />
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>)
            }>
            <div className='h-12 rounded-lg px-4 flex items-center border border-primary-stroke cursor-pointer relative text-sm text-body'>
                {selected ? (
                    <>
                        <img src={`/images/logos/${selected.type}.${selected.type === 'mastercard' || selected.type === 'visa' ? 'svg' : 'png'}`} className='object-cover h-[12px]' />
                        <span className='ml-3'>{selected.label}</span>
                    </>
                ) : (
                    <span>Select</span>
                )}
                <span className='ml-auto'>
                    <FaAngleDown />
                </span>
            </div>
        </Dropdown>
    );
}

const cardsdemo = [
    { value: 'mastercard', label: 'XXXX XXXX XXXX 2345' },
    { value: 'visa', label: 'XXXX XXXX XXXX 2345' },
    { value: 'gpay', label: 'example@gmail.com' },
    { value: 'paypal', label: 'example@gmail.com' },
];

const Payment = ({ state, onChangeHandler, errors }: 
    { 
        state:awardForm, 
        onChangeHandler:(name:string, val:any) => void, 
        errors:{
            award_amount: string | undefined, 
            tip_amount: string | undefined} }) => {

    const [showCardModal, setShowCardModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [amount, setAmount] = useState<string>();
    const [tip, setTip] = useState('');
    const [cards, setCard] = useState([]);
    const [selectedCard, setSelectedCard] = useState(cards[0]);

    const { data, isLoading, isSuccess } = useFetchCardsQuery({undefined});

    useEffect(() => {
        if(isSuccess){
            setCard(data?.data?.data?.map((itm:any) => ({
                label: `XXXX XXXX XXXX ${itm.card.last4}`, 
                value: itm.card.last4, 
                type: itm.card.brand})));
        }
    },[isSuccess, data]);

    console.log(data);
    if(isLoading) return <div className="loading"></div>;
    const { award_amount, tip_amount } = state;

    return (
        <>
            <div className="flex items-center justify-between smMax:flex-col smMax:items-start">
                <h3 className='font-bold text-[22px] text-primary leading-8 font-outfit'>Fund your award</h3>
                <div className="flex items-center gap-4">
                    <img src='/images/logos/mastercard.svg' className='max-w-full object-cover' alt='Master Card' />
                    <img src='/images/logos/visa.svg' className='max-w-full object-cover' alt='Visa' />
                    <img src='/images/logos/paypal.png' className='max-w-full object-cover h-[11px]' alt='Paypal' />
                    <img src='/images/logos/gpay.png' className='max-w-full object-cover h-[12px]' alt='Gpay' />
                </div>
            </div>
            <div className="flex items-center gap-4 mt-7 smMax:flex-wrap">
                <CustomRadio checked={paymentMethod === 'card'} value='card' onChange={e => setPaymentMethod(e.target.value)} label='Card' name='payment-method' />
                <CustomRadio checked={paymentMethod === 'paypal'} value='paypal' onChange={e => setPaymentMethod(e.target.value)} label='PayPal' name='payment-method' />
                <CustomRadio checked={paymentMethod === 'bank-account'} value='bank-account' onChange={e => setPaymentMethod(e.target.value)} label='Bank Account' name='payment-method' />
                <CustomRadio checked={paymentMethod === 'gpay'} value='gpay' onChange={e => setPaymentMethod(e.target.value)} label='Google Pay' name='payment-method' />
            </div>
            <p className='mt-3 mb-6 text-body text-xs font-outfit'>This helps yourscholarship stand out to the right candidates. It’s the first thing they’ll see, so make it count!</p>
            <div className="relative mb-5">
                <h4 className='text-base font-medium text-primary mb-2'>How much would you like to award?</h4>
                <TextInput 
                    value={state?.award_amount} 
                    onChange={(v) => onChangeHandler('award_amount', v)} 
                    className="pl-6"
                    error={errors?.award_amount}
                    type='number' />
                <span className="absolute left-4 bottom-[13px]">$</span>
            </div>
            <h4 className='text-base font-medium text-primary mb-2'>Payment Method</h4>
            {paymentMethod === 'card' && (
                <div className="mb-5">
                    <PaymentMethodSelect options={cards} selected={selectedCard} onChange={value => setSelectedCard(value as any)} />
                    <button className='flex items-center text-xs text-primary-purple mt-2' onClick={() => setShowCardModal(true)}>
                        + Add new card
                    </button>
                </div>
            )}
            {(paymentMethod === "paypal" || paymentMethod === "gpay") && (
                <div className="flex items-center gap-2 mb-5 text-body text-sm">
                    <img src={`/images/logos/${paymentMethod}.png`} className="h-3 object-cover" alt='Image' />
                    <span>You will be redirected to {paymentMethod}</span>
                </div>
            )}
            {(paymentMethod === "bank-account") && (
                <div className="flex items-center mb-5">
                    <p className='text-base'>not implemented</p>
                </div>
            )}
            <div className="mb-5">
                <h4 className='text-base font-medium text-primary mb-2'>Tip Giverise Services</h4>
                <div className="flex items-start gap-2">
                    <div className="relative w-[90%]">
                        <MultiSelectCheckBox 
                            options={[
                                {label: '0%', value: '0'},
                                {label: '5%', value: '5'},
                                {label: '10%', value: '10'},
                                {label: '20%', value: '20'},
                            ]}
                            mode="single"
                            error={errors?.tip_amount}
                            onChange={(v) => onChangeHandler('tip_amount', v)} />
                        {/* <label className='absolute top-2 left-3 z-[1] text-[10px] text-secondary font-outfit'>Tip amount</label>
                        <TextInput value={state?.tip_amount} onChange={(v) => onChangeHandler('tip_amount', v)}  placeholder='Custom' className='pt-5' containerClass='!static' /> */}
                    </div>
                    <button className='h-12 px-4 flex flex-col items-center justify-center rounded-lg border border-primary-stroke text-sm text-primary'>
                        <span className='text-[10px]'>Amount</span>
                        <strong>$250</strong>
                    </button>
                </div>
                <p className='text-xs text-body mt-1'>Giverise has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.</p>
            </div>
            <Modal  visible={showCardModal} footer={null} closable={false} title={null}>
                <Stripe onClose={() => setShowCardModal(false)} />
            </Modal>
        </>
    )
}

export default Payment;