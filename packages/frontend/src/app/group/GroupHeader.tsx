interface GroupHeaderProps {
    groupName: string;
}

const GroupHeader = ({ groupName }: GroupHeaderProps) => {
    return (
        <div className="flex items-center justify-center">
            <h1 className="text-lg font-semibold mt-3">{groupName}</h1>
        </div>
    );
};

export default GroupHeader;
