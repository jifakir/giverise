import { notification, Timeline } from 'antd';
import React, { useEffect, useState } from 'react'
import { BiInfoCircle } from 'react-icons/bi';
import { RiCloseLine } from 'react-icons/ri';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { CustomTagInput, MultiSelectCheckBox, Payment, PreviewWIndow, RichTextEditor, TextInput, Upload, WhoCanApply } from '../../../components';
import 'react-image-crop/dist/ReactCrop.css';
import api from '../../../utils/api';
import { Descendant } from 'slate';
import { useFetchCardsQuery } from '../../../store/api';
import { Card } from '../../../store/types';

const steps = ['describe', 'Next: Review Award', 'Next: Upload cover photo / set deadline', 'Next: Fund award', 5, 6];

export type DocumentType = {
    description: string
    files: string[]
};


export type awardForm = {
    campaignId: number | null
    title: string
    description: Descendant[] | any
    region: string
    criteria: object
    states: []
    nationalities: []
    tags: []
    categories: string[]
    documents: DocumentType[]
    coverMedia: string
    screeningEssay: {}
    awardDistribution: {}
    award_amount: string
    tip_amount: string
    awardTotal: number
    country: string
    deadline: string
    education?: string
    school?: string
    gender?: string
    study_field?: string
    age_range?: string
    document_description?: string
    essay_description?: Descendant[]
    word_length?: string
    distributed?: string
    gpa?: string
    beneficiary?: string
    winner?: string
    first_runner?: string
    second_runner?: string
};

const CustomStep = ({ steps = [], current = 0, className = '' }: { steps: string[], current: number, className: string }) => {
    return (
        <div className={`flex items-center ${className}`}>
            {steps.map((_, index) => (
                <>
                    <div className={`transition-all relative mx-1 first-of-type:ml-0 last-of-type:mr-0 w-3 h-3 rounded-full ${current >= index ? 'bg-[#2CAEB7]' : 'bg-[#E8EDF1]'}`}>
                        {current === index && (
                            <div className='bg-primary border border-white rounded w-[40px] h-[26px] items-center justify-center text-white font-bold font-outfit text-xs inline-flex absolute -left-3 -top-2'>
                                {current + 1}/{steps.length}
                            </div>
                        )}
                    </div>
                    {index !== steps.length - 1 ? (

                        <div className={`transition-all w-[22px] h-1 rounded-sm  ${current >= index ? 'bg-[#2CAEB7]' : 'bg-[#E8EDF1]'}`} />
                    ) : null}
                </>
            ))}
        </div>
    )
}

const CreatePage = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [showPreviewDrawer, setShowPreviewDrawer] = useState(false);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState<string>();
    const [errors, setError] = useState({
        description: '',
        states: '',
        country: '',
        category: '',
        title: '',
        photo: '',
        dealine: '',
        award_amount: '',
        tip_amount: ''
    });

    const [state, setState] = useState<awardForm>({
        campaignId: null,
        title: '',
        description: [
            {
                type: 'paragraph',
                children: [
                    { text: '' },
                ],
            },
        ],
        region: 'us',
        criteria: {},
        states: [],
        country: '',
        nationalities: [],
        tags: [],
        categories: [],
        documents: [],
        coverMedia: '',
        screeningEssay: {},
        awardDistribution: {},
        award_amount: '',
        tip_amount: '',
        awardTotal: 0,
        deadline: '',
        education: '',
        school: '',
        gender: '',
        study_field: '',
        age_range: '',
        document_description: '',
        essay_description: [],
        word_length: '',
        gpa: '',
        beneficiary: '',
        distributed: '',
        winner: '',
        first_runner: '',
        second_runner: '',
    });

    const goNextStep = () => {
        
        if(currentStep === 0 && !state?.description[0].children[0].text){
            setError(prev => ({ ...prev, description: 'Please, enter some text' }));
            return;
        };

        if(currentStep === 1){
            if(state.region === 'local' && !state.country){
                setError(prev => ({...prev, country: 'Country is required!'}));
                notification.error({message: "Select a country, Please."});
                return;
            }
        };
        if(currentStep === 2 && state.categories.length === 0){
            setError(prev => ({ ...prev, category: 'Category field is required'}));
            notification.error({message: 'Category field is required!'});
            return;
        };
        if(currentStep === 3 && !state.title){
            setError(prev => ({...prev, title: 'Title is required!'}));
            return;
        };

        if(currentStep === 4){
            console.log(state);
            if(!state.coverMedia || !state.deadline){
                return
            }else{
                const { title, description, region, 
                    states, nationalities, country, 
                    coverMedia, deadline } = state;
                const postData = async () => {
                    try{
                        const res = await api('/campaigns',{
                            title,
                            description,
                            region,
                            states,
                            nationalities,
                            country,
                            coverMedia,
                            deadline
                        });
                        console.log(res);
                        setState(prev => ({...prev, campaignId: res?.data.id}))
                    }catch(err){
                        console.log(err);
                    }
                };
                postData();
            }
        };
        if(currentStep === 5 && (!state.award_amount || !state.tip_amount)){
            if(!state.award_amount && !state.tip_amount){
                setError(prev => ({...prev, award_amount: 'Award amount is requried!'}));
                setError(prev => ({...prev, tip_amount: 'Tip amount is requried!'}));
                return;
            }
            if(!state.award_amount){
                setError(prev => ({...prev, award_amount: 'Award amount is requried!'}));
                return;
            }
            if(!state.tip_amount){
                setError(prev => ({...prev, tip_amount: 'Tip amount is requried!'}));
                return;
            }
        };
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowPreviewDrawer(currentStep === 5)
        }
    }

    const goPrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    const onChangeHandler = (name:string,val:any) => {
        setState(prevState => ({...prevState, [name]: val}));
    };

    const onTitleHandler = (v:string) => {
        setTitle(v);
        setState(prevState => ({...prevState, ['title']: v}));
    };

    const {data} = useFetchCardsQuery({undefined});
    console.log("Cards: ", data);
    console.log("State: ", state?.country);

    useEffect(() => {
        const fetchCategorires = async () => {
            const res = await api(`/categories`);
            console.log(res);
            setCategories(res?.data?.map((cat:any) => ({ label: cat.title, value: cat.id.toString() })));
        }
        fetchCategorires();
    },[]);

    return (
        <div className='flex'>
            <div className='bg-primary min-h-screen pt-[100px] xl:px-[60px] xl:w-[520px] lg:w-[400px] lg:px-10 mdMax:hidden'>
                <img src="/images/logo-white.png" alt="img-white" className='max-w-full' />
                <h2 className='text-white font-medium xl:text-[32px] lg:text-3xl mt-28 mb-10'>Let???s begin your award creation journey</h2>
                <div className="flex items-center mb-4">
                    <img src="/images/crown.png" alt="crown" className='max-w-full mr-4 w-6' />
                    <p className='text-white text-base text-opacity-80'>100% tax deductible</p>
                </div>
                <div className="flex items-center mb-4">
                    <img src="/images/crown.png" alt="crown" className='max-w-full mr-4 w-6' />
                    <p className='text-white text-base text-opacity-80'>Create an award in form of scholarship</p>
                </div>
                <div className="flex items-center mb-4">
                    <img src="/images/crown.png" alt="crown" className='max-w-full mr-4 w-6' />
                    <p className='text-white text-base text-opacity-80'>Giveback to your home country, seamlessly select candidates that fit your eligibility criteria</p>
                </div>
                <div className="flex items-center mb-4">
                    <img src="/images/crown.png" alt="crown" className='max-w-full mr-4 w-6' />
                    <p className='text-white text-base text-opacity-80'>Invite team member or colleagues to help you select award winners and manage award</p>
                </div>
            </div>
            <div className='min-h-screen bg-white lg:pt-[100px] flex flex-col xl:w-[calc(100%-520px)] lg:w-[calc(100%-400px)] mdMax:w-full'>
                <div className="items-center smMax:justify-center smMax:bg-[#F8F9FC] px-10 border-b border-primary-stroke h-[100px] hidden mdMax:flex mb-10">
                    <img src='/images/logo.png' alt='image' className='max-w-full object-cover' />
                </div>
                <div className="flex items-start smMax:flex-col">
                    {currentStep > 0 && (
                        <div className="ml-20 smMax:ml-0">
                            <Timeline className='step-timeline lg:ml-4 -mt-3 relative smMax:hidden'>
                                {steps.map((_, index) => (
                                    <Timeline.Item className={`${index <= currentStep ? 'active' : ''} relative`} key={index}>
                                        {index === currentStep && (
                                            <div className='bg-primary border border-white rounded w-[40px] h-[26px] items-center justify-center text-white font-bold font-outfit text-xs inline-flex absolute -left-10 mdMax:-left-8 top-0'>
                                                {currentStep + 1}/{steps.length}
                                            </div>
                                        )}
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                            <CustomStep className="sm:hidden px-4 mb-5" steps={steps as any} current={currentStep} />
                        </div>
                    )}
                    <div className='w-[520px] mx-auto smMax:w-full smMax:px-4'>
                        {currentStep === 0 && (
                            <>
                                <h3 className='text-[22px] font-bold text-primary leading-8 mb-2'>Describe your award</h3>
                                <p className='text-secondary font-normal text-sm mb-7'>Understanding that self-worth is the beginning of success.</p>
                                <RichTextEditor defaultValue={state?.description || null} error={errors.description} onChange={(v) => onChangeHandler('description', v)} />
                                {/* <p className='w-full text-right text-secondary text-xs mt-2'>0/75</p> */}
                                <h4 className='flex items-center text-sm font-medium text-primary mt-6 mb-6'>
                                    <span className='mr-4'>
                                        <BiInfoCircle />
                                    </span>
                                    Sample description
                                </h4>
                                <div className="flex items-baseline mb-5">
                                    <div className='w-[4px] h-[10px] bg-primary-purple mr-4 rounded-full inline-block' />
                                    <p className='text-sm text-secondary font-normal w-[98%]'>
                                        I believe conserving the environment is the most important thing for the world right now, and is my philanthropic focus.
                                    </p>
                                </div>
                                <div className="flex items-baseline mb-5">
                                    <div className='w-[4px] h-[10px] bg-primary-purple mr-4 rounded-full inline-block' />
                                    <p className='text-sm text-secondary font-normal w-[98%]'>
                                        I???d like to support students who plan to spend their careers addressing climate change.
                                    </p>
                                </div>
                                <div className="flex items-baseline mb-5">
                                    <div className='w-[4px] h-[10px] bg-primary-purple mr-4 rounded-full inline-block' />
                                    <p className='text-sm text-secondary font-normal w-[98%]'>
                                        This mission is personally important to me because I always wanted to be an environmental engineer, but took a different path for my career.
                                    </p>
                                </div>
                                <div className="flex items-baseline mb-5">
                                    <div className='w-[4px] h-[10px] bg-primary-purple rounded-full block mr-4' />
                                    <p className='text-sm text-secondary font-normal w-[98%]'>
                                        I want to create a scholarship to give $1000 to one student each year who is interested in pursuing environmental studies and making a difference in the fight to save the climate.
                                    </p>
                                </div>
                            </>
                        )}

                        {currentStep === 1 && (
                            <WhoCanApply error={errors?.country} state={state} onChangeHandler={onChangeHandler} />
                        )}

                        {currentStep === 2 && (
                            <>
                                <h3 className='text-[22px] font-bold text-primary leading-8 mb-2'>What best describes what you are awarding for?</h3>
                                <p className='text-secondary font-normal text-sm mb-7'>This helps yourscholarship stand out to the right candidates.</p>
                                <MultiSelectCheckBox
                                    hideSearch={true}
                                    customOption={true}
                                    mode='multiple'
                                    placeholder='Select category'
                                    options={categories}
                                    className="mb-5"
                                    error={errors?.category}
                                    value={state?.categories}
                                    onChange={v => onChangeHandler('categories', v)}
                                />
                                <CustomTagInput
                                    label={(
                                        <div className="flex mb-2 flex-col">
                                            <span>
                                                <strong className="mr-2">Tags</strong>
                                                (optional)
                                            </span>
                                            <p className='text-xs text-body'>Improve discoverability of your awards by adding tags relevant to the subject matter.</p>
                                        </div>
                                    )}
                                    onChange={v => onChangeHandler('tags',v)}
                                />
                                <p className='text-xs text-body text-opacity-60 my-6'>These location preferences will be displayed to applicants and the puboic, but anyone can submit applications.</p>
                            </>
                        )}

                        {currentStep === 3 && (
                            <>
                                <h3 className='text-[22px] font-bold text-primary leading-8 mb-2'>What best describes what you are awarding for?</h3>
                                <p className='text-secondary font-normal text-sm mb-7'>This helps yourscholarship stand out to the right candidates.</p>
                                <TextInput 
                                    value={title} 
                                    onChange={v => onTitleHandler(v)} 
                                    placeholder='Enter award title' 
                                    className='focus:bg-primary-purple focus:bg-opacity-5' 
                                    containerClass='mb-2'
                                    error={errors?.title} />
                                <p className="w-full text-right text-sm">0/75</p>
                                <h4 className='flex items-center text-sm font-medium text-primary mt-4 mb-6'>
                                    <span className='mr-4'>
                                        <BiInfoCircle />
                                    </span>
                                    Sample title
                                </h4>
                                <div className="flex items-baseline mb-5">
                                    <div className='w-[4px] h-[10px] bg-primary-purple mr-4 rounded-full inline-block' />
                                    <p className='text-sm text-secondary font-normal w-[98%]'>
                                        I believe conserving the environment is the most important thing for the world right now, and is my philanthropic focus.
                                    </p>
                                </div>
                                <div className="flex items-baseline mb-5">
                                    <div className='w-[4px] h-[10px] bg-primary-purple mr-4 rounded-full inline-block' />
                                    <p className='text-sm text-secondary font-normal w-[98%]'>
                                        I???d like to support students who plan to spend their careers addressing climate change.
                                    </p>
                                </div>
                            </>
                        )}

                        {currentStep === 4 && (
                            <Upload onChangeHandler={onChangeHandler} />
                        )}

                        {currentStep === 5 && (
                            <Payment state={state} errors={errors} onChangeHandler={onChangeHandler} />
                        )}
                    </div>
                </div>

                <div className="flex items-center border-t px-14 smMax:px-4 justify-between h-[100px] mt-auto">
                    <button onClick={goPrevStep} className=' smMax:rounded-lg px-6 flex items-center h-[52px] rounded-[4px] border-2 border-[#EDF2F7] text-base font-medium text-primary justify-center'>
                        {currentStep > 0 ? (
                            <>
                                <span className='mr-2'><MdOutlineKeyboardBackspace /></span>
                                Back
                            </>
                        ) : (
                            <>
                                <span className='mr-2'><RiCloseLine /></span>
                                Close
                            </>
                        )}
                    </button>
                    <button onClick={goNextStep} className=' smMax:rounded-lg px-7 flex items-center  h-[56px] rounded-[4px] bg-primary-purple text-white text-base font-semibold justify-center'>
                        Continue
                    </button>
                </div>
            </div>

            <PreviewWIndow
                state={state}
                visible={showPreviewDrawer}
                onChangeHandler={onChangeHandler}
                onClose={() => setShowPreviewDrawer(false)} />
        </div>
    )
}

export default CreatePage;