import { ImSpinner3 } from 'react-icons/im';
import { Spin } from "antd";


const ActionButton = ({ label = 'Next', onClick, disabled = false, loading = false }: { onClick?: () => void, disabled?: boolean, label?: string, loading?: boolean }) => (
    <button disabled={disabled} onClick={onClick} className='mb-4 w-full h-12 rounded-lg flex items-center justify-center bg-primary-purple text-white text-base font-normal disabled:bg-[#F8F8F8] disabled:text-primary-purple disabled:text-opacity-10'>
        {loading ? <span id='loading' className='text-xl'><ImSpinner3 /></span> : label}
    </button>
);

export default ActionButton;