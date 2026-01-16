"use client";

import { useMemo, useState } from "react";
import type { WorkExperienceDTO } from "@/actions/work-experience-actions";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils";
import {
	WorkExperienceEditForm,
	WorkExperienceForm,
} from "./work-experience-form";

interface WorkExperienceManagerProps {
	experiences: WorkExperienceDTO[];
}

export default function WorkExperienceManager({
	experiences,
}: WorkExperienceManagerProps) {
	// Track which experience is currently selected for editing
	const [selectedId, setSelectedId] = useState<string | null>(
		experiences[0]?.id ?? null,
	);

	const selectedExperience = useMemo(
		() => experiences.find((exp) => exp.id === selectedId) ?? experiences[0],
		[experiences, selectedId],
	);

	// If there are no experiences yet, render the create form directly
	if (experiences.length === 0) {
		return (
			<div className="space-y-8">
				<p className="text-sm text-gray-400 max-w-2xl">
					Create your first work experience entry. You can add achievements and
					technologies now, and support for multiple entries will come later
					without changing this UI.
				</p>
				<WorkExperienceForm />
			</div>
		);
	}

	// When experiences exist, show a two-column layout:
	// - Left: list of experience cards
	// - Right: edit form for the selected experience
	return (
		<div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
			<section className="space-y-4">
				<h3 className="text-lg font-semibold text-gray-100">
					Existing experiences
				</h3>
				<p className="text-sm text-gray-400">
					Select a card to edit its details. The left column is optimized for a
					future multi-entry timeline, even though only a single role is planned
					for now.
				</p>
				<div className="space-y-3">
					{experiences.map((exp) => {
						const isActive = selectedExperience?.id === exp.id;
						return (
							<button
								key={exp.id}
								type="button"
								onClick={() => setSelectedId(exp.id)}
								className="w-full text-left"
							>
								<Card
									className={cn(
										"relative flex flex-col gap-2 rounded-2xl border border-white/5 bg-gray-900/80 px-4 py-4 transition-colors duration-200 hover:border-emerald-400/40",
										isActive &&
											"border-emerald-400/60 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.25)]",
									)}
								>
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
							</button>
						);
					})}
				</div>
			</section>

			<section className="space-y-4">
				<WorkExperienceEditForm experience={selectedExperience} />
			</section>
		</div>
	);
}
