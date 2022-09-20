import { Modal, Slider } from "antd";
import { useRef, useState } from "react";
import { AiOutlineZoomOut, AiOutlineZoomIn } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview, toBlob } from "../../utils";

interface CropModalProps {
    isVisible: boolean;
    imgSrc?: string;
    originalFile?: File;
    onSave: (cropedFile: File) => void;
};

export const CropModal = ({ isVisible = false, imgSrc = '', originalFile, onSave }: CropModalProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    const onLoadImage = (e: React.ChangeEvent<HTMLImageElement>) => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 100,
                    height: 25,
                },
                16 / 9,
                width,
                height
            ),
            width,
            height
        )
        setCrop(crop)
    }

    const onSliderChange = (e: number) => {
        setCrop(prev => {
            if (prev) {
                return {
                    ...prev,
                    height: e,
                    y: e >= 100 ? 0 : prev.y
                }
            }
        });
    }

    const saveFile = async () => {
        if (completedCrop?.height && completedCrop?.width && imgRef.current) {
            const canvas = document.createElement('canvas');
            canvasPreview(
                imgRef.current,
                canvas,
                completedCrop
            );

            const blob = await toBlob(canvas);
            const file = new File([blob], originalFile?.name as string, { type: blob.type })
            onSave?.(file);
        }
    }

    return (
        <Modal width={588} visible={isVisible} footer={null} closable={false} className="px-0 crop-modal">
            <div className="flex items-center justify-between px-4 pt-4">
                <h4 className='text-lg text-primary font-medium'>Edit cover photo</h4>
                <button onClick={saveFile} className='bg-primary-purple rounded-[4px] text-base font-medium h-9 px-4 text-white'>
                    Save
                </button>
            </div>
            {imgSrc ? (
                <>
                    <div className='h-[350px] w-full overflow-hidden mt-4'>
                        <ReactCrop crop={crop} onChange={(_, pixelCrop) => setCrop(pixelCrop)} minWidth={588} onComplete={c => setCompletedCrop(c)}>
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                height={300}
                                className="w-full max-w-full object-cover"
                                onLoad={onLoadImage} />
                        </ReactCrop>
                    </div>
                    <div className="flex items-center gap-4 w-[60%] mx-auto py-3 mt-12">
                        <button>
                            <AiOutlineZoomOut />
                        </button>
                        <Slider max={100} min={25} value={crop?.height} onChange={onSliderChange} className='w-[90%] zoom-slider' />
                        <button>
                            <AiOutlineZoomIn />
                        </button>
                    </div>
                </>
            ) : null}
        </Modal>
    )
}
const UploadBox = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imgSrc, setImgSrc] = useState<string>();
    const [isVisible, setIsVisible] = useState(false);
    const [originalFile, setOriginalFile] = useState<File>();
    const [file, setFile] = useState<File>();


    const handleClick = () => {
        fileInputRef.current?.click();
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImgSrc(reader?.result?.toString() || '');
            setIsVisible(true);
        });
        reader.readAsDataURL(file as File);
        setOriginalFile(file);
    }

    const onSave = (f: File) => {
        setFile(f);
        setIsVisible(false);
    }

    return (
        <>
            <div onClick={handleClick} className={`mt-7 border border-primary-purple border-dashed rounded-lg h-[220px] w-full flex flex-col items-center justify-center cursor-pointer text-body text-sm`}>
                <span className='text-primary-purple'><FaPlus /></span>
                <p className='flex items-center my-2'>Upload your file by <span className='ml-2 text-primary-purple'>clicking here</span></p>
                <p>Support png or jpg (max 5mb)</p>
                <input type="file" onChange={onFileChange} ref={fileInputRef} className='hidden' accept="image/*" />
            </div>
            <CropModal
                isVisible={isVisible}
                imgSrc={imgSrc}
                originalFile={originalFile}
                onSave={onSave}
            />
        </>
    );
};

export default UploadBox;