'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://taskflow-sv98.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        // Error handling for bad response from server
        setError(data.message || 'Error registering user');
      } else {
        // If registration is successful, redirect to login page
        alert('User registered successfully!');
        router.push('/login');  // Redirect to login page after success
      }
    } catch (error) {
      // General error handling (e.g., network issues)
      setError(error.message || 'Error during registration');
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center py-6 px-4">
      <div className="bg-slate-200 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl mt-7 border-2 border-amber-500 overflow-hidden">
        <div className="signup flex flex-col items-center justify-center px-6 py-10 text-black">
          <h2 className="text-4xl font-black font-serif underline mb-6">Signup</h2>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <form onSubmit={handleRegister} className="w-full flex flex-col gap-5 max-w-md">
            <div className="flex flex-col gap-2">
              <label className="text-xl font-bold font-serif" htmlFor="username">Username:</label>
              <input className="bg-white px-4 py-3 font-bold font-serif rounded-3xl focus:outline-blue-700" type="text"  id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl font-bold font-serif" htmlFor="email">Email:</label>
              <input className="bg-white px-4 py-3 font-bold font-serif rounded-3xl focus:outline-blue-700" type="email" id="email" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl font-bold font-serif" htmlFor="password">Password:</label>
              <input className="bg-white px-4 py-3 font-bold font-serif rounded-3xl focus:outline-blue-700" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>
            <button type="submit" className="bg-[#443c59] w-full py-3 text-xl font-bold font-serif rounded-full text-white hover:bg-blue-700 hover:cursor-pointer border-2 hover:border-black transition" >
              Register
            </button>
            <div className="text-sm text-right mt-2">
              <p className="font-serif inline">Already have an account?</p>
              <Link className="ml-1 text-blue-800 font-bold font-serif underline" href="/login">Login</Link>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center p-4">
          <Image className="mix-blend-darken rounded-2xl w-full h-auto object-contain" src="/signup.avif" alt="signup_img"  width={570} height={500} />
        </div>
      </div>
    </div>

  );
};

export default Signup;
