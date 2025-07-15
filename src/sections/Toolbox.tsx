import { Section } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import JavaScriptIcon from "@/assets/icons/stacks/minified/js.svg";
import TypeScriptIcon from "@/assets/icons/stacks/minified/ts.svg";
import ReactIcon from "@/assets/icons/stacks/minified/react.svg";
import NextJSIcon from "@/assets/icons/stacks/minified/nextjs.svg";
import NestJSIcon from "@/assets/icons/stacks/minified/nestjs.svg";
import PHPIcon from "@/assets/icons/stacks/minified/php.svg";
import LaravelIcon from "@/assets/icons/stacks/minified/laravel.svg";
import MySQLIcon from "@/assets/icons/stacks/minified/mysql.svg";
import PostgreSQLIcon from "@/assets/icons/stacks/minified/postgres.svg";
import PrismaIcon from "@/assets/icons/stacks/minified/prisma.svg";
import TailwindCssIcon from "@/assets/icons/stacks/minified/tailwindcss.svg";
import SASSIcon from "@/assets/icons/stacks/minified/sass.svg";
import RedisIcon from "@/assets/icons/stacks/minified/redis.svg";
import DockerIcon from "@/assets/icons/stacks/minified/docker.svg";
import GitIcon from "@/assets/icons/stacks/minified/git.svg";
import ToolBoxItems from "@/components/block/ToolBoxItems";

// Toolbox items with tech stack
const toolboxItemsOne = [
	{ title: "JavaScript", icon: <JavaScriptIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "TypeScript", icon: <TypeScriptIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "React", icon: <ReactIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Next.js", icon: <NextJSIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "NestJS", icon: <NestJSIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "PHP", icon: <PHPIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Laravel", icon: <LaravelIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
];

const toolboxItemsTwo = [
	{ title: "MySQL", icon: <MySQLIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "PostgreSQL", icon: <PostgreSQLIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Prisma ORM", icon: <PrismaIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Tailwind CSS", icon: <TailwindCssIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "SASS", icon: <SASSIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Redis", icon: <RedisIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Docker", icon: <DockerIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Git", icon: <GitIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
];

export default function ToolboxSection() {
	return (
		<Section className="relative overflow-hidden">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center mb-16">
							<h2 className="heading-2 mb-4">
								My <span className="gradient-text">Toolbox</span>
							</h2>
							<p className="body-large text-gray-400 max-w-2xl mx-auto">Explore the technologies and tools I use to craft exceptional digital experiences.</p>
						</div>
					</FadeIn>

					{/* Toolbox Grid */}
					<FadeIn delay={0.2}>
						<div className="flex flex-col gap-8">
							{/* First row (toolboxItemsOne) */}
							<div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
								<div className="flex w-max gap-4 mx-auto animate-move-left [animation-duration:30s]">
									{[...toolboxItemsOne, ...toolboxItemsOne].map((item, index) => (
										<ToolBoxItems key={`${item.title}-${index}`} item={item} index={index} />
									))}
								</div>
							</div>

							{/* Second row (toolboxItemsTwo) */}
							<div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
								<div className="flex w-max gap-4 mx-auto animate-move-right [animation-duration:30s]">
									{[...toolboxItemsTwo, ...toolboxItemsTwo].reverse().map((item, index) => (
										<ToolBoxItems key={`${item.title}-${index}`} item={item} index={index} />
									))}
								</div>
							</div>
						</div>
					</FadeIn>

					{/* Additional info */}
					<FadeIn delay={0.4}>
						<div className="text-center mt-12">
							<p className="text-gray-400 text-sm">And many more tools and technologies that I continue to explore and master.</p>
						</div>
					</FadeIn>
				</StaggerContainer>
			</div>
		</Section>
	);
}
