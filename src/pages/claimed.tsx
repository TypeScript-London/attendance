import Link from 'next/link';

export default function Claimed() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center space-y-2 max-w-xs">
				<h2 className="text-2xl">You're in!</h2>
				<p>
					Next step is to sign into your account and hit attend to secure your
					slot.
				</p>

				<div>
					<Link href="/login" className="bg-ts-900 rounded-md px-8 py-1">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
