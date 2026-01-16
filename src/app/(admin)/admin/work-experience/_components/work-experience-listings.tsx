import Link from "next/link";
import type { WorkExperienceDTO } from "@/actions/work-experience-actions";
import { Card } from "@/components/ui/card";

type WorkExperienceListingsProps = {
	experiences: WorkExperienceDTO[];
};

export default function WorkExperienceListings({
	experiences,
}: WorkExperienceListingsProps) {
	return (
		<div className="space-y-8">
			<section className="space-y-4">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h3 className="text-lg font-semibold text-gray-100">
							Existing experiences
						</h3>
						<p className="text-sm text-gray-400 mt-1">
							Click on any card to edit its details.
						</p>
					</div>

					<Link href="/admin/work-experience/create">
						<button
							type="button"
							className="px-6 py-3 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
						>
							Add new work experience
						</button>
					</Link>
				</div>

				<div className="space-y-3">
					{experiences.map((exp) => (
						<Link key={exp.id} href={`/admin/work-experience/${exp.id}/edit`}>
							<Card className="relative flex flex-col gap-2 rounded-2xl border border-white/5 bg-gray-900/80 px-4 py-4 transition-colors duration-200 hover:border-emerald-400/40 hover:bg-emerald-500/5 cursor-pointer">
								<div className="flex items-start justify-between gap-3">
									<div>
										<p className="text-sm font-semibold text-emerald-300">
											{exp.position}
										</p>
										<p className="text-sm text-gray-300">{exp.company}</p>
									</div>
									<p className="text-xs text-gray-400 text-right">
										{exp.durationLabel ?? ""}
										<br />
										<span className="text-[11px] text-gray-500">
											{exp.location}
										</span>
									</p>
								</div>
								{exp.description ? (
									<p className="mt-1 text-xs text-gray-400 line-clamp-2">
										{exp.description}
									</p>
								) : null}
							</Card>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
}
