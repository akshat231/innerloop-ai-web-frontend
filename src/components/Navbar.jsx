import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="p-4 bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">InnerLoop AI</h1>
        {user && (
          <button
            onClick={onLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
