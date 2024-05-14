import React from 'react';
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

interface GroupHeaderProps {
    groupName: string;
}

const GroupHeader = ({ groupName }: GroupHeaderProps) => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-start">
            <button
                onClick={() => router.push('/viewgroups')}
                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                aria-label="Volver"
            >
                <IoMdArrowBack size={24} />
            </button>
            <h1 className="text-lg font-semibold mt-3 pl-32">
                {groupName}</h1>
        </div>
    );
};

export default GroupHeader;
