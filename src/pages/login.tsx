import {useId} from 'react';

export default function Login() {
	const email = useId();
	const password = useId();

	return (
		<div className="min-h-screen py-24 max-w-xs mx-auto">
			<h1 className="text-2xl">Login</h1>

			<form action="/api/sessions" method="POST" className="space-y-2">
				<div>
					<label htmlFor={email}>
						<span>Email Address</span>
						<input
							id={email}
							name="email"
							type="email"
							className="w-full rounded-md bg-white/25 border-none"
							required
						/>
					</label>
				</div>

				<div>
					<label htmlFor={password}>
						<span>Password</span>
						<input
							id={password}
							name="password"
							type="password"
							autoComplete="current-password"
							className="w-full rounded-md bg-white/25 border-none"
							required
						/>
					</label>
				</div>

				<div>
					<button type="submit" className="bg-ts-900 rounded-md px-8 py-1">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}
