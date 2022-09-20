import { Avatar } from 'antd';
import React from 'react'
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { HiBadgeCheck } from 'react-icons/hi'
import { Bag, DotElipse, DotGroup, Home, MapMarker, Mog, Mouse, Note } from '../icons';
import Link from 'next/link';

interface LinkItemProps {
    text?: string;
    icon?: React.ReactNode;
    active?: boolean;
    containerClass?: string;
    className?: string;
    href?: string;
}
export const LinkItem = ({ text = '', icon = undefined, active = false, containerClass = '', className = '', href = '' }: LinkItemProps) => (
    <li className={`py-4 group relative rounded-[4px] block ${active ? 'bg-primary-purple bg-opacity-5' : 'hover:bg-primary-purple hover:bg-opacity-5'} ${containerClass}`}>
        <Link href={href}>
            <a className={`flex items-center text-sm font-medium pl-4  ${active ? 'text-primary-purple hover:text-primary-purple' : 'group-hover:text-primary-purple text-primary'} ${className}`}>
                {icon && <span className='mr-3 text-2xl'>{icon}</span>}

                <span className='mdMax:hidden'>
                    {text}
                </span>
            </a>
        </Link>
        <div className={`absolute left-0 top-3 w-[3px] bg-primary-purple rounded-r-full ${active ? 'h-8' : 'h-[0px] group-hover:h-8'}`} />
    </li>
);

const SidebarLeft = () => {
    return (
        <div className='w-[240px] mdMax:w-[99px] mdMax:ml-6 mdMax:bg-white mdMax:border-r mdMax:border-opacity-[0.08] mdMax:py-6 smMax:hidden'>
            <ul className='lg:w-full mdMax:w-[51px] mdMax:mx-auto'>
                <LinkItem text='For You' icon={<Home />} active />
                <LinkItem text='Following' icon={<DotGroup />} />
                <LinkItem text='Filters' icon={<TbAdjustmentsHorizontal />} />
            </ul>

            <hr className='border-primary border-opacity-[0.08] mt-6 mdMax:w-[51px] mx-auto' />
            <h3 className='text-sm font-medium text-secondary px-4 uppercase mt-6 mb-4 mdMax:hidden'>Popular causes</h3>

            <ul className='lg:w-full mdMax:w-[51px] mdMax:mx-auto'>
                <LinkItem text='Education' icon={<Note />} />
                <LinkItem text='Religion' icon={<DotGroup />} />
                <LinkItem text='Study abroad' icon={<MapMarker />} />
                <LinkItem text='STEM' icon={<Bag />} />
                <LinkItem text='Entrepreneurship' icon={<Mouse />} />
                <LinkItem text='Exams' icon={<Mog />} />
            </ul>

            <button className='hidden mdMax:inline-block text-2xl mt-6 ml-10'>
                <DotElipse />
            </button>
            <a className='px-4 inline-flex text-sm text-primary hover:text-primary-purple font-medium mt-2 mdMax:hidden'>View all</a>
            <hr className='border-primary border-opacity-[0.08] mt-6 mdMax:w-[51px] mx-auto mdMax:hidden' />
            <h3 className='text-sm font-medium text-secondary uppercase my-6 mdMax:hidden'>suggested donors</h3>

            <div className="w-full mdMax:hidden">
                <div className="flex items-center mb-4">
                    <Avatar size={32} src="/images/dummy/profile.jpg" />
                    <div className='ml-2'>
                        <h3 className='flex items-center font-semibold text-sm text-[#17172]'>
                            iamapj
                            <span className='ml-2 text-primary-purple'>
                                <HiBadgeCheck />
                            </span>
                        </h3>
                        <p className='text-secondary text-xs font-normal'>Emmanuel Iroko</p>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <Avatar size={32} src="/images/dummy/profile.jpg" />
                    <div className='ml-2'>
                        <h3 className='flex items-center font-semibold text-sm text-[#17172]'>
                            cuppymusic
                            <span className='ml-2 text-primary-purple'>
                                <HiBadgeCheck />
                            </span>
                        </h3>
                        <p className='text-secondary text-xs font-normal'>Cuppy Otedola</p>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <Avatar size={32} src="/images/dummy/profile.jpg" />
                    <div className='ml-2'>
                        <h3 className='flex items-center font-semibold text-sm text-[#17172]'>
                            selenaofficial
                            <span className='ml-2 text-primary-purple'>
                                <HiBadgeCheck />
                            </span>
                        </h3>
                        <p className='text-secondary text-xs font-normal'>Selena Gomez</p>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <Avatar size={32} src="/images/dummy/profile.jpg" />
                    <div className='ml-2'>
                        <h3 className='flex items-center font-semibold text-sm text-[#17172]'>
                            messi
                            <span className='ml-2 text-primary-purple'>
                                <HiBadgeCheck />
                            </span>
                        </h3>
                        <p className='text-secondary text-xs font-normal'>Lionel Messi</p>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <Avatar size={32} src="/images/dummy/profile.jpg" />
                    <div className='ml-2'>
                        <h3 className='flex items-center font-semibold text-sm text-[#17172]'>
                            iambarack
                            <span className='ml-2 text-primary-purple'>
                                <HiBadgeCheck />
                            </span>
                        </h3>
                        <p className='text-secondary text-xs font-normal'>Barack Obama</p>
                    </div>
                </div>
                <a className='inline-flex text-sm text-primary-purple hover:text-primary-purple font-medium'>See all</a>
                <hr className='border-primary border-opacity-[0.08] mt-6' />
                <h3 className='text-sm font-medium text-secondary uppercase my-6'>Browse</h3>
                <div className="flex items-center gap-x-2 gap-y-4 flex-wrap w-full">
                    <a href="#" className='text-body text-base font-normal tracking-[0.95px]'>About</a>
                    <a href="#" className='text-body text-base font-normal tracking-[0.95px]'>How it works</a>
                    <a href="#" className='text-body text-base font-normal tracking-[0.95px]'>Benefits</a>
                    <a href="#" className='text-body text-base font-normal tracking-[0.95px]'>Mission</a>
                    <a href="#" className='text-body text-base font-normal tracking-[0.95px]'>Career</a>
                    <a href="#" className='text-body text-base font-normal tracking-[0.95px]'>Pricing</a>
                    <a href="#" className='text-body text-base font-normal tracking-[0.95px]'>FAQs</a>
                </div>
            </div>
        </div>
    )
}

export default SidebarLeft;