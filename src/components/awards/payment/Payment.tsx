import { Dropdown, Modal } from 'antd';
import React, { useState } from 'react'
import { BsX } from 'react-icons/bs';
import { FaAngleDown, FaPlus } from 'react-icons/fa';
import TextInput from '../../auth-modal/TextInput';
import CountrySelect from '../../country-select/CountrySelect';
import { CustomRadio } from '../../forms';
import { CreditCard } from '../../icons';


interface IPMProps {
    options: { value: string, label: string }[],
    selected?: { value: string, label: string },
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
                            <img src={`/images/logos/${option.value}.${option.value === 'mastercard' || option.value === 'visa' ? 'svg' : 'png'}`} className='object-cover h-[12px]' />
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>)
            }>
            <div className='h-12 rounded-lg px-4 flex items-center border border-primary-stroke cursor-pointer relative text-sm text-body'>
                {selected ? (
                    <>
                        <img src={`/images/logos/${selected.value}.${selected.value === 'mastercard' || selected.value === 'visa' ? 'svg' : 'png'}`} className='object-cover h-[12px]' />
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

const cards = [
    { value: 'mastercard', label: 'XXXX XXXX XXXX 2345' },
    { value: 'visa', label: 'XXXX XXXX XXXX 2345' },
    { value: 'gpay', label: 'example@gmail.com' },
    { value: 'paypal', label: 'example@gmail.com' },
];


const Payment = () => {
    const [selectedCard, setSelectedCard] = useState(cards[0]);
    const [showCardModal, setShowCardModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <>
            <div className="flex items-center justify-between smMax:flex-col smMax:items-start">
                <h3 className='font-bold text-[22px] text-primary leading-8 font-outfit'>Fund your award</h3>
                <div className="flex items-center gap-4">
                    <img src='/images/logos/mastercard.svg' className='max-w-full object-cover' />
                    <img src='/images/logos/visa.svg' className='max-w-full object-cover' />
                    <img src='/images/logos/paypal.png' className='max-w-full object-cover h-[11px]' />
                    <img src='/images/logos/gpay.png' className='max-w-full object-cover h-[12px]' />
                </div>
            </div>
            <div className="flex items-center gap-4 mt-7 smMax:flex-wrap">
                <CustomRadio checked={paymentMethod === 'card'} value='card' onChange={e => setPaymentMethod(e.target.value)} label='Card' name='payment-method' />
                <CustomRadio checked={paymentMethod === 'paypal'} value='paypal' onChange={e => setPaymentMethod(e.target.value)} label='PayPal' name='payment-method' />
                <CustomRadio checked={paymentMethod === 'bank-account'} value='bank-account' onChange={e => setPaymentMethod(e.target.value)} label='Bank Account' name='payment-method' />
                <CustomRadio checked={paymentMethod === 'gpay'} value='gpay' onChange={e => setPaymentMethod(e.target.value)} label='Google Pay' name='payment-method' />
            </div>
            <p className='mt-3 mb-6 text-body text-xs font-outfit'>This helps yourscholarship stand out to the right candidates. It’s the first thing they’ll see, so make it count!</p>
            <div className="mb-5">
                <h4 className='text-base font-medium text-primary mb-2'>How much would you like to award?</h4>
                <TextInput placeholder='$' type='number' />
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
                    <img src={`/images/logos/${paymentMethod}.png`} className="h-3 object-cover" />
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
                        <label className='absolute top-2 left-3 z-[1] text-[10px] text-secondary font-outfit'>Tip amount</label>
                        <TextInput placeholder='Custom' className='pt-5' containerClass='!static' />
                    </div>
                    <button className='h-12 px-4 flex flex-col items-center justify-center rounded-lg border border-primary-stroke text-sm text-primary'>
                        <span className='text-[10px]'>Amount</span>
                        <strong>$250</strong>
                    </button>
                </div>
                <p className='text-xs text-body'>Giverise has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.</p>
            </div>

            <Modal visible={showCardModal} footer={null} closable={false} title={null}>
                <div className="flex items-center mb-10">
                    <h3 className='mx-auto text-lg font-bold text-[#1E1147]'>Add new card</h3>
                    <button onClick={() => setShowCardModal(false)} className="w-6 h-6 rounded-full grid place-items-center bg-primary-purple bg-opacity-10 text-primary">
                        <BsX />
                    </button>
                </div>
                <h4 className='text-base font-medium text-primary'>Card information</h4>
                <div className="border border-[#F1F0FF] rounded-lg box-border overflow-hidden">
                    <div className="flex items-center border-b border-[#F1F0FF]">
                        <div className="relative w-[70%]">
                            <span className='text-primary-purple absolute left-3 top-4'>
                                <CreditCard />
                            </span>
                            <input placeholder='0000 0000 0000 0000' className='h-12 w-full focus:outline-none focus:ring-0 pl-12' />
                        </div>
                        <input placeholder='MM/YY' className='text-center h-12 w-[15%] focus:outline-none focus:ring-0' />
                        <input placeholder='CVC' className='text-center box-border h-12 w-[15%] focus:outline-none focus:ring-0' />
                    </div>
                    <div className="flex items-center py-1">
                        <input placeholder='First name' className='h-11 w-[50%] focus:outline-none focus:ring-0 px-2 border-r border-[#F1F0FF]' />
                        <input placeholder='Last Name' className='h-11 w-[50%] focus:outline-none focus:ring-0 px-2' />
                    </div>
                </div>
                <div className="flex gap-4 mt-2">
                    <div className="w-[50%]">
                        <CountrySelect label='Country' isFloatingLabel={true} />
                    </div>
                    <input placeholder='Postal Code' className='h-12 w-[50%] focus:outline-none focus:ring-0 px-2 border border-primary-stroke rounded-lg' />
                </div>
                <label className='flex items-center cursor-pointer'>
                    <input type={"checkbox"} className="w-[14px] h-[14px] focus:ring-0 focus:outline-none rounded-sm border border-primary-stroke focus:ring-offset-0 checked:text-primary-purple" />
                    <span className='ml-2 text-sm text-primary'>Remember this card for later user</span>
                </label>

                <div className="flex items-center justify-end mt-4">
                    <button className='text-white bg-primary-purple rounded-lg text-base font-medium h-12 w-[98px] flex items-center justify-center'>
                        Add Card
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Payment;