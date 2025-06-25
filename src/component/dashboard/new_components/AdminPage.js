
import React from 'react';
import AuthPageComponent from '../../../components/AuthPage.js'; // The existing AuthPage

const AdminPage = ({ onLogin, onRegister, isLoading }) => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center py-10 px-4">
        {/* AuthPageComponent is designed to be a full section */}
        <AuthPageComponent onLogin={onLogin} onRegister={onRegister} isLoading={isLoading} />
    </div>
  );
};

export default AdminPage;