import React, { useEffect, useState } from 'react'
import { BiChevronLeft, BiX } from 'react-icons/bi';
import CountrySelect from '../country-select/CountrySelect';
import ActionButton from './ActionButton';
import GroupedInput from './GroupedButton';
import OAuthProviderButton from './OAuthProviderButton';
import TagButton from './TagButton';
import TextInput from './TextInput';


const tags = [
    'STEM',
    'Pay for exams',
    'Tech Bootcamp',
    'Scholarships',
    'Entrepreneurship',
    'Research',
    'School Rehabilitation',
    'Educational tools',
    'Study abroad',
    'Creatives',
    'Creatives',
];

const LoginForm = ({ closeModal }: { closeModal: () => void }) => {

    const [currentStep, setCurrentStep] = useState(1);


    const goNextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const goPrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    return (
        <>
            <div className="flex items-center w-full mb-4 auth-header">
                {currentStep > 1 && (
                    <button onClick={goPrevStep} className='w-6 h-6 rounded-full bg-primary-purple bg-opacity-10 grid place-items-center text-base text-primary'>
                        <BiChevronLeft />
                    </button>
                )}
                {currentStep < 3 && (
                    <h2 className='mx-auto text-2xl font-bold text-primary'>
                        Sign in {currentStep === 1 ? 'for Giverise' : ''}
                    </h2>
                )}

                {currentStep === 3 && (
                    <h2 className='mx-auto text-2xl font-bold text-primary'>
                        Forgot Password
                    </h2>
                )}

                {currentStep === 4 && (
                    <h2 className='mx-auto text-2xl font-bold text-primary'>
                        New password
                    </h2>
                )}
                <button className='w-6 h-6 rounded-full bg-primary-purple bg-opacity-10 grid place-items-center text-base text-primary' onClick={closeModal}>
                    <BiX />
                </button>
            </div>

            <div className='smMax:p-4'>
                {currentStep === 1 && (
                    <>
                        <OAuthProviderButton logo='facebook.png' text="Sign up with Facebook" onClick={goNextStep} />
                        <OAuthProviderButton logo='google.png' text="Continue with Google" />
                        <OAuthProviderButton logo='tiktok.png' text="Continue with TikTok" />
                        <OAuthProviderButton logo='linkedin.png' text="Continue with LinkedIn" />
                        <OAuthProviderButton logo='mail-logo.png' text="Continue with Email" />
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <TextInput placeholder="Email" label='Email' type="email" />
                        <TextInput placeholder="Password" type="password" containerClass='mb-2' />
                        <button className='text-xs text-primary-purple font-normal text-start mb-5' onClick={() => setCurrentStep(3)}>Forgot password?</button>
                        <ActionButton label="Sign in" />
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <TextInput placeholder="Enter account email" label='Email' type="email" />
                        <GroupedInput actionText='Send code' actionDisabled={true} />
                        <ActionButton label="Request code" onClick={goNextStep} />
                    </>
                )}

                {currentStep === 4 && (
                    <>
                        <TextInput label='Create new password' type="password" />
                        <TextInput label='Repeat password' type="password" />
                        <ActionButton label="Create new password" />
                    </>
                )}
            </div>
        </>
    )
}

export default LoginForm;