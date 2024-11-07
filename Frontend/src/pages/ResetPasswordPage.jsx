import React from 'react'
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate, useParams } from "react-router-dom";
function ResetPasswordPage() {

    const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};


    return (
        <div className='min-h-screen bg-gradient-to-br
    from-gray-300 to-gray-300 flex items-center justify-center relative overflow-hidden'>
		<div
			
			className='max-w-3xl w-full bg-gray-600  rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-10'>
				<h2 className='text-5xl font-bold mb-9 text-center bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text'>
					Reset Password
				</h2>
				{error && <p className='text-red-500 text-2xl text-sm mb-4'>{error}</p>}
				{message && <p className='text-green-500 text-2xl text-sm mb-4'>{message}</p>}

				<form onSubmit={handleSubmit}>
					<input
						
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
                        className='w-full h-20 text-center mb-7 text-3xl font-bold bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none'
					/>

					<input
						
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
                        className='w-full h-20 mb-7 text-center text-3xl font-bold bg-gray-900 text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none'
					/>

					<button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full text-3xl py-6 px-5 bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500  focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						
					>
						Reset
					</button>
				</form>
			</div>
		</div>
        </div>
	);
}

export default ResetPasswordPage
