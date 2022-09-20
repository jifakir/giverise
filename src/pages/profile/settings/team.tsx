import { Avatar, Modal } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { useState } from 'react'
import { MultiSelectCheckBox, ProfileSettingsLayout } from '../../../components'
import { DeleteIcon } from '../../../components/icons';

const ConfirmModal = ({ visible = false, onClose }: { visible: boolean, onClose?: () => void }) => {
    return (
        <Modal visible={visible} footer={null} closable={false} centered>
            <h3 className='text-xl font-bold text-primary'>Remove user</h3>
            <p className='text-base text-body my-6'>
                Are you sure you want to remove this user? They will no longer have access to Giverise
            </p>
            <div className="flex items-center gap-3">
                <button onClick={onClose} className='bg-error text-white py-2 px-4 text-base font-medium rounded-[4px]'>
                    Remove user
                </button>
                <button onClick={onClose} className='border border-primary-purple rounded-[4px] px-3 py-2 text-primary-purple font-medium text-base'>
                    Cancel
                </button>
            </div>
        </Modal>
    );
}

const Team = () => {
    const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
    const breakpoint = useBreakpoint();

    const showDeleteModal = () => {
        setVisibleConfirmModal(true);
    }

    return (
        <ProfileSettingsLayout title='Team'>
            <h4 className='text-lg font-semibold text-primary'>Users</h4>
            <p className='text-secondary text-sm'>
                This is some dummy content about how to add a team member
            </p>
            <button className='bg-primary-purple text-white rounded-[4px] font-medium text-base grid place-items-center h-9 w-[98px] mt-5 mb-8'>
                Invite user
            </button>
            <div className="flex items-center -mx-10 px-10 border-b border-[#F1F0FF] pb-4 mb-4 smMax:flex-col smMax:gap-y-3">
                <div className="flex items-center smMax:w-full">
                    <Avatar src='/images/dummy/profile-2.jpg' size={60} />
                    <div className='ml-4'>
                        <h3 className='font-semibold text-sm text-primary'>Emmanuel Iroko</h3>
                        <p className='text-secondary text-sm'>Emmanuel@mail.com</p>
                    </div>
                </div>
                <div className='flex items-center sm:ml-auto smMax:w-full'>
                    <MultiSelectCheckBox
                        options={['Administrator', 'Member']}
                        customOption={false}
                        mode='single'
                        hideSearch={true}
                        placeholder='Select'
                        inputClass='focus:bg-white'
                        value={'Administrator'}
                    />
                    <button className='text-2xl text-primary ml-2' onClick={showDeleteModal}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            <div className="flex items-center -mx-10 px-10 border-b border-[#F1F0FF] pb-4 mb-4 smMax:flex-col smMax:gap-y-3">
                <div className="flex items-center smMax:w-full">
                    <Avatar src='/images/dummy/profile-2.jpg' size={60} />
                    <div className='ml-4'>
                        <h3 className='font-semibold text-sm text-primary'>Emmanuel Iroko</h3>
                        <p className='text-secondary text-sm'>Emmanuel@mail.com</p>
                    </div>
                </div>
                <div className='flex items-center sm:ml-auto smMax:w-full'>
                    <MultiSelectCheckBox
                        options={['Administrator', 'Member']}
                        customOption={false}
                        mode='single'
                        hideSearch={true}
                        placeholder='Select'
                        inputClass='focus:bg-white'
                        value={'Administrator'}
                    />
                    <button className='text-2xl text-primary ml-2' onClick={showDeleteModal}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            <div className="flex items-center -mx-10 px-10 border-b border-[#F1F0FF] pb-4 mb-4 smMax:flex-col smMax:gap-y-3">
                <div className="flex items-center smMax:w-full">
                    <Avatar src='/images/dummy/profile-2.jpg' size={60} />
                    <div className='ml-4'>
                        <h3 className='font-semibold text-sm text-primary'>Emmanuel Iroko</h3>
                        <p className='text-secondary text-sm'>Emmanuel@mail.com</p>
                    </div>
                </div>
                <div className='flex items-center sm:ml-auto smMax:w-full'>
                    <MultiSelectCheckBox
                        options={['Administrator', 'Member']}
                        customOption={false}
                        mode='single'
                        hideSearch={true}
                        placeholder='Select'
                        inputClass='focus:bg-white'
                        value={'Administrator'}
                    />
                    <button className='text-2xl text-primary ml-2' onClick={showDeleteModal}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>

            <h4 className='text-lg font-semibold text-primary'>Pending invites</h4>
            <p className='text-secondary text-sm mb-8'>
                This is some dummy content about how to add a team member
            </p>
            <div className="flex items-center -mx-10 px-10 border-b border-[#F1F0FF] pb-4 mb-4 smMax:flex-col smMax:gap-y-4">
                <div className="flex items-center smMax:w-full">
                    <Avatar src='/images/dummy/profile-2.jpg' size={60} />
                    <div className='ml-4'>
                        <h3 className='font-semibold text-sm text-primary flex items-center'>
                            Emmanuel Iroko
                            <span className='bg-[#F3F3F3] rounded-2xl text-secondary inline-flex w-[60px] h-[26px] items-center justify-center text-xs px-2 ml-2'>
                                Pending
                            </span>
                        </h3>
                        <p className='text-secondary text-sm'>Emmanuel@mail.com</p>
                    </div>
                </div>
                <div className='flex items-center ml-auto smMax:w-full smMax:justify-between'>
                    <button className='rounded-[4px] border border-primary-purple text-primary-purple text-base font-medium px-4 py-1'>
                        Resend invite
                    </button>
                    <button className='text-error text-base ml-2'>Revoke invite</button>
                </div>
            </div>
            <div className="flex items-center -mx-10 px-10 border-b border-[#F1F0FF] pb-4 mb-4 smMax:flex-col smMax:gap-y-4">
                <div className="flex items-center smMax:w-full">
                    <Avatar src='/images/dummy/profile-2.jpg' size={60} />
                    <div className='ml-4'>
                        <h3 className='font-semibold text-sm text-primary flex items-center'>
                            Emmanuel Iroko
                            <span className='bg-[#F3F3F3] rounded-2xl text-secondary inline-flex w-[60px] h-[26px] items-center justify-center text-xs px-2 ml-2'>
                                Pending
                            </span>
                        </h3>
                        <p className='text-secondary text-sm'>Emmanuel@mail.com</p>
                    </div>
                </div>
                <div className='flex items-center ml-auto smMax:w-full smMax:justify-between'>
                    <button className='rounded-[4px] border border-primary-purple text-primary-purple text-base font-medium px-4 py-1'>
                        Resend invite
                    </button>
                    <button className='text-error text-base ml-2'>Revoke invite</button>
                </div>
            </div>

            <ConfirmModal visible={visibleConfirmModal} onClose={() => setVisibleConfirmModal(false)} />
        </ProfileSettingsLayout>
    )
}

export default Team;