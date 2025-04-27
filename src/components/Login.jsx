import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../api/journal';

const Login = ({ onLoginSuccess }) => {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      // First hit your backend to login or register user
      const response = await loginUser(decoded.email, decoded.name);

      // Then call onLoginSuccess to set the user in App.jsx
      onLoginSuccess(response.data, decoded.email, decoded.name);
    } catch (error) {
      console.error('Login process failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login to Journal App</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
          size="large"
          width="300"
          shape="pill"
          theme="outline"
        />
      </div>
    </div>
  );
};

export default Login;
