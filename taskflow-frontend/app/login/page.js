'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://taskflow-sv98.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Failed to login');
      }

      const data = await res.json();
      // Store the token in localStorage
      localStorage.setItem('token', data.token);

      // Redirect to the home page after successful login
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex flex-col justify-center items-center py-6 px-4">
      <div className="bg-slate-200 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-3xl border-2 border-amber-500 overflow-hidden">
       
        <div className="flex flex-col items-center justify-center px-6 py-10 text-black">
          <h1 className="text-4xl font-black font-serif underline mb-6">Login</h1>
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 max-w-md">
            <div className="flex flex-col gap-2">
              <label className="text-xl font-bold font-serif">Email:</label>
              <input className="bg-white px-4 py-3 rounded-3xl font-serif font-semibold focus:outline-blue-700" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="taskFlow@gmail.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl font-bold font-serif">Password:</label>
              <input className="bg-white px-4 py-3 rounded-3xl font-serif font-semibold focus:outline-blue-700" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder="Enter the password" />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 w-full py-3 text-xl font-bold font-serif rounded-full text-white hover:bg-blue-600 border-2 hover:border-black transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-sm text-right mt-2">
              <p className="font-serif inline">{"Don't have an account?"}</p>
              <Link href="/signup" className="ml-1 text-blue-800 font-bold font-serif underline">Signup</Link>
            </div>
          </form>
        </div>

        <div className="hidden md:flex items-center justify-center p-4">
          <Image className=" mix-blend-darken rounded-2xl w-full h-auto object-contain" src="/login1.avif" alt="login_img" width={570} height={500} />
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
