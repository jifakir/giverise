import { useState } from "react";
import TextInput from "../../auth-modal/TextInput";
import { DatePicker } from "../../date-picker";
import { CustomRadio } from "../../forms";
import UploadBox from "./UploadBox";

const Upload = () => {
    const [coverType, setCoverType] = useState('photo');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoverType(e.target.value);
    }

    return (
        <>
            <h3 className='text-[22px] font-bold text-primary leading-8 mb-2'>What best describes what you are awarding for?</h3>
            <p className='text-secondary font-normal text-sm mb-7'>This helps yourscholarship stand out to the right candidates.</p>
            <div className="flex items-center gap-4">
                <CustomRadio name="cover-type" value="photo" checked={coverType === 'photo'} label="Photo" onChange={handleOnChange} />
                <CustomRadio name="cover-type" value="youtube" checked={coverType === 'youtube'} label="YouTube Link" onChange={handleOnChange} />
            </div>
            {coverType === 'photo' && (
                <UploadBox />
            )}
            {coverType === 'youtube' && (
                <div className="relative mt-6">
                    <label className='absolute bottom-6 left-3 text-xs text-body block z-10'>
                        Youtube Link
                    </label>
                    <TextInput placeholder='https://' className='pt-6' />
                </div>
            )}

            <div className="mt-10 mb-4">
                <DatePicker />
            </div>
        </>
    );
}

export default Upload;