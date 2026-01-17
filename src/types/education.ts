export type EducationEntry = {
	id: string;
	institution: string | null;
	degree: string | null;
	durationLabel: string | null;
	startDate: string | null;
	endDate: string | null;
	gpa: string | null;
	description: string | null;
	highlights: string[];
	sortOrder: number;
};

export interface EducationEditFormProps {
	education: EducationEntry;
}
