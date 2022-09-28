import { notification } from 'antd';
import React, { useState } from 'react'
import api from '../../utils/api';
import ActionButton from './ActionButton';
import GroupedInput from './GroupedButton';
import TextInput from './TextInput';

const ResetPassword = ({currentStep=3, setCurrentStep}: {currentStep: number, setCurrentStep:any}) => {
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [showCountDown, setShowCountDown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resetForm, setResetForm] = useState({
        email: '',
        code: '',
        password: '',
        password2: '',
    });

    
    const sendVerificationCode = async () => {
        try {
            if(!resetForm.email) {
                notification.warn({
                    message: "invalid email"
                });
                return;
            }
            setShowCountDown(true);
            await api(`/auth/getToken/${resetForm.email}`);
        } catch (error: any) {
            setShowCountDown(false);
            notification.error(error?.message ?? 'unable send verification code')
        }
    }

    const handleShowPasswordField = () => {
        if(!resetForm.email || !resetForm.code) {
            notification.warn({
                message: "please provide email and verification code to go ahead"
            });
            return;
        }
        setShowPasswordField(true);
    }

    const handleCreateNewPassword = async () => {
        if(!resetForm.password || !resetForm.password2 || resetForm.password !== resetForm.password2) {
            notification.error({
                message: "password does not match"
            })
            return;
        }
        try {
            const {password2, ...rest} = resetForm;
            await api("/auth/reset-password", rest);
            notification.success({
                message: 'password reset success'
            });
            setCurrentStep?.(2);
        } catch (error: any) {
            notification.error({
                message: error?.message ?? 'unable to reset password'
            });
        }
        setShowPasswordField(false);
    }

    return (
        <>
        {currentStep === 3 && !showPasswordField && (
                <>
                    <TextInput onChange={v => setResetForm({...resetForm, email: v})} value={resetForm.email} placeholder="Enter account email" label='Email' type="email" />
                    <GroupedInput 
                        onClick={sendVerificationCode}
                        showCountDown={showCountDown}
                        finishTimer={() => setShowCountDown(false)}
                        actionText='Send code' 
                        actionDisabled={!resetForm.email} 
                        inputDisabled={!resetForm.email}
                        onChange={e => setResetForm({...resetForm, code: e.target.value})} 
                        value={resetForm.code}
                    />
                    <ActionButton label="Request code" onClick={handleShowPasswordField} />
                </>
            )}

            {showPasswordField && (
                <>
                    <TextInput value={resetForm.password}  onChange={v => setResetForm({...resetForm, password: v})}  label='Create new password' type="password" />
                    <TextInput value={resetForm.password2} error={resetForm.password != resetForm.password2 ? 'password does not match' : ''} label='Repeat password' type="password" onChange={v => setResetForm({...resetForm, password2: v})} />
                    <ActionButton onClick={handleCreateNewPassword} loading={loading} label="Create new password" disabled={resetForm.password != resetForm.password2} />
                </>
            )}
        </>
    )
}

export default ResetPassword;