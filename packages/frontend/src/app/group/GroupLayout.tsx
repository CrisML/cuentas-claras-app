import React from 'react';

const GroupLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-start justify-center min-h-screen pt-10 bg-gray-300">
            <div className="w-1/2 max-w-xl p-6 bg-white rounded-lg shadow-xl">
                {children}
            </div>
        </div>
    );
};

export default GroupLayout;
