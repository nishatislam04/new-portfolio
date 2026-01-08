import type { ReactElement } from "react";

import { FadeIn } from "@/components/animations/FadeIn";

export default function WorkExperienceHeader(): ReactElement {
	return (
		<FadeIn>
			<div className="text-center mb-16">
				<h2 className="heading-2 mb-4">
					Work <span className="gradient-text">Experience</span>
				</h2>
				<p className="body-large text-gray-400 max-w-2xl mx-auto">
					Professional journey and contributions in software development
				</p>
			</div>
		</FadeIn>
	);
}
