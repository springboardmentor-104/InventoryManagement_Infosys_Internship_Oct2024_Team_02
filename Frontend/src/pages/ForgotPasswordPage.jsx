import React from 'react'
import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import {Link} from 'react-router-dom';
function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

    return (
        <div className='min-h-screen bg-gradient-to-br
    from-gray-300 to-gray-300 flex items-center justify-center relative overflow-hidden'>
		<div
			
			className='max-w-2xl w-full bg-gray-600  rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-10'>
				<h2 className='text-5xl py-6 font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text'>
					Forgot Password
				</h2>

				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<p className='text-gray-300 mb-10 text-center text-3xl'>
							Enter your email address and we'll send you a link to reset your password.
						</p>
						<input
							
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
                            className='w-full h-27 mb-9 py-6  text-3xl text-center text-3xl font-bold bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none'
						/>
						<button
							
							className='w-full py-6 px-6 text-3xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 focus:outline-none focus:ring-sky-500 focus:ring-2 focus:ring-offset-gray-900 transition duration-200'
							type='submit'
						>
						Submit
						</button>
					</form>
				) : (
					<div className='text-center'>
						
						<p className='text-gray-300 mb-6 text-2xl'>
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
					</div>
				)}
			</div>

			<div className='px-8 py-8 bg-gray-400 bg-opacity-50 flex justify-center'>
				<Link to={"/login"} className='text-2xl text-blue-200 hover:underline flex items-center'>
					 Back to Login
				</Link>
			</div>
		</div>
        </div>
	);
}

export default ForgotPasswordPage
