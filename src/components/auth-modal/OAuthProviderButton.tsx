import React from 'react'

const OAuthProviderButton = ({ logo, text, onClick }: { logo: string, text: string, onClick?: () => void }) => (
    <button className='w-full rounded-lg bg-[#F8F8F8] flex items-center pl-[20%] text-base font-normal text-primary h-12 mb-4' onClick={onClick}>
        <img src={`/images/logos/${logo}`} className="max-w-full mr-4" />
        {text}
    </button>
);

export default OAuthProviderButton;