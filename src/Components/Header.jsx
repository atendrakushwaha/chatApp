import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice'; // Make sure this exists
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth); // Assuming state.auth.user

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <div>
        <ul className="flex space-x-4 items-center">
          {user ? (
            <>
              <li><a href="/Chat" className="hover:underline">Chat</a></li>
              <li className="font-semibold text-green-300">{user.username}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <a
                href="/login"
                className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
              >
                Login
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
