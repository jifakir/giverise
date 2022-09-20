import React from 'react'
import { CountrySelect, ProfileSettingsLayout, TextInput } from '../../../components'

const Settings = () => {
    return (
        <ProfileSettingsLayout title='Edit your personal details'>
            <div className="grid grid-cols-3 xl:gap-10 md:gap-5 smMax:grid-cols-1">
                <div className="col-span-2 smMax:col-span-full smMax:order-2">
                    <TextInput placeholder='iamapj' label='Username' />
                    <TextInput placeholder='+1 (972) 209 9484' label='Phone' />
                    <div className='mb-4'>
                        <div className="flex items-center justify-between">
                            <strong className='text-primary text-sm'>Bio</strong>
                            <p className='text-xs text-secondary'>
                                200/300
                            </p>
                        </div>
                        <textarea className='resize-none text-body text-sm placeholder:text-body placeholder:text-sm rounded-lg border border-primary-stroke p-4 w-full focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-primary-stroke' rows={3} placeholder="I am big on funding startups in a new way">
                        </textarea>
                    </div>
                    <TextInput placeholder='1298 West Frontier Parkway, Prosper, TX, USA' label='Address' />
                    <CountrySelect label='Country of origin' value='Nigeria' />
                    <TextInput placeholder='Current City and Country' label='Current City and Country' />

                    <div className="mt-16">
                        <button className='bg-primary-purple text-white rounded-[4px] font-medium text-base px-5 py-3'>
                            Save changes
                        </button>
                    </div>
                </div>
                <div className="col-span-1 smMax:col-span-full smMax:order-1 smMax:flex smMax:gap-4 smMax:items-center smMax:mb-4">
                    <div className='sm:w-[183px] sm:h-[183px] h-[128px] w-[128px] edit-profile-image-container' style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.481686), rgba(0, 0, 0, 0.481686)), url(/images/dummy/profile-image.png)' }}>
                        <div className='w-full h-full rounded-full' style={{ backgroundImage: 'url(/images/dummy/profile-image.png)' }}>
                        </div>
                    </div>
                    <div className='sm:my-4 smMax:w-[calc(100%-128px)]'>
                        <button className='border smMax:mb-5 border-primary-purple rounded-[4px] text-primary-purple text-sm font-semibold flex items-center w-full justify-center h-5 py-4'>
                            Upload new picture
                        </button>
                        <button className='text-secondary text-center text-sm font-medium smMax:font-semibold mx-auto flex'>
                            Remove picture
                        </button>
                    </div>
                </div>
            </div>
        </ProfileSettingsLayout>
    )
}

export default Settings;