"use client";

import StarIcon from "@/assets/icons/star.svg";

// Words for the tape - matching typical design samples
const tapeWords = ["PERFORMANT", "ACCESSIBLE", "SECURE", "INTERACTIVE", "SCALABLE", "RESPONSIVE", "USABLE", "RELIABLE", "PERFORMANT", "ACCESSIBLE", "SECURE", "INTERACTIVE", "SCALABLE", "RESPONSIVE", "USABLE", "RELIABLE"];

export const TapeSection = () => {
	return (
		<section className="py-16">
			<div className="bg-gradient-to-r from-emerald-300 to-sky-400 overflow-x-clip -rotate-3 -mx-1">
				<div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black90%,transparent)]">
					<div className="flex flex-none gap-4 py-3 pr-4 animate-move-left [animation-duration:30s]">
						{[...new Array(2)].map((_, index) =>
							tapeWords.map((word, index) => (
								<div key={`${word}-${index}`} className="inline-flex gap-4 items-center">
									<span className="text-gray-900 uppercase font-extrabold text-sm">{word}</span>
									<StarIcon className="size-6 text-gray-900 -rotate-12" />
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
