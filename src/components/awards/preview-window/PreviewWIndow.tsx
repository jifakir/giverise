import { Drawer, Collapse, Modal } from 'antd';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AiOutlineCloud } from 'react-icons/ai';
import { BiInfoCircle } from 'react-icons/bi';
import { BsX, BsPlusCircle, BsCheckCircle, BsArrowLeftShort } from 'react-icons/bs';
import { FaAngleUp, FaAngleDown, FaPlus } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import TextInput from '../../auth-modal/TextInput';
import { RichTextEditor } from '../../editor';
import { CustomRadio } from '../../forms';
import { Gallery, Edit, DeleteIcon, Copy, DotElipse, Invalid } from '../../icons';
import { MultiSelectCheckBox } from '../multi-select-checkbox';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import WhoCanApply from '../who-can-apply';
import { CropModal } from '../upload/UploadBox';
import api from '../../../utils/api';
import { categories, documents, options } from '../../../dummy/data';
import axios from 'axios';
import { awardForm } from '../../../pages/awards/create';
import dayjs from 'dayjs';
import { MdDone } from 'react-icons/md';
import { DatePicker } from '../../date-picker';
import { useFetchCategoriesQuery, useFetchInvitationsQuery, useSendInvitationMutation } from '../../../store/api';

type PreviewProps = {
    visible: boolean,
    onClose: () => void,
    state:awardForm,
    onChangeHandler: (name:string, val:any) => void
 };



const CollapseHeader = ({ title = '', subtitle = '' }) => (
    <div className='px-6 smMax:px-0'>
        <h3 className='text-lg font-medium text-[#1E1147]'>
            {title}
            <span className='text-secondary ml-1 font-normal'>(optional)</span>
        </h3>
        <p className='text-sm text-body'>
            {subtitle}
        </p>
    </div>
);

const WhoCanApplyModal = ({ state, visible = false, onClose, onChangeHandler }: { state:awardForm, visible?: boolean; onClose: () => void, onChangeHandler: (name:string, val:any) => void}) => {
    return (
        <Modal visible={visible} closable={false} footer={null}>
            <div className="flex items-center">
                <button onClick={onClose} className='w-6 h-6 rounded-full grid place-items-center bg-primary-purple bg-opacity-10 text-primary text-lg'>
                    <BsArrowLeftShort />
                </button>
                <h3 className='mx-auto text-lg font-bold text-primary'>Who can apply</h3>
            </div>
            <WhoCanApply state={state} onChangeHandler={onChangeHandler} fromModal={true} />
            <div className="flex items-center justify-end mt-6">
                <button onClick={onClose} className='bg-primary-purple text-white font-medium text-base rounded-[4px] grid place-items-center h-12 w-[71px]'>
                    Done
                </button>
            </div>
        </Modal>
    )
};

const CategoryModal = ({ visible, onClose, state, onChangeHandler, error }:{ state:awardForm, error?: string | undefined, visible?: boolean; onClose: () => void, onChangeHandler: (name:string, val:any) => void}) => {
    
    const {data} = useFetchCategoriesQuery({undefined});
    console.log(data);

    return (
        <Modal visible={visible} closable={false} footer={null}>
            <div className="flex items-center mb-5">
                <button onClick={onClose} className='w-6 h-6 rounded-full grid place-items-center bg-primary-purple bg-opacity-10 text-primary text-lg'>
                    <BsArrowLeftShort />
                </button>
                <h3 className='mx-auto text-lg font-bold text-primary'>Category</h3>
            </div>
            <MultiSelectCheckBox
                hideSearch={true}
                customOption={true}
                mode='multiple'
                placeholder='Select category'
                options={data?.data?.map(( itm:{ title: string, id:number }) => ({label: itm.title, value: itm.id.toString()}))}
                className="mb-5"
                error={error}
                value={state?.categories}
                onChange={v => onChangeHandler('categories', v)}
            />
            <div className="flex items-center justify-end mt-6">
                <button onClick={onClose} className='bg-primary-purple text-white font-medium text-base rounded-[4px] grid place-items-center h-12 w-[71px]'>
                    Done
                </button>
            </div>
        </Modal>
    )
};

const DeadlineModal = ({ visible, onClose, state, onChangeHandler, error }:{ state:awardForm, error?: string | undefined, visible?: boolean; onClose: () => void, onChangeHandler: (name:string, val:any) => void}) => {
    
    return (
        <Modal visible={visible} closable={false} footer={null}>
            <div className="flex items-center mb-5">
                <button onClick={onClose} className='w-6 h-6 rounded-full grid place-items-center bg-primary-purple bg-opacity-10 text-primary text-lg'>
                    <BsArrowLeftShort />
                </button>
                <h3 className='mx-auto text-lg font-bold text-primary'>Application deadline</h3>
            </div>
            <DatePicker
                onChange={(v) => onChangeHandler('deadline', v)} />
            <div className="flex items-center justify-end mt-6">
                <button onClick={onClose} className='bg-primary-purple text-white font-medium text-base rounded-[4px] grid place-items-center h-12 w-[71px]'>
                    Done
                </button>
            </div>
        </Modal>
    )
};

const AwardModal = ({ visible, onClose, state, onChangeHandler, errors }:{ state:awardForm, errors?: { award_amount: string, tip_amount: string }, visible?: boolean; onClose: () => void, onChangeHandler: (name:string, val:any) => void}) => {
    
    return (
        <Modal visible={visible} closable={false} footer={null}>
            <div className="flex items-center mb-5">
                <button onClick={onClose} className='w-6 h-6 rounded-full grid place-items-center bg-primary-purple bg-opacity-10 text-primary text-lg'>
                    <BsArrowLeftShort />
                </button>
                <h3 className='mx-auto text-lg font-bold text-primary'>Award Total</h3>
            </div>
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
            <div className="flex items-center justify-end mt-6">
                <button onClick={onClose} className='bg-primary-purple text-white font-medium text-base rounded-[4px] grid place-items-center h-12 w-[71px]'>
                    Done
                </button>
            </div>
        </Modal>
    )
};

const Success = ({visible = false}:{visible?: boolean}) => {
    const breakpoint = useBreakpoint();
    return (
        <Drawer width={"100vw"} visible={visible} closable={false} bodyStyle={{ padding: '0px', backgroundColor: breakpoint.lg ? '#F3F3F3' : '#fff' }}>
            <div className="flex bg-white items-center justify-between px-8 border-b border-primary-stroke h-[70px] smMax:border-0 smMax:h-[100px] smMax:bg-[#F8F9FC]">
                <img src='/images/logo.png' className='max-w-full object-cover smMax:hidden' />
                <img src='/images/logo-icon.png' className='max-w-full object-cover hidden smMax:block' />
                <h3 className='text-[28px] font-bold text-[#1E1147] smMax:text-3xl smMax:font-semibold'>Success</h3>
                <div className=""></div>
            </div>
            <div className='smMax:p-4 min-h-[calc(100vh-70px)] flex justify-center items-center font-outfit'>
                <div className="">
                    <div className="flex justify-center items-center">
                        <div className="border-[4.5px] border-[#0FBD70] rounded-full text-6xl p-3">
                            <MdDone className='text-[#0FBD70]' />
                        </div>
                    </div>
                    <h3 className="mt-12 text-center text-xl font-outfit font-medium text-primary">Your award has been published successfully</h3>
                    <p className='text-center font-outfit text-[#445169] mt-2'>Copy link to share with public</p>
                    <div className="mt-10 cursor-pointer w-full p-4 bg-[#F8F8F8] flex justify-between items-center">
                        <p className="text-[#1C1B4E]">Giverise.com/rnp/hdem-ckk</p>
                        <Copy />
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src='/images/logos/Instagram_icon.png' alt='Insta Icon' className='w-8 h-8 object-cover mt-2' />
                        <img src='/images/logos/whatsapp.png' alt='Whatsapp Icon' className='w-20 h-20 object-fit' />
                        <img src='/images/logos/gmail.png' alt='Gmail Icon' className='w-9 h-9 object-cover mt-2' />
                    </div>
                </div>
            </div>
        </Drawer>
    )
};

const Failure = ({visible = false}) => {

    return (
        <Modal visible={visible} closable={false} footer={null}>
            <div className="font-outfit text-center py-10">
                <div className="flex justify-center items-center mb-10">
                    <div className="py-2">
                        <Invalid />
                    </div>
                </div>
                <h1 className='text-primary text-2xl font-medium'>We could not publish your award</h1>
                <p className="text-secondary max-w-[360px] mx-auto mt-2 text-base">
                    We were unable to publish your award and it has been saved to your drafts.
                </p>
                <div className="mt-10 flex justify-center items-center gap-5">
                    <button className="bg-primary-purple text-white h-[52px] smMax:h-14 px-5 rounded-lg font-medium">
                        Retry
                    </button>
                    <button className='border-2 border-primary-purple text-primary-purple h-[52px] font-medium smMax:h-14 px-4 rounded-lg'>
                        View draft
                    </button>
                </div>
            </div>
        </Modal>
    )
};

const PreviewWIndow = ({ visible = false, onClose, state, onChangeHandler }:PreviewProps) => {
    const breakpoint = useBreakpoint();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [visbleWhoCanApply, setVisibleWhoCanApply] = useState(false);
    const [visibleCropModal, setVisibleCropModal] = useState(false);
    const [visibleCatModal, setVisibleCatModal] = useState(false);
    const [visibleDeadlineModal, setVisibleDeadlineModal] = useState(false);
    const [visibleAwardModal, setVisibleAwardModal] = useState(false);
    const [file, setFile] = useState<File>();
    const [imgSrc, setImgSrc] = useState<string>();
    const [email, setEmail] = useState('');
    const [docFiles, setFiles] = useState<string[]>([]);
    const [docDescription, setDescription] = useState<string>('');
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);


    const { data:categories } = useFetchCategoriesQuery({undefined});
    const [ sendInvitation, result ] = useSendInvitationMutation();
    const { data:teams } = useFetchInvitationsQuery({undefined});

    const onSave = (f: File) => {
        setFile(f);
        setVisibleCropModal(false);
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImgSrc(reader?.result?.toString() || '');
        });
        reader.readAsDataURL(f as File);
    }

    const handleClick = () => {
        fileInputRef.current?.click();
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImgSrc(reader?.result?.toString() || '');
            setVisibleCropModal(true);
        });
        reader.readAsDataURL(file as File);
        setFile(file);
    }

    const addTeam = async (val:string) => {
        if(!email) return;
        try{
            await sendInvitation({
                email,
                roleId: val,
                campaignId: state?.campaignId
            });
        }catch(err){
            console.log(err);
        }
    };

    const addDocument = () => {

        if(!docDescription) return;
        if(docFiles.length === 0) return;
        onChangeHandler('documents',[...state.documents,{
            description: docDescription,
            files: docFiles
        }]);
        setDescription('');
        setFiles([]);
    };

    const removeDocument = (idx:number) => {
        let documents = [...state.documents];
        documents.splice(idx,1);
        onChangeHandler('documents', documents);
    };

    const fileChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        console.log(`${e.target.value}: `, e.target.checked);
        const checked = e.target.checked;
        const value = e.target.value;
        if(checked){
            setFiles([...docFiles, value]);
        }else{
            setFiles([...docFiles.filter( itm => itm !== value)]);
        }
        console.log(docFiles);
    };

    const handleSubmit = async (isDraft:boolean) => {

        const { 
            campaignId, education, school, study_field, gender, 
            age_range, word_length, beneficiary, tip_amount, award_amount,
            winner, first_runner, second_runner, essay_description, ...rest } = state;

        const formBody = {
            ...rest,
            isDraft,
            awardTotal: eval(award_amount + tip_amount),
            criteria: {
                education,
                school,
                study_field,
                gender,
                age_range
            },
            screeningEssay: {
                description: essay_description,
                word_length
            },
            awardDistribution: {
                beneficiary,
                winner,
                first_runner,
                second_runner
            }
        };

        try{
            console.log(formBody);
            const res = await api(`/campaigns/${campaignId}`,'put', formBody);
            console.log(res);
            setSuccess(true);
        }catch(err){
            setFailed(true);
            console.log(err);
        }
        
    };

    useEffect(()=> {
        setImgSrc(state?.coverMedia);
    },[])

    return (
        <Drawer width={"100vw"} visible={visible} closable={false} bodyStyle={{ padding: '0px', backgroundColor: breakpoint.lg ? '#F3F3F3' : '#fff' }}>
            <Success visible={success} />
            <Failure visible={failed} />
            <div className="flex bg-white items-center justify-between px-8 border-b border-primary-stroke h-[70px] smMax:border-0 smMax:h-[100px] smMax:bg-[#F8F9FC]">
                <img src='/images/logo.png' className='max-w-full object-cover smMax:hidden' alt='Image' />
                <img src='/images/logo-icon.png' className='max-w-full object-cover hidden smMax:block' alt='Image' />
                <h3 className='text-[28px] font-bold text-[#1E1147] smMax:text-3xl smMax:font-semibold'>Review award</h3>
                <button className='flex items-center text-[#141518] font-medium text-sm' onClick={onClose}>
                    <span className='smMax:hidden'>Preview</span>
                    <span className='ml-1'><FiArrowUpRight /></span>
                </button>
            </div>
            <div className='smMax:p-4'>
                <div className="w-[960px] bg-white max-w-full mx-auto lg:border lg:border-primary-stroke lg:rounded-lg my-5  py-8 pb-0 smMax:border smMax:border-primary-stroke smMax:rounded-lg overflow-hidden">
                    <h3 className='text-primary-purple text-[22px] font-bold mb-8 px-10 smMax:px-4'>Now just finish and review your award</h3>
                    <div className="flex items-center justify-between px-10 border-b border-primary-stroke smMax:flex-col smMax:px-4">
                        <div className='w-[40%] smMax:w-full smMax:mb-4'>
                            <h3 className='text-lg font-medium text-[#1E1147]'>
                                Title
                            </h3>
                            <div className="flex items-center text-sm text-body">
                                <span className='mr-1'>
                                    <BiInfoCircle />
                                </span>
                                <span>See sample title</span>
                            </div>
                        </div>
                        <div className='relative w-[60%] smMax:w-full'>
                            <TextInput 
                                value={state?.title} 
                                onChange={(v) => onChangeHandler('title', v)} 
                                floatingLabel={true} 
                                label='Award title'
                                placeholder="Enter award title"
                                className='pt-6 px-3.5 overflow-hidden placeholder-shown:text-ellipsis placeholder:text-ellipsis placeholder:whitespace-nowrap' 
                                />
                            <span className='absolute w-5 h-5 bg-primary-purple bg-opacity-5 text-secondary text-xs rounded-full right-4 top-4 smMax:right-3 grid place-items-center'>
                                5
                            </span>
                        </div>
                    </div>
                    <div className="px-10 flex smMax:flex-col smMax:px-4 py-4 border-b border-primary-stroke">
                        <div className='w-[40%] smMax:w-full smMax:mb-4'>
                            <h3 className='text-lg font-medium text-[#1E1147]'>Cover media</h3>
                            <p className='text-sm text-body my-4'>
                                Use a photo or video that represents your story well. A photo (JPG, PNG, GIF, or BMP) should be less than 20MB.
                            </p>
                            <input type="file" onChange={onFileChange} ref={fileInputRef} className="hidden" accept='image/*' />
                            <button onClick={handleClick} className='text-base text-primary-purple border border-primary-purple h-8 w-24 flex items-center justify-center rounded-[4px]'>
                                <span className='mr-1'><Gallery /></span>
                                Change
                            </button>
                        </div>
                        <div className='w-[60%] smMax:w-full'>
                            <img src={state?.coverMedia ?? '/images/dummy/preview.jpg'} alt="img" className="object-cover w-full h-[202px] rounded-lg" />
                        </div>
                    </div>
                    <div className="px-10 flex smMax:flex-col smMax:px-4 py-4 border-b border-primary-stroke">
                        <div className='w-[40%] smMax:w-full smMax:mb-4'>
                            <h3 className='text-lg font-medium text-[#1E1147]'>Description</h3>
                            <div className="flex items-center text-sm text-body">
                                <span className='mr-1'>
                                    <BiInfoCircle />
                                </span>
                                <span>See sample title</span>
                            </div>
                        </div>
                        <div className='w-[60%] smMax:w-full'>
                            <RichTextEditor
                                error={false}
                                defaultValue={state?.description}
                                onChange={(v) => onChangeHandler('description',v)} />
                        </div>
                    </div>
                    <div className="px-10  smMax:px-4 py-4 border-b border-primary-stroke">
                        <div className="mb-8">
                            <h3 className='text-lg font-medium text-[#1E1147]'>Who can apply</h3>
                            <div className="flex items-center text-xs text-body gap-2">
                                <span>{state?.region === 'us' ? 'Us Only' : state?.region === 'worldwide' ? 'Worldwide': 'My Country'}</span>
                                <button onClick={() => setVisibleWhoCanApply(true)}><Edit /></button>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                                {
                                    state?.region === 'us' ? 
                                    state?.nationalities?.map((v:string, idx:number) => (
                                        <div key={idx} className='flex items-center gap-[3px] rounded-[3px] bg-primary-purple bg-opacity-5 border border-[#EAE9F2] text-primary text-xs px-3 py-1'>
                                            {v}
                                            <button className='text-sm'>
                                                <BsX />
                                            </button>
                                        </div>
                                    )):
                                    state?.states?.map((v:string, idx:number) => (
                                        <div key={idx} className='flex items-center gap-[3px] rounded-[3px] bg-primary-purple bg-opacity-5 border border-[#EAE9F2] text-primary text-xs px-3 py-1'>
                                            {v}
                                            <button className='text-sm'>
                                                <BsX />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className='text-lg font-medium text-[#1E1147]'>Category</h3>
                            <div className="flex items-center text-xs text-body gap-2">
                                <span>Educational tools</span>
                                <span className='cursor-pointer' onClick={() => setVisibleCatModal(true)}><Edit /></span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                                {
                                    state?.categories.map((cat:string, idx:number) => (
                                        <div key={`category_${idx}`} className='flex items-center gap-[3px] rounded-[3px] bg-primary-purple bg-opacity-10 border border-[#EAE9F2] text-primary text-xs px-3 py-1'>
                                            {categories?.data?.find((itm:{id:number}) => itm.id === Number(cat))?.title}
                                            <button onClick={() => onChangeHandler('categories', state.categories.filter((itm:string) => itm !== cat))} className='text-sm'>
                                                <BsX />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className='text-lg font-medium text-[#1E1147]'>Application deadline</h3>
                            <div className="flex items-center text-xs text-body gap-2">
                                <span>{dayjs(state?.deadline).format('DD-MM-YYYY')}</span>
                                <span className='cursor-pointer' onClick={() => setVisibleDeadlineModal(true)}><Edit /></span>
                            </div>
                        </div>
                        <div className="">
                            <h3 className='text-lg font-medium text-[#1E1147]'>Award total</h3>
                            <div className="flex items-center text-xs text-body gap-2">
                                <span>${eval(state?.award_amount + state?.tip_amount)}</span>
                                <span onClick={() => setVisibleAwardModal(true)} className='cursor-pointer'><Edit /></span>
                            </div>
                        </div>
                    </div>
                    <Collapse bordered={false} expandIconPosition="right" className='bg-white' expandIcon={({ isActive }) => isActive ? <span><FaAngleUp /></span> : <span><FaAngleDown /></span>}>
                        <Collapse.Panel key={'1'} header={<CollapseHeader title='Eligibility criteria' subtitle='Narrow down your candidates' />}>
                            <div className="px-6 smMax:px-0">
                                <div className="grid grid-cols-2 smMax:grid-cols-1 gap-x-10 gap-y-4">
                                    <div>
                                        <MultiSelectCheckBox
                                            customOption={false}
                                            mode='single'
                                            hideSearch={true}
                                            placeholder='Select'
                                            options={[
                                                {
                                                    label: 'Education',
                                                    value: 'education'
                                                },
                                                {
                                                    label: 'Education 2',
                                                    value: 'education2'
                                                },
                                            ]}
                                            onChange={v => onChangeHandler('education', v)}
                                            label={<label className='text-sm text-primary font-medium mb-2 block'>Education level</label>}
                                        />
                                    </div>
                                    <div>
                                        <label className='text-sm text-primary font-medium mb-6 block'>Gender</label>
                                        <div className="flex items-center gap-4">
                                            <CustomRadio label='Both' onChange={v => onChangeHandler('gender', v.target.value)} name='gender' value='both' size='lg' />
                                            <CustomRadio label='Male' onChange={v => onChangeHandler('gender', v.target.value)} name='gender' value='male' size='lg' />
                                            <CustomRadio label='Female' onChange={v => onChangeHandler('gender', v.target.value)} name='gender' value='female' size='lg' />
                                        </div>
                                    </div>
                                    <div>
                                        <MultiSelectCheckBox
                                            customOption={false}
                                            mode='single'
                                            hideSearch={true}
                                            placeholder='Select'
                                            options={[
                                                {
                                                    label: 'School',
                                                    value: 'school'
                                                },
                                                {
                                                    label: 'School 2',
                                                    value: 'school2'
                                                },
                                            ]}
                                            onChange={v => onChangeHandler('school', v)}
                                            label={<label className='text-sm text-primary font-medium mb-2 block'>School(s)</label>}
                                        />
                                    </div>
                                    <div>
                                        <MultiSelectCheckBox
                                            customOption={false}
                                            mode='single'
                                            hideSearch={true}
                                            placeholder='Select'
                                            onChange={v => onChangeHandler('study_field', v)}
                                            options={[
                                                {
                                                    label: 'Study',
                                                    value: 'study'
                                                },
                                                {
                                                    label: 'Study 2',
                                                    value: 'study2'
                                                },
                                            ]}
                                            label={<label className='text-sm text-primary font-medium mb-2 block'>Field of study</label>}
                                        />
                                    </div>
                                    <div>
                                        <MultiSelectCheckBox
                                            customOption={false}
                                            mode='single'
                                            hideSearch={true}
                                            placeholder='Select'
                                            onChange={v => onChangeHandler('age_range', v)}
                                            options={[
                                                {label: '50', value: '50'},
                                                {label: '60', value: '60'},
                                            ]}
                                            label={<label className='text-sm text-primary font-medium mb-2 block'>Age range</label>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel key={'2'} header={<CollapseHeader title='Documents' subtitle='Would you like your scholarship applicants to submit any media files or documents (video, image, audio, word, PDF)' />}>
                            <div className="px-6 smMax:px-0">
                                <div className='xl:max-w-[80%]'>
                                    <TextInput value={docDescription} onChange={v => setDescription(v)} placeholder='File description or name (e.g. 2022 GRE Result Transcript)' />
                                    <div className="border rounded-lg border-primary-stroke grid grid-cols-3 smMax:grid-cols-2 gap-4 p-4 mb-4">
                                        {
                                            documents.map((doc:{label:string, value:string}, idx:number) => (
                                            <label key={`doc_${idx}`} className='flex items-center cursor-pointer'>
                                                <input 
                                                    onChange={(e) => fileChangeHandler(e)} 
                                                    value={doc.value} 
                                                    type="checkbox"
                                                    checked={docFiles.includes(doc.value)} 
                                                    className='w-[22px] h-[22px] rounded-[4px] border-2 border-body checked:border-primary-purple text-primary-purple focus:ring-0 focus:ring-offset-0' />
                                                <span className='text-body text-sm font-normal ml-2'>{doc.label}</span>
                                            </label>
                                            ))
                                        }
                                    </div>
                                    <div className="border rounded-lg border-primary-stroke flex justify-between p-4 text-primary text-sm mb-6">
                                        <p>Maximum video length</p>
                                        <p>10s</p>
                                    </div>
                                    <button onClick={addDocument} className='flex items-center h-10 w-[90px] mb-6 justify-center bg-primary-purple bg-opacity-10 rounded-[4px] font-medium text-primary'>
                                        <span className='mr-2'><FaPlus /></span>
                                        Add
                                    </button>
                                    {
                                        state?.documents.map((doc, idx) => (
                                        <div key={`document_${idx}`} className='flex items-center mb-3 text-body text-sm font-normal'>
                                            <div className='w-2 h-2 rounded-full bg-primary mr-2'/>
                                                {doc.description} ({doc.files.join(', ')})
                                            <button onClick={() => removeDocument(idx)} className="text-body text-2xl ml-auto">
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel key={'3'} header={<CollapseHeader title='Screening essays' subtitle='Would you like your scholarship applicants to write an essay?' />}>
                            <div className="px-6 smMax:px-0">
                                <div className="grid grid-cols-3 smMax:grid-cols-1 gap-6">
                                    <div className="col-span-2 smMax:col-span-full">
                                        <RichTextEditor onChange={(v) => onChangeHandler('screeningEssay', v)} placeholder='Essay desciption' />
                                        <div className="relative mt-4">
                                            <TextInput value={state?.word_length} onChange={v => onChangeHandler('word_length', v)} label='Essay length' placeholder='Enter max word length for essay' />
                                            <span className='absolute bottom-2 text-secondary text-sm flex items-center right-1 h-8 bg-white rounded-r px-4 border-l border-primary-stroke'>
                                                Words
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1 smMax:col-span-full">
                                        <div className="bg-primary-purple bg-opacity-[0.03] rounded-lg p-4">
                                            <div className="flex items-center text-sm text-body font-medium mb-4">
                                                <span className='mr-1'>
                                                    <BiInfoCircle />
                                                </span>
                                                <span>Suggested</span>
                                            </div>
                                            <div className="flex items-baseline mb-2">
                                                <div className='w-[4px] h-[10px] bg-primary-purple mr-4 rounded-full inline-block' />
                                                <p className='text-xs text-secondary font-normal w-[98%]'>
                                                    I believe conserving the environment is the most important thing for the world right now, and is my philanthropic focus.
                                                </p>
                                            </div>
                                            <div className="flex items-baseline mb-2">
                                                <div className='w-[4px] h-[10px] bg-primary-purple mr-4 rounded-full inline-block' />
                                                <p className='text-xs text-secondary font-normal w-[98%]'>
                                                    I’d like to support students who plan to spend their careers addressing climate change.
                                                </p>
                                            </div>
                                            <div className="flex items-baseline mb-2">
                                                <div className='w-[4px] h-[10px] bg-primary-purple mr-4 rounded-full inline-block' />
                                                <p className='text-xs text-secondary font-normal w-[98%]'>
                                                    This mission is personally important to me because I always wanted to be an environmental engineer, but took a different path for my career.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel key={'4'} header={<CollapseHeader title='Screening questions' subtitle='Would you like your scholarship applicants to write an essay?' />}>
                            <div className="px-6 smMax:px-0">
                                <div className="flex flex-wrap gap-3 items-center">
                                    <button className='flex items-center rounded-[3px] border border-primary-stroke text-sm text-secondary h-[42px] px-3'>
                                        Background Check
                                        <span className='ml-2'><BsPlusCircle /></span>
                                    </button>
                                    <button className='flex items-center rounded-[3px] border border-primary-stroke text-sm text-secondary h-[42px] px-3'>
                                        Certifications
                                        <span className='ml-2'><BsPlusCircle /></span>
                                    </button>
                                    <button className='flex items-center rounded-[3px] border border-primary-stroke text-sm text-secondary h-[42px] px-3'>
                                        Drug Test
                                        <span className='ml-2'><BsPlusCircle /></span>
                                    </button>
                                    <button className='flex items-center rounded-[3px] border border-primary-stroke text-sm text-secondary h-[42px] px-3'>
                                        Education
                                        <span className='ml-2'><BsPlusCircle /></span>
                                    </button>
                                    <button className='flex items-center rounded-[3px] border border-primary-stroke text-sm text-secondary h-[42px] px-3'>
                                        Skill Expertise
                                        <span className='ml-2'><BsPlusCircle /></span>
                                    </button>
                                    <button className='bg-primary-purple bg-opacity-[0.03] text-primary flex items-center rounded-[3px] border border-primary-purple text-sm h-[42px] px-3'>
                                        GPA
                                        <span className='ml-2 text-primary-purple'><BsCheckCircle /></span>
                                    </button>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-primary-stroke mt-4">
                                    <div className="flex justify-between items-center rounded-[4px] p-2 bg-gray-gradient">
                                        <p className='font-medium text-primary text-sm smMax:text-xs'>What is your University grade point average (4.0 GPA Scale)?</p>
                                        <span>
                                            <BsX />
                                        </span>
                                    </div>
                                    <div className="mt-4 flex smMax:flex-col sm:items-center justify-between">
                                        <div>
                                            <label className='mb-2 text-body text-base block'>Ideal answer</label>
                                            <div className="flex">
                                                <TextInput value={state?.gpa!} onChange={v => onChangeHandler('gpa', v)} className='w-[80px] h-[42px] rounded-[4px]' />
                                                <span className='ml-2 text-xs text-secondary mt-3'>minimum</span>
                                            </div>
                                        </div>
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="checkbox" className='w-[22px] h-[22px] rounded-[4px] border-2 border-body checked:border-primary-purple text-primary-purple focus:ring-0 focus:ring-offset-0' />
                                            <span className='text-body text-sm font-normal ml-2'>Must-have qualification</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel key={'5'} header={<CollapseHeader title='Award Distribution' subtitle='Narrow down your candidates' />}>
                            <div className="px-6 max-w-[410px] smMax:max-w-full smMax:px-0">
                                <div className="mb-4">
                                    <TextInput value={state?.beneficiary} onChange={(v) => onChangeHandler('beneficiary', v)} label='Total number of beneficiaries' />
                                </div>
                                <div className="mb-4">
                                    <label className='text-sm font-medium text-primary'>Distribute fund by position</label>
                                    <div className="flex items-center gap-4 my-4">
                                        <CustomRadio onChange={(v) => onChangeHandler('distribute', v.target.value)} label='Yes' value={'true'} name='distribute' />
                                        <CustomRadio onChange={(v) => onChangeHandler('distribute', v.target.value)} label='No' value={'false'} name='distribute' />
                                    </div>
                                    <p className='text-xs text-body'>Total award will be distributed according to your  settings</p>
                                </div>
                                <div className="mb-4">
                                    <TextInput value={state?.winner} onChange={(v) => onChangeHandler('winner', v)} label='Winner' />
                                </div>
                                <div className="mb-4">
                                    <TextInput value={state?.first_runner} onChange={(v) => onChangeHandler('first_runner', v)} label='2. First Runner Up' />
                                </div>
                                <div className="mb-4">
                                    <TextInput value={state?.second_runner} onChange={(v) => onChangeHandler('second_runner', v)} label='3. Second Runner Up' />
                                </div>
                                <button className='text-primary-purple text-base flex items-center font-normal'>
                                    <span className='mr-2 text-xs'><FaPlus /></span>
                                    Add position
                                </button>
                            </div>
                        </Collapse.Panel>
                        <Collapse.Panel key={'6'} header={<CollapseHeader title='Add Team' subtitle='Narrow down your candidates' />}>
                            <div className="px-6 smMax:px-0">
                                <div className="bg-primary-purple bg-opacity-[0.03] rounded-[4px] p-4 w-9/12 smMax:w-full">
                                    <p className='mb-2'>Invite multiple team members</p>
                                    <div className="flex items-center gap-4 smMax:flex-col">
                                        <div className='w-6/12 smMax:w-full'>
                                            <TextInput value={email} onChange={(v) => setEmail(v)} label='Email' placeholder='Enter valid email' containerClass='mb-0' />
                                        </div>
                                        <div className='w-6/12 smMax:w-full'>
                                            <MultiSelectCheckBox
                                                options={[{label: 'Admin', value: '1'},{label: 'Member', value: '2'}]}
                                                customOption={false}
                                                mode='single'
                                                hideSearch={true}
                                                placeholder='Select'
                                                onChange={(v) => addTeam(v as string)}
                                                label={<label className='text-sm text-primary font-medium block mb-2'>Role</label>}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-9/12 max-w-full mt-5 smMax:w-full'>
                                    {
                                        teams?.data.map((team:any, idx:number) => (
                                            <div key={`team_${idx}`} className="flex items-center justify-between border-b border-primary-stroke last-of-type:border-0 mb-4 pb-2">
                                                <div className="flex items-center w-5/12 text-sm text-primary smMax:flex-col smMax:w-5/12 smMax:items-start">
                                                    <p>{team.email}</p>
                                                    <span className='inline-flex smMax:ml-0 smMax:mt-1 ml-2 bg-primary-orange bg-opacity-10 rounded-[4px] text-body px-2 py-1 capitalize'>
                                                        {team.status}
                                                    </span>
                                                </div>
                                                <div className="w-2/12 smMax:w-4/12 mr-auto">
                                                    <MultiSelectCheckBox
                                                        options={[{label: 'Admin', value: '1'},{label: 'Member', value: '2'}]}
                                                        customOption={false}
                                                        mode='single'
                                                        hideSearch={true}
                                                        placeholder='Select'
                                                        inputClass='border-0 focus:bg-white'
                                                        value={team.roleId}
                                                    />
                                                </div>
                                                <button className="text-body text-2xl text-right">
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </Collapse.Panel>
                    </Collapse>
                </div>
            </div>
            <div className="px-10 smMax:px-4 sm:h-[100px] smMax:mt-0 border-t border-primary-stroke mt-16 flex justify-between smMax:justify-center smMax:py-4 items-center smMax:flex-col">
                <button onClick={() => handleSubmit(true)} className='smMax:w-full smMax:justify-center flex items-center bg-white rounded-lg border border-primary-stroke text-primary text-base font-medium h-[52px] smMax:h-14 px-4'>
                    <span className='mr-2'><AiOutlineCloud /></span>
                    Save for later
                </button>
                <button onClick={() => handleSubmit(false)} className='smMax:w-full smMax:justify-center smMax:mt-4 bg-primary-purple text-white flex items-center text-base font-semibold h-[52px] smMax:h-14 px-4 rounded-lg'>
                    <span className='font-normal mr-1'>Next:</span> Review & Post
                </button>
            </div>
            <WhoCanApplyModal
                state={state}
                onChangeHandler={onChangeHandler}
                visible={visbleWhoCanApply}
                onClose={() => setVisibleWhoCanApply(false)} />
            <CategoryModal
                state={state}
                visible={visibleCatModal}
                onChangeHandler={onChangeHandler}
                onClose={() => setVisibleCatModal(false)} />
            <DeadlineModal
                onChangeHandler={onChangeHandler}
                state={state}
                visible={visibleDeadlineModal}
                onClose={() => setVisibleDeadlineModal(false)} />
            <AwardModal
                onChangeHandler={onChangeHandler}
                onClose={() => setVisibleAwardModal(false)}
                visible={visibleAwardModal}
                state={state} />
            <CropModal
                isVisible={visibleCropModal}
                onSave={onSave}
                originalFile={file}
                imgSrc={imgSrc}
            />
        </Drawer>
    )
}

export default PreviewWIndow;