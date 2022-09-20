const TagButton = ({ selected = false, label = '', onClick }: { selected?: boolean, label?: string, onClick?: () => void }) => (
    <button onClick={onClick} className={`rounded-full h-[37px] border px-3 inline-flex items-center text-secondary hover:border-primary-purple hover:bg-primary-purple hover:bg-opacity-10 ${selected ? 'border-primary-purple bg-primary-purple bg-opacity-10' : 'border-[#E2E4E8]'}`}>
        {label}
    </button>
);

export default TagButton;