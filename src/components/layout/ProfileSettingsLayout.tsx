import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { BsPerson, BsArrowLeft } from 'react-icons/bs';
import { FaAngleLeft } from 'react-icons/fa';
import { Bag, Lock, Mog, Mouse, Note, NotificationIcon, PaymentIcon, Settings, Stars } from '../icons';
import NotficationIcon from '../icons/NotificationIcon';
import HeaderMenu from '../menu/HeaderMenu';
import { LinkItem } from '../menu/SidebarLeft';

interface IProps {
    children: React.ReactNode,
    title?: string;
}

const routes = [
    {
        icon: <BsPerson />,
        path: '/profile/settings',
        title: 'Personal details',
    },
    {
        icon: <Settings />,
        path: '/profile/settings/accounts',
        title: 'Accounts',
    },
    {
        icon: <Note />,
        path: '/profile/settings/tax',
        title: 'Tax Information',
    },
    {
        icon: <Stars />,
        path: '/profile/settings/earn-point',
        title: 'Earn Giverise Points',
    },
    {
        icon: <Lock />,
        path: '/profile/settings/security',
        title: 'Security',
    },
    {
        icon: <PaymentIcon />,
        path: '/profile/settings/payment',
        title: 'Payment',
    },
    {
        icon: <Bag />,
        path: '/profile/settings/parents',
        title: 'Parent Info',
    },
    {
        icon: <Mouse />,
        path: '/profile/settings/team',
        title: 'Your team',
    },
    {
        icon: <Mog />,
        path: '/profile/settings/preference',
        title: 'Feed Preference',
    },
    {
        icon: <NotficationIcon />,
        path: '/profile/settings/notifications',
        title: 'Notification',
    },
];


interface LinkItemProps {
    text?: string;
    icon?: React.ReactNode;
    active?: boolean;
    containerClass?: string;
    className?: string;
    href?: string;
}
export const LinkItemMobile = ({ text = '', icon = undefined, active = false, containerClass = '', className = '', href = '' }: LinkItemProps) => (
    <li className={`py-4 group relative block ${containerClass}`}>
        <Link href={href}>
            <a className={`flex items-center text-sm font-medium  text-primary} ${className}`}>
                {icon && <span className='mr-3 text-2xl'>{icon}</span>}
                <span className=''>
                    {text}
                </span>
            </a>
        </Link>
    </li>
);

const ProfileSettingsLayout = ({ children, title }: IProps) => {
    const router = useRouter();
    const breakpoint = useBreakpoint(true);
    const renderMenu = (breakpoint.xs && !breakpoint.md) && router.pathname === routes[0].path && !router.query?.view;
    return (
        <>
            <HeaderMenu hideActions={breakpoint.xs && !breakpoint.md} />
            <div className='flex xl:w-[1032px] w-full mx-auto sm:mt-10 items-start xl:px-0 md:px-4 md:gap-4'>
                <div className='xl:w-[240px] lg:w-3/12 md:w-2/12 mdMax:bg-white lg:py-0 md:py-4 smMax:hidden'>
                    <h2 className='lg:text-[32px] md:text-2xl font-semibold text-primary lg:px-0 md:px-2'>
                        Settings
                    </h2>
                    <p className='lg:text-sm text-secondary mb-5 md:text-xs lg:px-0 md:px-2'>
                        Update and manage your account
                    </p>
                    <ul className='w-full'>
                        {routes.map(r => (
                            <LinkItem
                                key={r.path}
                                icon={r.icon}
                                text={r.title}
                                active={r.path === router.pathname}
                                className='text-base'
                                href={r.path} />
                        ))}
                    </ul>
                </div>
                {renderMenu ? (
                    <div className='w-full bg-white px-4'>
                        <Link href={"/profile"}>
                            <a className='text-2xl text-primary my-4 hidden smMax:block'>
                                <BsArrowLeft />
                            </a>
                        </Link>
                        <h2 className='text-[32px] font-semibold text-primary'>
                            Settings
                        </h2>
                        <p className='text-sm text-secondary mb-5'>
                            Update and manage your account
                        </p>
                        <ul className='w-full'>
                            {routes.map(r => (
                                <LinkItemMobile
                                    key={r.path}
                                    icon={r.icon}
                                    text={r.title}
                                    className='text-base'
                                    href={r.path === '/profile/settings' ? r.path + '?view=true' : r.path} />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className='max-w-full xl:w-[704px] lg:w-9/12 md:w-10/12 ml-auto bg-white rounded-lg lg:p-10 md:p-5 smMax:w-full smMax:p-4'>
                        <Link href={"/profile/settings"}>
                            <a className='text-2xl text-primary my-4 hidden smMax:block'>
                                <BsArrowLeft />
                            </a>
                        </Link>
                        {title ? (
                            <h2 className='text-xl font-bold mb-5'>{title}</h2>
                        ) : null}
                        {children}
                    </div>
                )}
            </div>
        </>
    )
}

export default ProfileSettingsLayout;