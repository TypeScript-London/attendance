import orta from '../assets/people/orta.jpeg';
import andy from '../assets/people/andy.jpeg';
import alistair from '../assets/people/alistair.jpeg';
import type {Speaker} from '../client/types';
import Image from 'next/image';
import {HiOutlineTicket} from 'react-icons/hi';
import {PageConfig} from 'next';

export const config: PageConfig = {
	unstable_runtimeJS: false,
};

function SpeakerListItem(speaker: Speaker) {
	return (
		<li className="space-y-4 p-6 shadow-md bg-white/10 rounded-md">
			<div className="flex space-x-4">
				<div className="flex-shrink-0">
					<Image
						className="w-20 h-20 ring-4 ring-white rounded-full aspect-square object-cover"
						src={speaker.image}
						alt={speaker.name}
					/>
				</div>

				<div className="space-y-4">
					<div className="-mt-2">
						<h3 className="text-2xl font-bold">{speaker.name}</h3>
						<div className="text-white/75">{speaker.description}</div>
					</div>

					{speaker.presentation && (
						<>
							<hr className="border-white/25" />

							<div>
								<h4 className="text-xl font-bold">
									{speaker.presentation.title}
								</h4>
								<div className="text-white/75">
									{speaker.presentation.description}
								</div>
							</div>

							{speaker.presentation.youtube && (
								<div className="w-full aspect-video flex">
									<iframe
										className="h-full w-full rounded-md shadow-lg"
										src={`https://www.youtube-nocookie.com/embed/${speaker.presentation.youtube}`}
										title="YouTube video player"
										loading="lazy"
									/>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</li>
	);
}

export default function Home() {
	return (
		<div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
			<div>
				<h2 className="text-2xl text-white/75 font-light">Attend</h2>
				<h1 className="text-6xl font-bold">TypeScript London</h1>
			</div>

			<main className="space-y-6 border-ts-700/75 max-w-prose">
				<div className="space-y-2">
					<div>
						<h2 className="text-xl text-white/75 font-light">Next Event</h2>
						<h1 className="text-2xl font-bold">January 13th, 2023</h1>
					</div>

					<p>
						<time dateTime="2023-01-13T17:30:00.000Z">
							Arrive after 17:30, talks start ~18:00
						</time>
					</p>

					<p className="py-1 px-2 bg-ts-700 rounded-full">
						📍 County Hall, Belvedere Road, London, SE1 7PB
					</p>
				</div>

				<div className="space-y-4">
					<p>
						Our first ever TypeScript London meetup will be hosted in the
						Cloudflare offices in Southbank, London. Extremely grateful for
						△Vercel who are sponsoring us and donating a few free swag boxes.
					</p>

					<p>
						We'll be talking about some advanced TypeScript wizardy, including
						upcoming features, advanced patterns and some of the more obscure
						features of the language.
					</p>

					<p>
						Arrive after 17:30, we'll start talks at ~18:00 and afterwards find
						a pub nearby for some 🍻 drinks.
					</p>

					<div>
						<a
							href="https://forms.gle/TtoazhuGKwQTnwD1A"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:bg-ts-600 ring ring-white/50 bg-ts-700 px-8 py-1 rounded-full inline-flex items-center space-x-2"
						>
							<span>Attend</span>
							<span>
								<HiOutlineTicket />
							</span>
						</a>
					</div>

					<p>
						A really huge thank you to{' '}
						<a
							className="underline text-white"
							href="https://twitter.com/SimonWijckmans"
						>
							Simon
						</a>{' '}
						who has immensely helped me organise this event. Please do follow
						him on Twitter!
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="text-xl font-bold">Speakers</h2>

					<ul className="space-y-4">
						<SpeakerListItem
							image={orta}
							name="Orta Therox"
							description="Ex TypeScript Compiler team, OSS person touching many ecosystems, doing something with games ATM but can't talk about it."
							presentation={{
								title: 'How the TypeScript compiler compiles',
								description: (
									<p>
										A systems-level look at the TypeScript compiler. How it
										converts a file into something into data, checks the
										validity of that data and finally creates .js files on the
										disk.
									</p>
								),
								youtube: 'X8k_4tZ16qU',
							}}
						/>

						<SpeakerListItem
							image={andy}
							name="Andy Jefferson"
							description="Founder. Digital nomad. Formerly at Neo4j, Tractable & Apple. Loves TypeScript. Dislikes servers, vpcs and kubernetes."
						/>

						<SpeakerListItem
							image={alistair}
							name="Alistair Smith"
							description="18 year old TypeScripter. Open source contributor. Building a cloud platform which doesn't require an expensive certificate to use."
							presentation={{
								title: 'Parse, not validate',
								description: (
									<p>
										A deep dive into how libraries such as Zod make our code
										more reliable and easier to maintain. We'll look at how they
										work, how they're implemented and how you can use them in
										your own projects. Finally, we'll build a library of our own
										together.
									</p>
								),
							}}
						/>
					</ul>
				</div>
			</main>
		</div>
	);
}
