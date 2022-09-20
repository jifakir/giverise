import { Avatar, Modal, Progress } from 'antd';
import React, { useState } from 'react'
import { FiBarChart2, FiCornerUpLeft, FiUsers } from 'react-icons/fi';
// import { HiCheckBadge } from 'react-icons/hi';
import { HeaderMenu, SidebarLeft } from '../../components';
import { FaPlus, FaRegHeart } from 'react-icons/fa';
import { RiFacebookCircleLine, RiTwitterLine } from 'react-icons/ri';
import { TbBrandLinkedin } from 'react-icons/tb';
import { Copy, MapMarker, Note } from '../../components/icons';
import { TagButton } from '..';
import { HiBadgeCheck } from 'react-icons/hi';
import Link from 'next/link';


const RightSideBar = ({ onApply, onContribute }: { onApply?: () => void, onContribute?: () => void }) => {
    return (
        <>
            <div className='bg-white rounded-lg p-10 mdMax:p-5 w-full mb-5'>
                <div className="flex items-center text-xs text-[#2CAEB7] capitalize">
                    <div className='w-[7px] h-[7px] rounded-full bg-[#2CAEB7] mr-1' />
                    open
                </div>
                <h2 className='text-primary-green text-[37px] font-bold'>$20,000</h2>
                <p className='text-sm text-primary'>4 winners, $5,000 each</p>
                <hr className='border-primary-stroke mt-2 mb-4' />
                <div className="flex items-center justify-between text-secondary text-sm">
                    <p>12 donors</p>
                    <p><span className='font-medium text-error'>2</span> days to go</p>
                </div>
                <Progress showInfo={false} percent={60} strokeColor="#2CAEB7" />
                <div className="flex items-center justify-between text-secondary text-sm">
                    <p className='text-body font-semibold'>$16,000 of $20,000</p>
                    <p>80.0%</p>
                </div>
                <div className='smMax:fixed smMax:bottom-0 smMax:left-0 smMax:bg-white smMax:w-full smMax:px-5'>
                    <button onClick={onApply} className='flex items-center w-full h-[53px] rounded-[4px] bg-primary-purple text-white text-base font-medium justify-center my-4'>
                        <span className='mr-2 text-lg'><Note /></span> Apply
                    </button>
                    <button onClick={onContribute} className='flex items-center w-full h-[53px] rounded-[4px] border-2 border-primary text-base font-medium text-primary justify-center'>
                        Contribute
                    </button>
                </div>
            </div>
            <div className='rounded-lg bg-white overflow-hidden'>
                <div>
                    <img src="/images/dummy/profile-cover.jpg" alt="profile cover" className='max-w-full w-full rounded-t-lg object-cover h-[140px]' />
                </div>
                <div className='-mt-5 text-center px-10 mdMax:px-5 pb-5 smMax:pb-28'>
                    <div className='inline-flex w-14 h-14 items-center justify-center rounded-full border-2 border-primary-purple border-opacity-30'>
                        <Avatar size={54} className="bg-primary-purple text-xs font-medium text-white">
                            KB
                        </Avatar>
                    </div>
                    <div className="flex justify-center items-center">
                        <h2 className='font-medium text-sm text-primary'>
                            Dan Ferguson
                        </h2>
                        <span className='ml-1 text-primary-purple'>
                            <HiBadgeCheck />
                        </span>
                    </div>
                    <p className='text-center text-xs text-secondary'>
                        @iamapj
                    </p>
                    <div className='flex items-center justify-between border-y border-primary-stroke my-4 py-4'>
                        <div className='text-primary'>
                            <h2 className='text-lg font-bold text-primary'>20</h2>
                            <p className='text-xs'>Awards</p>
                        </div>
                        <div className='h-[15px] w-[1px] bg-primary-stroke' />
                        <div className='text-primary'>
                            <h2 className='text-lg font-bold text-primary'>$3,500 </h2>
                            <p>Total Awards</p>
                        </div>
                        <div className='h-[15px] w-[1px] bg-primary-stroke' />
                        <div className='text-primary'>
                            <h2 className='text-lg font-bold text-primary'>800k</h2>
                            <p>Followers</p>
                        </div>
                    </div>
                    <h2 className='text-sm font-bold text-primary'>Mission</h2>
                    <p className='text-secondary text-xs leading-5'>
                        To honor the historical bonds and contributions between Americans and Filipinos and to advance the next generation of Filipino-Americans into a new era of citizenship and excellence.
                    </p>
                    <button className='mx-auto flex my-6 items-center justify-center border border-primary-purple rounded-[4px] h-[36px] w-[102px] text-base font-medium text-primary-purple'>
                        <span className='mr-2'>
                            <FaPlus />
                        </span>
                        Follow
                    </button>
                    <a href="#" className='text-xs font-medium text-primary'>View full profile</a>
                </div>
            </div>
        </>
    );
}

const ContributeModal = ({ visible = false, onClose, onContinue }: { visible?: boolean, onClose?: () => void, onContinue?: () => void }) => {
    return (
        <Modal visible={visible} footer={null} closable={false} width={380} bodyStyle={{ padding: 0 }}>
            <div className='p-5'>
                <h3 className='mb-4 border-b border-primary-stroke pb-4 text-xl font-bold text-primary relative after:absolute after:left-0 after:content-[""] after:w-[103px] after:h-[2px] after:bg-primary-purple after:bottom-0'>
                    Contribute
                </h3>
                <div className='rounded-lg bg-primary-purple bg-opacity-10 p-4 mb-4'>
                    <div className="flex items-center">
                        <img src="/images/dummy/game-scene.jpg" alt="game scene" className='rounded-lg object-cover w-16 h-16' />
                        <div className='ml-4'>
                            <h2 className='text-sm font-medium text-primary'>
                                Entreprenurs creating the NFT market
                            </h2>
                            <div className="flex items-center gap-1">
                                <Avatar size={16} />
                                <span className='text-[10px] text-secondary'>Organized by</span>
                                <h3 className='font-semibold text-primary text-sm'>iamapj</h3>
                                <span className='text-primary-purple'><HiBadgeCheck /></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full mb-4">
                    <button className='hover:bg-primary-purple hover:text-white h-11 justify-center inline-flex items-center border border-primary-stroke rounded-[5px] text-sm font-normal text-primary'>
                        $25
                    </button>
                    <button className='hover:bg-primary-purple hover:text-white h-11 justify-center  inline-flex items-center border border-primary-stroke rounded-[5px] text-sm font-normal text-primary'>
                        $50
                    </button>
                    <button className='bg-primary-purple text-white h-11  inline-flex justify-center items-center border border-primary-stroke rounded-[5px] text-sm font-normal'>
                        $100
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full">
                    <button className='hover:bg-primary-purple hover:text-white h-11 justify-center col-span-1 inline-flex items-center border border-primary-stroke rounded-[5px] text-sm font-normal text-primary'>
                        $150
                    </button>
                    <input className='border border-primary-stroke col-span-2 h-11 rounded-[5px] px-3 focus:outline-none text-center text-sm text-primary placeholder:text-primary' placeholder='Other amount' />
                </div>
                <div className="flex items-center gap-4 my-4">
                    <button onClick={onContinue} className='w-[84px] h-9 rounded-[4px] inline-grid place-items-center text-white font-medium text-sm bg-primary-purple'>
                        Continue
                    </button>
                    <button onClick={onClose} className='text-primary font-medium text-sm border border-primary px-3 h-9 rounded-[4px]'>
                        Cancel
                    </button>
                </div>
                <p className='text-secondary text-xs'>
                    This action is irreversible. Kindly ensure that the right winner has been selected
                </p>
            </div>
        </Modal>
    );
}


const AwardDetails = () => {
    const [showPointBanner, setShowPointBanner] = useState(false);
    const [showContributeModal, setShowContributeModal] = useState(false);

    return (
        <>
            <HeaderMenu />
            <div className="w-[1128px] xl:px-0 md:px-4 mdMax:px-4 max-w-full mx-auto py-8">
                <div className="flex justify-between mb-8">
                    <Link href="/">
                        <a className='bg-white rounded-[4px] px-3 h-[37px] flex items-center text-sm font-medium text-primary'>
                            <span className='mr-2'>
                                <FiCornerUpLeft />
                            </span>
                            Back
                        </a>
                    </Link>
                    <div className="flex items-center gap-4 text-xl text-primary">
                        <p className='text-base text-body'>Share</p>
                        <a href="#" className='hover:text-primary'><RiFacebookCircleLine /></a>
                        <a href="#" className='hover:text-primary'><RiTwitterLine /></a>
                        <a href="#" className='hover:text-primary'><TbBrandLinkedin /></a>
                        <a href="#" className='hover:text-primary'><Copy /></a>
                    </div>
                </div>
                {showPointBanner ? (
                    <div className='bg-primary-purple bg-opacity-5 border border-primary-purple p-5 rounded-lg mb-8 flex item-center'>
                        <img src='/images/logos/house-2.svg' className='max-w-full object-contain' />
                        <div className='ml-5'>
                            <h2 className='font-bold text-base text-primary'>400 Giverise Points needed</h2>
                            <p className='text-xs font-normal text-primary'>You must have at least 400 Giverise Points to apply! Complete your profile to earn more Giverise points.</p>
                        </div>
                    </div>
                ) : null}
                <div className='grid grid-cols-5 gap-7 mdMax:gap-4 w-full smMax:grid-cols-1'>
                    <div className='col-span-3 smMax:col-span-full'>
                        <div className="bg-white rounded-lg py-4 px-10 mdMax:px-5">
                            <h2 className='text-primary xl:text-[34px] md:text-3xl font-semibold my-4 smMax:text-2xl'>Entreprenurs creating the NFT market in Nigeria awards in the next decade</h2>
                            <img src='/images/dummy/post_3.jpg' alt='post_' className='rounded-lg w-full h-[330px]' />
                            <button className='text-xl text-primary hover:text-error flex items-center my-4'>
                                <FaRegHeart />
                                <span className='ml-2 text-sm font-normal text-primary'>23.5k</span>
                            </button>
                            <div className="flex items-center gap-4 smMax:flex-wrap smMax:gap-y-2">
                                <TagButton text='Nairobi, Kenya' icon={<MapMarker />} />
                                <TagButton text='Undergraduate' icon={<FiBarChart2 />} />
                                <TagButton text='4 Winners' icon={<FiUsers />} />
                            </div>
                            <h3 className='mt-8 mb-4 text text-base font-medium text-primary'>Eligibility requirements</h3>

                            <div className='flex items-center mb-2'>
                                <span className='text-primary-purple'>
                                    <HiBadgeCheck />
                                </span>
                                <p className='w-[120px] ml-2 mr-4 text-xs font-noraml text-primary'>Education level:</p>
                                <h5 className='text-secondary text-sm font-normal'>Undergraduate students</h5>
                            </div>
                            <div className='flex items-center mb-2'>
                                <span className='text-primary-purple'>
                                    <HiBadgeCheck />
                                </span>
                                <p className='w-[120px] ml-2 mr-4 text-xs font-noraml text-primary'>Gender</p>
                                <h5 className='text-secondary text-sm font-normal'>Female</h5>
                            </div>
                            <div className='flex items-center mb-2'>
                                <span className='text-primary-purple'>
                                    <HiBadgeCheck />
                                </span>
                                <p className='w-[120px] ml-2 mr-4 text-xs font-noraml text-primary'>Field of Study</p>
                                <h5 className='text-secondary text-sm font-normal'>STEM</h5>
                            </div>
                            <div className='flex items-center mb-2'>
                                <span className='text-primary-purple'>
                                    <HiBadgeCheck />
                                </span>
                                <p className='w-[120px] ml-2 mr-4 text-xs font-noraml text-primary'>School</p>
                                <h5 className='text-secondary text-sm font-normal'>Obafemi Awolowo University</h5>
                            </div>
                            <div className='flex items-center mb-2'>
                                <span className='text-primary-purple'>
                                    <HiBadgeCheck />
                                </span>
                                <p className='w-[120px] ml-2 mr-4 text-xs font-noraml text-primary'>Background</p>
                                <h5 className='text-secondary text-sm font-normal'>Nigerian Nationality</h5>
                            </div>

                            <div className="my-8 px-10 py-5 rounded-lg bg-primary-purple bg-opacity-5">
                                <div className="flex items-center justify-between">
                                    <h4 className='text-primary-purple font-medium text-base'>Essay Topic</h4>
                                    <p className='text-primary text-sm'>400 – 600 words</p>
                                </div>
                                <p className='text-secondary text-base font-normal leading-6 mt-4'>
                                    Please write a brief autobiographical synopsis about your experience in Nigeria or how recent primary election affected you or your family. Additionally, why are you interested in pursuing a STEM degree?
                                </p>
                            </div>
                            <p className='text-base text-secondary font-normal leading-6'>
                                Give today to deliver essential school supplies for students in need around the world — including right here in the United States. Thanks to corporate donations, your gift will multiply 4 times in impact to distribute resources like teaching materials, textbooks, sports equipment, PPE, remote learning tools like earbuds, and supply packs with basics like notebooks, pencils, crayons, and more.
                                <a href="#" className='font-bold'>View more</a>
                            </p>

                            <hr className='border-[#F1F0FF] my-10' />
                            <div className="flex items-center  mb-5 justify-between">
                                <h3 className='text-base font-medium text-primary'>Winners and Finalists</h3>
                                <p className='text-base font-normal text-body'>July 2022</p>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Avatar size={40} src="/images/dummy/profile-2.jpg" />
                                    <div className="ml-2">
                                        <h4 className='font-medium text-sm text-primary'>
                                            Emmanuel Iroko
                                        </h4>
                                        <p className='text-secondary text-xs font-normal'>1ST place</p>
                                    </div>
                                </div>
                                <p className='text-xs text-body font-normal lg:w-auto sm:w-5/12 smMax:w-3/12 xs:w-1/12 text-ellipsis truncate text-center'>
                                    Lagos State University, Lagos Nigeria
                                </p>
                                <a href="#" className='text-xs font-normal text-primary-purple'>View Essay</a>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Avatar size={40} src="/images/dummy/profile-2.jpg" />
                                    <div className="ml-2">
                                        <h4 className='font-medium text-sm text-primary'>
                                            Sarah Greg
                                        </h4>
                                        <p className='text-secondary text-xs font-normal'>2nd place</p>
                                    </div>
                                </div>
                                <p className='text-xs text-body font-normal lg:w-auto sm:w-5/12 smMax:w-3/12 xs:w-1/12 text-ellipsis truncate text-center'>
                                    Lagos State University, Lagos Nigeria
                                </p>
                                <a href="#" className='text-xs font-normal text-primary-purple'>View Essay</a>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <Avatar size={40} src="/images/dummy/profile-2.jpg" />
                                    <div className="ml-2">
                                        <h4 className='font-medium text-sm text-primary'>
                                            James Allen
                                        </h4>
                                        <p className='text-secondary text-xs font-normal'>3rd place</p>
                                    </div>
                                </div>
                                <p className='text-xs text-body font-normal lg:w-auto sm:w-5/12 smMax:w-3/12 xs:w-1/12 text-ellipsis truncate text-center'>
                                    Lagos State University, Lagos Nigeria
                                </p>
                                <a href="#" className='text-xs font-normal text-primary-purple'>View Essay</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 smMax:col-span-full'>
                        <RightSideBar
                            onApply={() => setShowPointBanner(!showPointBanner)}
                            onContribute={() => setShowContributeModal(!showContributeModal)}
                        />
                    </div>
                </div>
            </div>
            <ContributeModal
                visible={showContributeModal}
                onClose={() => setShowContributeModal(false)}
                onContinue={() => window.location.href = `${process.env.NEXT_PUBLIC_CAMPAING_URL}/checkout`}
            />
        </>
    )
}

export default AwardDetails;