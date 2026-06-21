import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";

const steps = [
	{
		step: "01",
		title: "Discovery & Strategy",
		description: "We align with your vision, analyze requirements, and define a clear roadmap for success.",
	},
	{
		step: "02",
		title: "Design & Architecture",
		description: "We craft intuitive user experiences and build a scalable technical foundation.",
	},
	{
		step: "03",
		title: "Development",
		description: "Our engineers write clean, efficient code to bring your digital product to life.",
	},
	{
		step: "04",
		title: "Deployment & Scaling",
		description: "We launch your product seamlessly and ensure it's ready to handle growth.",
	},
];

import { FlickeringGrid } from "@/components/flickering-footer";

export function ProcessSection() {
	return (
		<section id="process" className="w-full max-w-6xl mx-auto px-4 scroll-mt-24">
			<div className="relative border-x py-12 md:py-16">

				
				<DecorIcon className="size-4" position="top-left" />
				<DecorIcon className="size-4" position="top-right" />

				<FullWidthDivider className="-top-px bg-white/10" />

				<div className="relative z-10 mx-auto max-w-3xl text-center mb-10 px-4">
					<h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
						How It Works
					</h2>
					<p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
						A simple, transparent process to turn your ideas into reality.
					</p>
				</div>

				<div className="relative border-y border-white/10">
					<DecorIcon className="size-4" position="top-left" />
					<DecorIcon className="size-4" position="top-right" />
					<DecorIcon className="size-4" position="bottom-left" />
					<DecorIcon className="size-4" position="bottom-right" />

					<FullWidthDivider className="-top-px bg-white/10" />
					<div className="overflow-hidden">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
							{steps.map((step, i) => (
								<div key={i} className="relative p-8 md:p-10 bg-background hover:bg-neutral-900 transition-colors group">
									<div className="text-4xl font-mono text-[#42E2D5]/50 mb-6 transition-colors group-hover:text-[#42E2D5]">
										{step.step}
									</div>
									<h3 className="text-lg md:text-xl font-semibold mb-3">{step.title}</h3>
									<p className="font-light text-muted-foreground text-sm leading-relaxed">
										{step.description}
									</p>
								</div>
							))}
						</div>
					</div>
					<FullWidthDivider className="-bottom-px bg-white/10" />
				</div>
			</div>
		</section>
	);
}
