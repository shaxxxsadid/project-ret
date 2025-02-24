'use client';
import React, { useEffect } from 'react';
import CustomButton from '../components/UI/UX/customButton';
import { AppDispatch, useAppSelector } from '../lib/store';
import { fetchUsers } from '../lib/features/userSlice';
import { useDispatch } from 'react-redux';
import AddUserModal from '../components/UI/modal/ModalsForUser/addUserModal';
import Image from 'next/image';

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useAppSelector(state => state.users.users);
    const loading = useAppSelector(state => state.users.loading);
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="p-4 max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
                <AddUserModal />
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-[50vh]">
                    <div className="animate-spin rounded-full h-52 w-52 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
            <div className="space-y-4">
                {users.map((user) => (
                    <div 
                        key={user._id} 
                        className="p-4 border rounded-lg bg-gray-950 shadow-sm hover:shadow-md transition-shadow sm:rounded-xl sm:p-6" 
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            {/* User Info Section */}
                            <div className="flex items-center flex-grow min-w-0">
                                <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                                    <Image
                                        src={user.avatar?.data 
                                            ? `data:image/jpeg;base64,${user.avatar.data.toString('base64')}`
                                            : '/placeholder.svg'}
                                        alt={user.username}
                                        fill
                                        className="rounded-full object-cover border-2 border-gray-500"
                                        sizes="(max-width: 640px) 64px, 80px"
                                        quality={80}
                                        unoptimized={!!user.avatar?.data}
                                    />
                                </div>
                                
                                <div className="ml-4 min-w-0">
                                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                                        {user.username}
                                    </h2>
                                    <p className="text-gray-600 text-sm sm:text-base truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                <CustomButton
                                    title='Update'
                                    className="w-full sm:w-24 bg-yellow-500 hover:bg-yellow-600
                                              py-2 text-sm sm:text-base"
                                />
                                <CustomButton
                                    title='Delete'
                                    className="w-full sm:w-24 bg-red-500 hover:bg-red-600
                                              py-2 text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>)}
        </div>
    );
};

export default AdminPanel;
