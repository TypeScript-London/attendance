import {useRouter} from 'next/router';
import {APIResponse} from 'nextkit';
import {useId, useReducer, useState} from 'react';

export default function Claim() {
	const email = useId();
	const password = useId();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<main className="p-8 bg-white/10 max-w-sm rounded-md space-y-4">
				<div className="space-y-1 text-center">
					<h1 className="text-4xl">Claim</h1>

					<p>Claim your account to attend our next meetup in January</p>
				</div>

				<form
					action="/api/users/claim"
					method="POST"
					onSubmit={async e => {
						e.preventDefault();

						setLoading(true);

						try {
							const res = await fetch(e.currentTarget.action, {
								method: e.currentTarget.method,
								body: JSON.stringify(
									Object.fromEntries(new FormData(e.currentTarget)),
								),
								headers: {
									'Content-Type': 'application/json',
								},
							});

							const body = (await res.json()) as APIResponse<{id: string}>;

							if (!body.success) {
								alert(body.message);
								return;
							}

							router.push('/claimed');
						} finally {
							setLoading(false);
						}
					}}
					className="space-y-2"
				>
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
								autoComplete="new-password"
								className="w-full rounded-md bg-white/25 border-none"
								required
							/>
						</label>
					</div>

					<button
						disabled={loading}
						type="submit"
						className="bg-ts-900 w-full p-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
					>
						Claim
					</button>
				</form>
			</main>
		</div>
	);
}
