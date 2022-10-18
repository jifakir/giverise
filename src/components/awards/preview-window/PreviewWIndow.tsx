import { Drawer, Collapse, Modal } from 'antd';
import React, { useRef, useState } from 'react'
import { AiOutlineCloud } from 'react-icons/ai';
import { BiInfoCircle } from 'react-icons/bi';
import { BsX, BsPlusCircle, BsCheckCircle, BsArrowLeftShort } from 'react-icons/bs';
import { FaAngleUp, FaAngleDown, FaPlus } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import TextInput from '../../auth-modal/TextInput';
import { RichTextEditor } from '../../editor';
import { CustomRadio } from '../../forms';
import { Gallery, Edit, DeleteIcon } from '../../icons';
import { MultiSelectCheckBox } from '../multi-select-checkbox';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import WhoCanApply from '../who-can-apply';
import { CropModal } from '../upload/UploadBox';
import api from '../../../utils/api';
import { options } from '../../../dummy/data';
import axios from 'axios';
import { awardForm } from '../../../pages/awards/create';
import dayjs from 'dayjs';

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
                <button className='bg-primary-purple text-white font-medium text-base rounded-[4px] grid place-items-center h-12 w-[71px]'>
                    Done
                </button>
            </div>
        </Modal>
    )
}

 type PreviewProps = {
    visible: boolean,
    onClose: () => void,
    state:awardForm,
    onChangeHandler: (name:string, val:any) => void
 };

const PreviewWIndow = ({ visible = false, onClose, state, onChangeHandler }:PreviewProps) => {
    const breakpoint = useBreakpoint();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [visbleWhoCanApply, setVisibleWhoCanApply] = useState(false);
    const [visibleCropModal, setVisibleCropModal] = useState(false);
    const [file, setFile] = useState<File>();
    const [imgSrc, setImgSrc] = useState<string>(state?.coverMedia);
    const [team, setTeam] = useState('');
    const [beneficiaries, setBeneficiary] = useState('');
    const [winner, setWinner] = useState('');
    const [firstRunner, setFirstRunner] = useState('');
    const [secondRunner, setSecondRunner] = useState('');
    const [role, setRole] = useState<string | string[]>('');

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

    const handleSubmit = async (isDraft:boolean) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`,{
                        ...state,
                        isDraft
                    });
        console.log(state);
        console.log(res);
    };


    return (
        <Drawer width={"100vw"} visible={visible} closable={false} bodyStyle={{ padding: '0px', backgroundColor: breakpoint.lg ? '#F3F3F3' : '#fff' }}>
            <div className="flex bg-white items-center justify-between px-8 border-b border-primary-stroke h-[70px] smMax:border-0 smMax:h-[100px] smMax:bg-[#F8F9FC]">
                <img src='/images/logo.png' className='max-w-full object-cover smMax:hidden' />
                <img src='/images/logo-icon.png' className='max-w-full object-cover hidden smMax:block' />
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
                            <img src={imgSrc ? state.coverMedia : "/images/dummy/preview.jpg"} className="object-cover w-full h-[202px] rounded-lg" />
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
                                defaultValue={state?.description}
                                onChange={(v) => onChangeHandler('description',v)} />
                        </div>
                    </div>
                    <div className="px-10  smMax:px-4 py-4 border-b border-primary-stroke">
                        <div className="mb-8">
                            <h3 className='text-lg font-medium text-[#1E1147]'>Who can apply</h3>
                            <div className="flex items-center text-xs text-body gap-2">
                                <span>Us Only</span>
                                <button onClick={() => setVisibleWhoCanApply(true)}><Edit /></button>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                                {
                                    state?.nationalities?.map((v:string, idx:number) => (
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
                                <span><Edit /></span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                                {
                                    state?.categories.map((cat:string, idx:number) => (
                                        <div key={`category_${idx}`} className='flex items-center gap-[3px] rounded-[3px] bg-primary-purple bg-opacity-10 border border-[#EAE9F2] text-primary text-xs px-3 py-1'>
                                            {cat}
                                            <button className='text-sm'>
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
                                <span><Edit /></span>
                            </div>
                        </div>
                        <div className="">
                            <h3 className='text-lg font-medium text-[#1E1147]'>Award total</h3>
                            <div className="flex items-center text-xs text-body gap-2">
                                <span>${state?.award_amount + state?.tip_amount}</span>
                                <span><Edit /></span>
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
                                    <TextInput value={state?.document_description} onChange={v => onChangeHandler('document_description', v)} placeholder='File description or name (e.g. 2022 GRE Result Transcript)' />
                                    <div className="border rounded-lg border-primary-stroke grid grid-cols-3 smMax:grid-cols-2 gap-4 p-4 mb-4">
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="checkbox" className='w-[22px] h-[22px] rounded-[4px] border-2 border-body checked:border-primary-purple text-primary-purple focus:ring-0 focus:ring-offset-0' />
                                            <span className='text-body text-sm font-normal ml-2'>Word document</span>
                                        </label>
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="checkbox" className='w-[22px] h-[22px] rounded-[4px] border-2 border-body checked:border-primary-purple text-primary-purple focus:ring-0 focus:ring-offset-0' />
                                            <span className='text-body text-sm font-normal ml-2'>Image</span>
                                        </label>
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="checkbox" className='w-[22px] h-[22px] rounded-[4px] border-2 border-body checked:border-primary-purple text-primary-purple focus:ring-0 focus:ring-offset-0' />
                                            <span className='text-body text-sm font-normal ml-2'>Presentation</span>
                                        </label>
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="checkbox" className='w-[22px] h-[22px] rounded-[4px] border-2 border-body checked:border-primary-purple text-primary-purple focus:ring-0 focus:ring-offset-0' />
                                            <span className='text-body text-sm font-normal ml-2'>PDF</span>
                                        </label>
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="checkbox" className='w-[22px] h-[22px] rounded-[4px] border-2 border-body checked:border-primary-purple text-primary-purple focus:ring-0 focus:ring-offset-0' />
                                            <span className='text-body text-sm font-normal ml-2'>Video</span>
                                        </label>
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="checkbox" className='w-[22px] h-[22px] rounded-[4px] border-2 border-body checked:border-primary-purple text-primary-purple focus:ring-0 focus:ring-offset-0' />
                                            <span className='text-body text-sm font-normal ml-2'>Spreadsheet</span>
                                        </label>
                                    </div>
                                    <div className="border rounded-lg border-primary-stroke flex justify-between p-4 text-primary text-sm mb-6">
                                        <p>Maximum video length</p>
                                        <p>10s</p>
                                    </div>
                                    <button className='flex items-center h-10 w-[90px] mb-6 justify-center bg-primary-purple bg-opacity-10 rounded-[4px] font-medium text-primary'>
                                        <span className='mr-2'><FaPlus /></span>
                                        Add
                                    </button>
                                    <div className='flex items-center mb-3 text-body text-sm font-normal'>
                                        <div className='w-2 h-2 rounded-full bg-primary mr-2' />
                                        Video recording of you (pdf, audio, word)
                                        <button className="text-body text-2xl ml-auto">
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                    <div className='flex items-center mb-3 text-body text-sm font-normal'>
                                        <div className='w-2 h-2 rounded-full bg-primary mr-2' />
                                        WAEC result (Image, PDF)
                                        <button className="text-body text-2xl ml-auto">
                                            <DeleteIcon />
                                        </button>
                                    </div>
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
                                        <CustomRadio onChange={(v) => onChangeHandler('distribute', v)} label='Yes' name='distribute' />
                                        <CustomRadio onChange={(v) => onChangeHandler('distribute', v)} label='No' name='distribute' />
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
                                            <TextInput value={team} onChange={(v) => setTeam(v)} label='Email' placeholder='Enter valid email' containerClass='mb-0' />
                                        </div>
                                        <div className='w-6/12 smMax:w-full'>
                                            <MultiSelectCheckBox
                                                options={['Admin', 'Member']}
                                                customOption={false}
                                                mode='single'
                                                hideSearch={true}
                                                placeholder='Select'
                                                onChange={(v) => setRole(v)}
                                                label={<label className='text-sm text-primary font-medium block mb-2'>Role</label>}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-9/12 max-w-full mt-5 smMax:w-full'>
                                    <div className="flex items-center justify-between border-b border-primary-stroke last-of-type:border-0 mb-4 pb-2">
                                        <div className="flex items-center w-5/12 text-sm text-primary smMax:flex-col smMax:w-5/12 smMax:items-start">
                                            <p>iamapj@yahoo.com</p>
                                            <span className='inline-flex smMax:ml-0 smMax:mt-1 ml-2 bg-primary-orange bg-opacity-10 rounded-[4px] text-body px-2 py-1 capitalize'>
                                                pending
                                            </span>
                                        </div>
                                        <div className="w-2/12 smMax:w-4/12 mr-auto">
                                            <MultiSelectCheckBox
                                                options={['Admin', 'Member']}
                                                customOption={false}
                                                mode='single'
                                                hideSearch={true}
                                                placeholder='Select'
                                                inputClass='border-0 focus:bg-white'
                                                value={'Admin'}
                                            />
                                        </div>
                                        <button className="text-body text-2xl text-right">
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-primary-stroke last-of-type:border-0 mb-4 pb-2">
                                        <div className="flex items-center w-5/12 text-sm text-primary smMax:flex-col smMax:w-5/12 smMax:items-start">
                                            <p>iamapj@yahoo.com</p>
                                            <span className='inline-flex smMax:ml-0 smMax:mt-1 ml-2 bg-primary-orange bg-opacity-10 rounded-[4px] text-body px-2 py-1 capitalize'>
                                                pending
                                            </span>
                                        </div>
                                        <div className="w-2/12 smMax:w-4/12 mr-auto">
                                            <MultiSelectCheckBox
                                                options={['Admin', 'Member']}
                                                customOption={false}
                                                mode='single'
                                                hideSearch={true}
                                                placeholder='Select'
                                                inputClass='border-0 focus:bg-white'
                                                value={'Admin'}
                                            />
                                        </div>
                                        <button className="text-body text-2xl text-right">
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-primary-stroke last-of-type:border-0 mb-4 pb-2">
                                        <div className="flex items-center w-5/12 text-sm text-primary smMax:flex-col smMax:w-5/12 smMax:items-start">
                                            <p>iamapj@yahoo.com</p>
                                            <span className='inline-flex smMax:ml-0 smMax:mt-1 ml-2 bg-primary-orange bg-opacity-10 rounded-[4px] text-body px-2 py-1 capitalize'>
                                                pending
                                            </span>
                                        </div>
                                        <div className="w-2/12 smMax:w-4/12 mr-auto">
                                            <MultiSelectCheckBox
                                                options={['Admin', 'Member']}
                                                customOption={false}
                                                mode='single'
                                                hideSearch={true}
                                                placeholder='Select'
                                                inputClass='border-0 focus:bg-white'
                                                value={'Admin'}
                                            />
                                        </div>
                                        <button className="text-body text-2xl text-right">
                                            <DeleteIcon />
                                        </button>
                                    </div>

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