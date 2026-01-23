import DockerIcon from "@/assets/icons/stacks/minified/docker-icon.tsx";
import LaravelIcon from "@/assets/icons/stacks/minified/laravel-icon.tsx";
import NestJSIcon from "@/assets/icons/stacks/minified/nestjs-icon.tsx";
import NextJSIcon from "@/assets/icons/stacks/minified/nextjs-icon.tsx";
import PostgreSQLIcon from "@/assets/icons/stacks/minified/postgres-icon.tsx";
import PrismaIcon from "@/assets/icons/stacks/minified/prisma-icon.tsx";
import { FadeIn, TechStackCard } from "@/components/animations";

const techStacks = [
	{
		name: "Next.js",
		icon: <NextJSIcon className="size-10 fill-[url(#tech-icon-gradient)]" />,
	},
	{
		name: "Laravel",
		icon: <LaravelIcon className="size-10 fill-[url(#tech-icon-gradient)]" />,
	},
	{
		name: "NestJS",
		icon: <NestJSIcon className="size-10 fill-[url(#tech-icon-gradient)]" />,
	},
	{
		name: "PostgreSQL",
		icon: (
			<PostgreSQLIcon className="size-10 fill-[url(#tech-icon-gradient)]" />
		),
	},
	{
		name: "Prisma",
		icon: <PrismaIcon className="size-10 fill-[url(#tech-icon-gradient)]" />,
	},
	{
		name: "Docker",
		icon: <DockerIcon className="size-10 fill-[url(#tech-icon-gradient)]" />,
	},
];

export default function AboutTechStacksGrid() {
	return (
		<FadeIn delay={0.5}>
			<div className="space-y-6">
				<h3 className="heading-3 text-center">My Stacks</h3>
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
					{techStacks.map((tech, index) => (
						<TechStackCard key={tech.name} tech={tech} index={index} />
					))}
				</div>
			</div>
		</FadeIn>
	);
}
