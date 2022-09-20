import { Avatar, Dropdown, Switch } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiDotsVerticalRounded, BiPlus, BiSearch } from 'react-icons/bi';
import AuthModal from '../auth-modal/AuthModal';
import { NotificationIcon, Off, Settings, User } from '../icons';

const DefaultMenu = () => (
    <div className='w-[232px] py-3 rounded-lg drop-shadow-md bg-white px-4'>
        <ul>
            <li>
                <a href="#" className='text-sm font-normal text-primary flex py-3 hover:text-primary-purple'>About Giverise</a>
            </li>
            <li>
                <a href="#" className='text-sm font-normal text-primary flex py-3 hover:text-primary-purple'>How it works</a>
            </li>
            <li>
                <a href="#" className='text-sm font-normal text-primary flex py-3 hover:text-primary-purple'>FAQs</a>
            </li>
            <li>
                <a href="#" className='text-sm font-normal text-primary flex py-3 hover:text-primary-purple border-b border-[#EDF2F7]'>Tax & My Donations</a>
            </li>
            <li>
                <a href="#" className='text-sm font-normal text-primary flex py-3 hover:text-primary-purple'>Investors Relation</a>
            </li>
        </ul>
    </div>
);

const ProfileMenu = () => {
    return (
        <div className='w-[232px] py-3 rounded-lg drop-shadow-md bg-white px-4'>
            <div className='py-3 border-b border-[#EDF2F7]'>
                <h4 className='text-base font-medium text-primary mb-2'>Alesia Karapova</h4>
                <div className="flex items-center">
                    <Link href={"/"}>
                        <a>
                            <img src="/images/logo-icon.png" alt="logo-icon" className="max-w-full" />
                        </a>
                    </Link>
                    <p className='ml-1 text-secondary text-xs'>400 Giverise Points</p>
                </div>
            </div>
            <ul>
                <li>
                    <Link href={"/profile"}>
                        <a className='text-sm font-normal text-primary flex py-3 hover:text-primary-purple items-center'>
                            <span className='mr-3 text-secondary text-xl hover:text-primary-purple'><User /></span>
                            Your Profile
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={"/profile/settings"}>
                        <a className='text-sm font-normal text-primary flex items-center py-3 hover:text-primary-purple'>
                            <span className='mr-3 text-secondary text-xl hover:text-primary-purple'><Settings /></span>
                            Account settings
                        </a>
                    </Link>
                </li>
                <li>
                    <a href="#" className='text-sm font-normal text-primary flex items-center py-3 hover:text-primary-purple border-b border-[#EDF2F7]'>
                        <span className='mr-3 text-secondary text-xl hover:text-primary-purple'><Off /></span>
                        Log out
                    </a>
                </li>
                <li className='text-sm font-normal text-primary flex py-3 hover:text-primary-purple justify-between'>
                    Dark mode
                    <Switch className='switch-custom-color' />
                </li>
            </ul>
        </div>
    );
}

const DropdownMenu = ({ children, menu }: { children: React.ReactNode, menu: React.ReactElement }) => {
    return (
        <Dropdown overlay={menu} trigger={['click']} placement='bottomLeft' overlayClassName='header-dropdown-overlay' >
            {children}
        </Dropdown >
    );
};


const HeaderMenu = ({ hideActions = false }) => {
    const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);

    const openAuthModal = () => {
        setIsOpenAuthModal(true);
    }

    const closeAuthModal = () => {
        setIsOpenAuthModal(false);
    }

    return (
        <>
            <div className={`${hideActions ? 'justify-center' : ''} bg-white px-8 h-[70px] flex items-center border-b border-primary border-opacity-[0.08] smMax:bg-[#F8F9FC] smMax:h-[116px] smMax:border-0 smMax:items-end smMax:pb-6 smMax:px-5 xs:px-4`}>
                <Link href={"/"}>
                    <a>
                        <img src='/images/logo.png' className='max-w-full object-contain' />
                    </a>
                </Link>
                {!hideActions ? (
                    <>
                        <div className="ml-12 relative w-[340px] mdMax:hidden">
                            <input placeholder='Search Giverise' className='text-sm text-body w-full rounded-lg h-[38px] px-4 border border-[#E2E4E8] box-border focus:outline-none' />
                            <span className='absolute top-2.5 right-4 text-body text-xl'>
                                <BiSearch />
                            </span>
                        </div>
                        <div className="flex items-center ml-auto gap-4">
                            <Link href={"/awards/create"}>
                                <a className='bg-white rounded-md border hover:text-primary border-primary border-opacity-[0.15] flex items-center px-4 h-10 text-base font-medium hover:border-primary-purple hover:text-primary-purple-purple smMax:hidden'>
                                    <span className='mr-2'><BiPlus /></span>
                                    Create award
                                </a>
                            </Link>
                            <button onClick={openAuthModal} className='bg-primary-purple rounded-md flex items-center px-8 hover:text-white h-10 text-base font-medium text-white smMax:hidden'>
                                Login
                            </button>
                            <DropdownMenu menu={<ProfileMenu />}>
                                <Avatar src="/images/dummy/profile.jpg" size={24} className="bg-[#FAFBFC] object-cover cursor-pointer" />
                            </DropdownMenu>
                            <button className='relative'>
                                <NotificationIcon />
                                <span className='absolute -top-1 -right-1 w-3 h-3 rounded-full bg-error text-white text-[8px]'>
                                    4
                                </span>
                            </button>
                            <DropdownMenu menu={<DefaultMenu />}>
                                <button className='text-xl hover:text-primary-purple'>
                                    <BiDotsVerticalRounded />
                                </button>
                            </DropdownMenu>
                        </div>
                    </>
                ) : null}
            </div>
            <AuthModal visible={isOpenAuthModal} onClose={closeAuthModal} />
        </>
    )
}

export default HeaderMenu;