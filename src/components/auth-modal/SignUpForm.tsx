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

const SignUpForm = ({ closeModal }: { closeModal: () => void }) => {

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
                <h2 className='mx-auto text-2xl font-bold text-primary'>Sign up {currentStep === 1 ? 'for Giverise' : ''}</h2>
                <button className='w-6 h-6 rounded-full bg-primary-purple bg-opacity-10 grid place-items-center text-base text-primary' onClick={closeModal}>
                    <BiX />
                </button>
            </div>

            <div className='smMax:p-4'>
                {currentStep === 1 && (
                    <>
                        <OAuthProviderButton logo='facebook.png' text="Sign up with Facebook" onClick={goNextStep} />
                        <OAuthProviderButton logo='google.png' text="Continue with Google" onClick={goNextStep} />
                        <OAuthProviderButton logo='tiktok.png' text="Continue with TikTok" onClick={goNextStep} />
                        <OAuthProviderButton logo='linkedin.png' text="Continue with LinkedIn" onClick={goNextStep} />
                        <OAuthProviderButton logo='mail-logo.png' text="Continue with Email" onClick={goNextStep} />
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <CountrySelect />
                        <TextInput placeholder="Current city, country" helpText='Your country won’t be shown publicly' name="city" />
                        <ActionButton onClick={goNextStep} />
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <TextInput label="Create username" placeholder="Current city, country" helpText='Create something close to whatever' name="username" />
                        <ActionButton onClick={goNextStep} />
                    </>
                )}

                {currentStep === 4 && (
                    <>
                        <label className='block text-primary font-medium text-sm mb-4'>What best describes causes and awards you are interested in?</label>
                        <div className="flex gap-2 flex-wrap items-center mb-10">
                            {tags.map(tag => <TagButton label={tag} />)}
                        </div>
                        <ActionButton onClick={goNextStep} />
                    </>
                )}

                {currentStep === 5 && (
                    <>
                        <TextInput label='Email' type="email" placeholder="Email" name="email" />
                        <div className="grid grid-cols-2 gap-3">
                            <TextInput placeholder='First name' name="firstName" />
                            <TextInput placeholder="Last name" name="lastName" />
                        </div>
                        <TextInput placeholder="Password" type='password' name="password" />
                        <GroupedInput placeholder='Enter 6-digit code' actionDisabled={true} />
                        <ActionButton />

                        <p className='text-xs text-secondary mt-auto text-center mb-3'>
                            By continuing, you agree to Giverise’s <a className='text-primary hover:text-primary font-bold'>Terms of Service</a> and confirm that you have read Giverise’s <a className='text-primary hover:text-primary font-bold'>Privacy Policy</a>.
                        </p>
                    </>
                )}
            </div>
        </>
    )
}

export default SignUpForm;