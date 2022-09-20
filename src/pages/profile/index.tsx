import { Avatar, Progress } from 'antd';
import React from 'react'
import { BsPencil } from 'react-icons/bs';
import { FaEdit, FaMapMarked, FaMapMarker, FaMapMarkerAlt, FaMapPin, FaMarker, FaPen, FaPenAlt } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { HiBadgeCheck } from 'react-icons/hi';
import { AwardPost, FeedInspiration } from '..';
import { HeaderMenu } from '../../components';
import { CalendarIcon, Edit, EditPen, Gallery, Note, PresentationIcon } from '../../components/icons';


const WinnerGallery = () => {
    return (
        <div className='bg-white rounded-lg mb-4'>
            <div className="border-b border-primary-stroke p-4 mb-2 flex items-center justify-between">
                <h4 className='text-primary font-medium text-base'>Award Winners</h4>
                <a href="#" className='text-primary-purple text-sm'>See All</a>
            </div>
            <div className="p-3 grid grid-cols-3 gap-2">
                <div>
                    <img src='/images/dummy/profile-2.jpg' className='object-cover rounded-xl max-w-full h-[81px] w-[81px]' />
                    <p className='text-xs text-primary mt-2 font-medium'>Emmanuel</p>
                </div>
                <div>
                    <img src='/images/dummy/profile-2.jpg' className='object-cover rounded-xl max-w-full h-[81px] w-[81px]' />
                    <p className='text-xs text-primary mt-2 font-medium'>Emmanuel</p>
                </div>
                <div>
                    <img src='/images/dummy/profile-2.jpg' className='object-cover rounded-xl max-w-full h-[81px] w-[81px]' />
                    <p className='text-xs text-primary mt-2 font-medium'>Emmanuel</p>
                </div>
                <div>
                    <img src='/images/dummy/profile-2.jpg' className='object-cover rounded-xl max-w-full h-[81px] w-[81px]' />
                    <p className='text-xs text-primary mt-2 font-medium'>Emmanuel</p>
                </div>
                <div>
                    <img src='/images/dummy/profile-2.jpg' className='object-cover rounded-xl max-w-full h-[81px] w-[81px]' />
                    <p className='text-xs text-primary mt-2 font-medium'>Emmanuel</p>
                </div>
                <div>
                    <img src='/images/dummy/profile-2.jpg' className='object-cover rounded-xl max-w-full h-[81px] w-[81px]' />
                    <p className='text-xs text-primary mt-2 font-medium'>Emmanuel</p>
                </div>
            </div>
        </div>
    );
}


import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import Link from 'next/link';

const Profile = () => {
    const breakpoint = useBreakpoint(true);
    return (
        <>
            <HeaderMenu hideActions={breakpoint.xs && !breakpoint.md} />
            <div className="sm:mt-6 lg:w-[906px] w-full sm:px-4 mx-auto smMax:bg-white">
                <div className="grid grid-cols-3 gap-[30px] smMax:grid-cols-1">
                    <div className='col-span-2 smMax:col-span-full'>
                        {/* it will show progress bar for mobile screen only */}
                        <div className='bg-white rounded-lg p-4 md:hidden'>
                            <h3 className='text-primary font-medium text-sm'>Complete Your Profile</h3>
                            <Progress strokeColor={"#6154E7"} percent={70} />
                        </div>

                        <div className='sm:rounded-lg overflow-hidden relative bg-white mb-5'>
                            <div className='h-[192px]'>
                                <img src="/images/dummy/profile-cover.jpg" alt="cover-photo" className='object-cover w-full h-full sm:rounded-t-lg' />
                                <button className='bg-white rounded-[4px] absolute top-4 right-4 flex items-center px-3 py-2 text-sm font-medium'>
                                    <span className='mr-2 text-2xl'><EditPen /></span> Edit Cover Photo
                                </button>
                            </div>
                            <div className='flex mdMax:flex-col px-5 border-b border-[#F1F1F5] mb-4'>
                                <div className='mdMax:flex mdMax:justify-between mdMax:w-full mdMax:items-center '>
                                    <div className='-mt-12  relative'>
                                        <Avatar src="/images/dummy/profile.jpg" size={120} className="border-[3px] border-white" />
                                        <button className='absolute text-2xl top-12 left-12 text-white'><Gallery /></button>
                                    </div>
                                    <Link href="/profile/settings">
                                        <a className='hidden border border-primary-stroke rounded-[4px] mdMax:flex items-center px-3 py-2 text-sm font-medium'>
                                            <span className='mr-2 text-2xl'><EditPen /></span>
                                            Edit Profile
                                        </a>
                                    </Link>
                                </div>
                                <div className='lg:ml-4 w-full py-4'>
                                    <div className="flex items-start">
                                        <div className='lg:mr-auto'>
                                            <div className='flex items-center'>
                                                <h3 className="text-2xl text-primary font-semibold">Emmanuel Iroko</h3>
                                                <span className='text-2xl text-primary-purple ml-1'><HiBadgeCheck /></span>
                                            </div>
                                            <p className='text-primary-purple text-sm'>@iamapj</p>
                                            <div className="flex items-center text-secondary text-sm">
                                                <FiMapPin />
                                                <span>Prosper, TX</span>
                                            </div>
                                        </div>
                                        <Link href={"/profile/settings"}>
                                            <a className='mdMax:hidden border border-primary-stroke rounded-[4px] flex items-center px-3 py-2 text-sm font-medium'>
                                                <span className='mr-2 text-2xl'><EditPen /></span>
                                                Edit Profile
                                            </a>
                                        </Link>
                                    </div>
                                    <div className='flex items-center justify-between my-4'>
                                        <div className='text-primary flex items-center smMax:flex-col'>
                                            <h2 className='text-base font-bold text-primary'>20</h2>
                                            <p className='text-base text-secondary ml-1'>Awards</p>
                                        </div>

                                        <div className='text-primary flex items-center smMax:flex-col'>
                                            <h2 className='text-base font-bold text-primary'>$3,500 </h2>
                                            <p className='text-base text-secondary ml-1'>Total Awards</p>
                                        </div>

                                        <div className='text-primary flex items-center smMax:flex-col'>
                                            <h2 className='text-base font-bold text-primary'>800k</h2>
                                            <p className='text-base text-secondary ml-1'>Followers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 flex gap-[30px] items-center smMax:overflow-x-auto hide-scrollbar-sm">
                                <button className='text-sm text-primary border-b-2 border-primary-purple pb-2 smMax:min-w-max'>Awards</button>
                                <button className='text-sm text-secondary pb-2 smMax:min-w-max'>About</button>
                                <button className='text-sm text-secondary pb-2 smMax:min-w-max'>Followers</button>
                                <button className='text-sm text-secondary pb-2 smMax:min-w-max'>Past Winners</button>
                                <button className='text-sm text-secondary pb-2 smMax:min-w-max'>Activities</button>
                            </div>
                        </div>
                        <FeedInspiration />
                        <div className='hidden smMax:block'>
                            <WinnerGallery />
                        </div>
                        <AwardPost isAwarded={true} image="/images/dummy/post_1.jpg" />
                        <AwardPost image="/images/dummy/post_2.jpg" />
                        <AwardPost image="/images/dummy/post_3.jpg" />
                    </div>

                    <div className='col-span-1 smMax:col-span-full smMax:hidden'>
                        <div className='bg-white rounded-lg p-4 mb-4'>
                            <h3 className='text-primary font-medium text-sm'>Complete Your Profile</h3>
                            <Progress strokeColor={"#6154E7"} percent={70} />
                        </div>
                        <div className='bg-white rounded-lg mb-4'>
                            <div className="border-b border-primary-stroke p-4 mb-3">
                                <h4 className='text-primary font-medium text-base'>About Me</h4>
                            </div>
                            <div className="p-4">
                                <p className='text-secondary text-sm leading-[21px] mb-4'>
                                    To honor the historical bonds and contributions between Americans and Filipinos and to advance the next generation of Filipino-Americans into a new era of citizenship.
                                </p>
                                <div className="flex items-center gap-3 mb-2 text-sm text-primary">
                                    <span className='text-xl'><FiMapPin /></span>
                                    <span>Yogyakarta, ID</span>
                                </div>
                                <div className="flex items-center gap-3 mb-2 text-sm text-primary">
                                    <span className='text-xl'><PresentationIcon /></span>
                                    <span>facebook.com</span>
                                </div>
                                <div className="flex items-center gap-3 mb-2 text-sm text-primary">
                                    <span className='text-xl'><CalendarIcon /></span>
                                    <span>Joined June 2022</span>
                                </div>
                            </div>
                        </div>
                        <WinnerGallery />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;