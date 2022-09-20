import React from 'react'
import { ProfileSettingsLayout, TextInput } from '../../../components'

const Security = () => {
    return (
        <ProfileSettingsLayout title='Security'>
            <TextInput placeholder='Enter password' label='Old password' />
            <TextInput placeholder='Enter Password' label='New Password' />
            <div className="mt-16">
                <button className='bg-primary-purple text-white rounded-[4px] font-medium text-base px-5 py-3'>
                    Save changes
                </button>
            </div>
        </ProfileSettingsLayout>
    )
}

export default Security