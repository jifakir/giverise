import React from 'react'
import { ProfileSettingsLayout } from '../../../components';

const EarnItem = ({ logo = '', title = '', subtitle = '', point = 50 }) => {
    return (
        <div className='flex sm:items-center items-start mb-10 last-of-type:mb-0 pb-4 smMax:border-b smMax:border-primary-purple smMax:border-opacity-[0.08]'>
            <img src={logo} className='w-12 h-12 rounded-[4px] object-cover' />
            <div className='sm:ml-4 ml-2 smMax:w-[calc(100%-48px-42px)]'>
                <h3 className='text-base font-medium text-primary'>{title}</h3>
                <p className='text-body text-sm'>{subtitle}</p>
            </div>
            <div className='flex items-center ml-auto self-center smMax:w-10'>
                <img src='/images/logo-icon.png' className='object-cover w-4' />
                <span className='ml-2 text-base text-primary-purple'>{point}</span>
            </div>
        </div>
    );
}
const EarnPoint = () => {
    return (
        <ProfileSettingsLayout title='Earn more points on Giverise'>
            <EarnItem
                logo='/images/logos/instagram.jpg'
                title='Follow Giverise.org on Instagram'
                subtitle='But the work is hard and the politics of work, perhaps h'
            />
            <EarnItem
                logo='/images/logos/tiktok-big.jpg'
                title='Follow Giverise.org on Tiktok'
                subtitle='Hard and the politics of work, perhaps harder. '
            />
            <EarnItem
                logo='/images/logos/meta.jpg'
                title='Follow Giverise.org on Facebook'
                subtitle='She reflects on the reason why she wanted to become a '
            />
            <EarnItem
                logo='/images/logos/robot.jpg'
                title='Follow Giverise.org on Facebook'
                subtitle='She reflects on the reason why she wanted to become a '
            />
            <EarnItem
                logo='/images/logos/crypto.jpg'
                title='Trade Giverise token'
                subtitle='The realities of the work are less warm and fuzzy than she had'
            />
            <EarnItem
                logo='/images/logos/meta.jpg'
                title='Follow Giverise.org on Facebook'
                subtitle='She reflects on the reason why she wanted to become a '
            />
            <button className='bg-primary-purple text-white rounded-[4px] font-medium text-base px-5 py-3 mt-10'>
                Load more
            </button>
        </ProfileSettingsLayout>
    )
}

export default EarnPoint;