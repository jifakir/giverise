import { Spin } from 'antd';
import React from 'react'

const OAuthProviderButton = ({ logo, text, loading=false, onClick }: { logo: string, text: string, loading?:boolean, onClick?: () => void }) => (
    <button className='w-full rounded-lg bg-[#F8F8F8] flex items-center pl-[20%] text-base font-normal text-primary h-12 mb-4' onClick={onClick}>
        {loading && ( <span className='mr-2'>
            {<Spin size='small'/>}
        </span>)}
        <img src={`/images/logos/${logo}`} className="max-w-full h-5 mr-4" alt='logo' />
        {text}
    </button>
);

export default OAuthProviderButton;