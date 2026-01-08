import { BriefcaseIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export default function WorkExperienceBottom() {
	return (
		<FadeIn delay={0.6}>
			<div className="text-center mt-16">
				<div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-full">
					<BriefcaseIcon className="w-5 h-5 text-emerald-400" />
					<span className="text-emerald-400 font-medium">
						Growing Professional Experience
					</span>
				</div>
			</div>
		</FadeIn>
	);
}
