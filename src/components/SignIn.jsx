import { useState } from 'react';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="w-[700px] p-4 border border-black/70 rounded-md">
      <h2 className="text-2xl font-bold mb-8">Sign In</h2>

      {/* Username Field */}
      <div className="relative mb-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
          className="w-full border-2 border-gray-400 px-4 py-4 text-lg outline-none focus:border-gray-600"
        />
        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            usernameFocused || username
              ? 'top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-700'
              : 'top-1/2 -translate-y-1/2 text-lg text-gray-600'
          }`}
        >
          Username or Customer # <span className="text-red-600">*</span>
        </label>
      </div>

      {/* Password Field */}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          className="w-full border-2 border-gray-400 px-4 py-4 text-lg outline-none focus:border-gray-600"
        />
        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            passwordFocused || password
              ? 'top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-700'
              : 'top-1/2 -translate-y-1/2 text-lg text-gray-600'
          }`}
        >
          Password <span className="text-red-600">*</span>
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-600 font-semibold border-b-2 border-teal-600 hover:text-teal-700"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;