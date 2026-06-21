"use client";

import { cn } from "@/lib/utils";
import type React from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { motion } from "framer-motion";
import { 
	CodeIcon, 
	CpuIcon, 
	Gamepad2Icon, 
	BookOpenTextIcon, 
	PresentationIcon, 
	AppWindowIcon 
} from "lucide-react";
import { CpuArchitecture } from "./ui/cpu-architecture";
import { VoiceChat } from "./ui/audio-chat";
import { ProgressiveBlur } from "./ui/progressive-blur";
import { DisplayCards } from "./ui/display-cards";
import { DotLoader } from "./ui/dot-loader";

type FeatureType = {
	title: string;
	icon: React.ReactNode;
	description: string;
	illustration?: React.ReactNode;
};

import { FlickeringGrid } from "@/components/flickering-footer";

export function FeatureSection() {
	return (
		<section id="services" className="w-full max-w-6xl mx-auto px-4 scroll-mt-24">
			<div className="relative border-x py-12 md:py-16">

				
				<div className="relative z-10 mx-auto max-w-3xl text-center mb-10 px-4">
					{/* Ambient glow behind title for visual depth */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-24 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none -z-10" />

					<div className="overflow-hidden py-1">
						<motion.h2 
							initial={{ y: "100%", opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
							className="hero-heading text-balance font-medium text-5xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
						>
							Our <span className="bg-gradient-to-b from-cyan-300 via-cyan-400 to-teal-500 bg-clip-text text-transparent font-semibold">Services</span>
						</motion.h2>
					</div>
					<div className="overflow-hidden py-1">
						<motion.p 
							initial={{ y: "100%", opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
							className="mt-4 text-balance text-muted-foreground text-xs md:text-base px-2"
						>
							Comprehensive digital technology solutions tailored for your growth and innovation.
						</motion.p>
					</div>
				</div>

				<div className="relative border-y border-white/10">
					<DecorIcon className="size-4" position="top-left" />
					<DecorIcon className="size-4" position="top-right" />
					<DecorIcon className="size-4" position="bottom-left" />
					<DecorIcon className="size-4" position="bottom-right" />

					<FullWidthDivider className="-top-px bg-white/10" />
					<div className="overflow-hidden *:pointer-events-none *:select-none">
						<div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
							{features.map((feature, index) => (
								<div 
									key={feature.title} 
									className="h-full bg-black"
								>
									<FeatureCard feature={feature} index={index} className="h-full" />
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

export function FeatureCard({
	feature,
	index,
	className,
	...props
}: React.ComponentProps<"div"> & {
	feature: FeatureType;
	index: number;
}) {
	return (
		<div
			className={cn("relative overflow-hidden bg-black p-6 group h-full", className)}
			{...props}
		>

			{feature.illustration && (
				<motion.div 
					initial={{ opacity: 0, y: 16, scale: 0.98 }}
					whileInView={{ opacity: 1, y: 0, scale: 1 }}
					viewport={{ once: true, margin: "-60px" }}
					transition={{
						type: "spring",
						stiffness: 80,
						damping: 15,
						mass: 1,
						delay: index * 0.06
					}}
					className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
				>
					{/* Fade + Blur mask for smooth frosting effect over the image */}
					<div 
						className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/80 to-transparent backdrop-blur-md"
						style={{ 
							WebkitMaskImage: 'linear-gradient(to right, white 40%, transparent)', 
							maskImage: 'linear-gradient(to right, white 40%, transparent)' 
						}}
					/>
					<div className="absolute top-4 left-[40%] opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:-translate-x-2 z-0">
						{feature.illustration}
					</div>
				</motion.div>
			)}

			<motion.div
				initial={{ opacity: 0, y: 16, scale: 0.98 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{
					type: "spring",
					stiffness: 80,
					damping: 15,
					mass: 1,
					delay: index * 0.06
				}}
				className="relative z-20 h-full flex flex-col justify-between"
			>
				<div>
					<div className="[&_svg]:size-6 [&_svg]:text-foreground/75">
						{feature.icon}
					</div>
					<h3 className="mt-10 text-sm md:text-base font-sans font-semibold uppercase tracking-normal">{feature.title}</h3>
					<p className="mt-2 font-light text-muted-foreground text-xs leading-relaxed">
						{feature.description}
					</p>
				</div>
			</motion.div>
		</div>
	);
}

function EngineeringIllustration() {
	return (
		<div className="relative w-96 h-64 flex items-center justify-center">
			<CpuArchitecture 
				className="w-full h-full scale-[1.4] -translate-x-16 -translate-y-20 opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
				animateLines={true} 
				animateMarkers={true} 
				animateText={true} 
			/>
		</div>
	);
}

function SeminarsIllustration() {
	return (
		<div className="relative w-96 h-64 flex items-center justify-center">
			<div className="relative z-10 scale-[0.65] origin-center -translate-y-4 -translate-x-2">
				<VoiceChat />
			</div>
		</div>
	);
}

const thesisContent = [
	{ type: "title", text: "Exploring the Impact of Artificial Intelligence on Modern Web Development Paradigms" },
	{ type: "heading", text: "Abstract" },
	{ type: "paragraph", text: "This study investigates the integration of AI-driven coding assistants and their effect on software architecture, code maintainability, and developer productivity." },
	{ type: "heading", text: "Chapter 1: Introduction" },
	{ type: "paragraph", text: "The rapid advancement of large language models has fundamentally altered the landscape of software engineering." },
	{ type: "heading", text: "1.1 Statement of the Problem" },
	{ type: "paragraph", text: "Despite widespread adoption, the long-term impact of AI-generated code on technical debt remains under-explored." },
	{ type: "heading", text: "Chapter 2: Literature Review" },
	{ type: "paragraph", text: "Previous studies have highlighted the short-term productivity gains, yet raise concerns regarding code quality." },
	{ type: "heading", text: "Chapter 3: Methodology" },
	{ type: "paragraph", text: "A mixed-methods approach was utilized, surveying 500 professional developers and analyzing 10,000 commits." },
	{ type: "heading", text: "Chapter 4: Results & Discussion" },
	{ type: "paragraph", text: "Findings indicate a 40% increase in development speed, coupled with a slight increase in refactoring needs." },
	{ type: "heading", text: "Chapter 5: Conclusion" },
	{ type: "paragraph", text: "AI acts as a powerful force multiplier, provided that strict code review protocols are maintained." },
	{ type: "heading", text: "References" },
	{ type: "paragraph", text: "[1] Doe, J. (2024). AI in Software Engineering. Journal of Technology, 45(2), 112-130." },
];

function ThesisIllustration() {
	return (
		<div className="relative w-96 h-64 flex items-center justify-center p-4">
			<style dangerouslySetInnerHTML={{__html: `
				@keyframes scroll-thesis {
					0% { transform: translateY(0); }
					100% { transform: translateY(-50%); }
				}
				.animate-scroll-thesis {
					animation: scroll-thesis 25s linear infinite;
				}
			`}} />
			
			{/* We use a wider and taller container, scaled down, so it comfortably fills the background down to the bottom edge */}
			<div className="relative w-[32rem] h-[160%] scale-[0.75] origin-top -translate-x-8 -translate-y-8 rounded-xl border border-border bg-black/40 overflow-hidden shadow-2xl [mask-image:linear-gradient(to_right,transparent,black_25%)]">
				{/* Inner wrapper with vertical fade mask to ensure text smoothly disappears at top and bottom */}
				<div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] pointer-events-none">
					{/* Inner content that scrolls */}
					<div className="absolute left-0 right-0 top-0 animate-scroll-thesis flex flex-col pt-4">
						{/* Render twice for seamless looping */}
						{[...thesisContent, ...thesisContent].map((item, index) => (
							<div key={index} className="px-5 mb-4">
								{item.type === "title" && (
									<h3 className="text-sm font-bold text-white/90 leading-snug mb-2">{item.text}</h3>
								)}
								{item.type === "heading" && (
									<h4 className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider mb-1">{item.text}</h4>
								)}
								{item.type === "paragraph" && (
									<p className="text-[10px] text-white/60 leading-relaxed">{item.text}</p>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function SoftwareIllustration() {
	return (
		<div className="relative w-96 h-64 flex items-center justify-center p-4">
			{/* Core Glow */}
			<div className="absolute bg-blue-500/10 blur-[50px] w-56 h-56 rounded-full" />
			<div className="absolute bg-cyan-500/10 blur-[40px] w-48 h-48 rounded-full translate-x-8" />
			
			<div className="relative z-10 scale-[0.55] origin-center -translate-x-16 -translate-y-16">
				<DisplayCards />
			</div>
		</div>
	);
}

const gameFrames = [
    [14, 7, 0, 8, 6, 13, 20],
    [14, 7, 13, 20, 16, 27, 21],
    [14, 20, 27, 21, 34, 24, 28],
    [27, 21, 34, 28, 41, 32, 35],
    [34, 28, 41, 35, 48, 40, 42],
    [34, 28, 41, 35, 48, 42, 46],
    [34, 28, 41, 35, 48, 42, 38],
    [34, 28, 41, 35, 48, 30, 21],
    [34, 28, 41, 48, 21, 22, 14],
    [34, 28, 41, 21, 14, 16, 27],
    [34, 28, 21, 14, 10, 20, 27],
    [28, 21, 14, 4, 13, 20, 27],
    [28, 21, 14, 12, 6, 13, 20],
    [28, 21, 14, 6, 13, 20, 11],
    [28, 21, 14, 6, 13, 20, 10],
    [14, 6, 13, 20, 9, 7, 21],
];

function GameIllustration() {
	return (
		<div className="relative w-96 h-64 flex items-center justify-center p-4">
			{/* Core Glow */}
			<div className="absolute bg-cyan-500/5 blur-[50px] w-56 h-56 rounded-full" />
			<div className="absolute bg-teal-500/5 blur-[40px] w-48 h-48 rounded-full translate-x-8" />
			
			<div className="relative z-10 scale-[1.5] origin-center -translate-y-12 -translate-x-12">
				<div className="flex items-center gap-5 rounded-xl border border-border bg-black/50 backdrop-blur-md px-5 py-4 text-white shadow-2xl">
					<DotLoader
						frames={gameFrames}
						className="gap-0.5"
						dotClassName="bg-white/15 [&.active]:bg-white size-1.5"
					/>
					<p className="font-semibold text-xs tracking-wider text-white/90 uppercase">Playing</p>
				</div>
			</div>
		</div>
	);
}

const features: FeatureType[] = [
	{
		title: "Website Development",
		icon: <CodeIcon />,
		description: "Need a custom web application? We build custom, functional web applications—from front-end design to database integration.",
		illustration: <WebDevIllustration />,
	},
	{
		title: "Engineering Services",
		icon: <CpuIcon />,
		description: "Your All-In-One Solution to your Engineering concerns & innovations. Embedded Systems, IoT, AI, Robotics, Electronics, and 3D Modeling.",
		illustration: <EngineeringIllustration />,
	},
	{
		title: "Game Development",
		icon: <Gamepad2Icon />,
		description: "Bring your game ideas to life! From concept to code, we build engaging and fun games. Assets creation, SFX/BGM, and Programming.",
		illustration: <GameIllustration />,
	},
	{
		title: "Thesis Documentation",
		icon: <BookOpenTextIcon />,
		description: "Struggling with your thesis write-up? We transform ideas into well-documented success—from concept to completion.",
		illustration: <ThesisIllustration />,
	},
	{
		title: "Seminars & Trainings",
		icon: <PresentationIcon />,
		description: "Ready to sharpen your expertise? We transform knowledge into confidence—through dynamic seminars and practical trainings.",
		illustration: <SeminarsIllustration />,
	},
	{
		title: "Software Applications",
		icon: <AppWindowIcon />,
		description: "Bring your software ideas to life! We build custom, scalable applications tailored exactly to your unique business or academic requirements.",
		illustration: <SoftwareIllustration />,
	},
];

function WebDevIllustration() {
	return (
		<div className="relative w-96 h-64 flex items-center justify-center">
			<style dangerouslySetInnerHTML={{__html: `
				@keyframes scroll-website {
					0%, 15% { transform: translateY(0); }
					45%, 55% { transform: translateY(-40%); }
					85%, 100% { transform: translateY(0); }
				}
				.animate-scroll-website {
					animation: scroll-website 12s cubic-bezier(0.65, 0, 0.35, 1) infinite;
				}
			`}} />

			{/* Animated Background Elements */}
			<div className="absolute w-56 h-56 border border-border/30 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
			<div className="absolute w-72 h-72 border border-border/20 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed" />
			
			{/* Soft Glow Behind */}
			<div className="absolute bg-cyan-500/20 blur-[60px] w-64 h-64 rounded-full animate-pulse" />

			{/* Website Mockup */}
			<div className="relative w-80 h-56 rounded-xl border border-border bg-[#202124] backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden transition-transform duration-700 group-hover:scale-105">
				{/* Inner Glow/Shadow for Depth */}
				<div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] pointer-events-none z-20" />

				{/* Chrome/Edge Browser Header */}
				<div className="flex flex-col shrink-0 bg-[#202124] border-b border-border relative z-10">
					{/* Title Bar & Tabs */}
					<div className="h-7 flex items-end px-2 pt-1 relative">
						{/* Tab */}
						<div className="h-6 w-32 bg-[#323639] rounded-t-md flex items-center px-2.5 gap-1.5 relative z-10 before:absolute before:left-[-8px] before:bottom-0 before:w-2 before:h-2 before:rounded-br-md before:shadow-[4px_0_0_0_#323639] after:absolute after:right-[-8px] after:bottom-0 after:w-2 after:h-2 after:rounded-bl-md after:shadow-[-4px_0_0_0_#323639]">
							<div className="size-2.5 rounded-sm bg-blue-500 flex items-center justify-center shadow-[0_0_5px_rgba(59,130,246,0.5)]"><span className="text-[5px] text-white font-bold">N</span></div>
							<span className="text-[8px] text-white/80 font-medium truncate tracking-wide">NEXUS Dashboard</span>
						</div>
						{/* Windows Controls (Right side) */}
						<div className="absolute top-0 right-0 h-full flex">
							<div className="h-full px-2.5 flex items-center hover:bg-white/10 transition-colors cursor-default"><svg className="w-2.5 h-2.5 text-white/70" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M0 5h10" /></svg></div>
							<div className="h-full px-2.5 flex items-center hover:bg-white/10 transition-colors cursor-default"><svg className="w-2.5 h-2.5 text-white/70" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="1" y="1" width="8" height="8" /></svg></div>
							<div className="h-full px-3 flex items-center hover:bg-red-500 hover:text-white transition-colors cursor-default group/close"><svg className="w-2.5 h-2.5 text-white/70 group-hover/close:text-white" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M1 1l8 8m0-8L1 9" /></svg></div>
						</div>
					</div>
					{/* Navigation/Address Bar */}
					<div className="h-8 bg-[#323639] flex items-center px-2 gap-2 border-b border-border">
						{/* Nav Buttons */}
						<div className="flex gap-0.5">
							<div className="p-1 rounded-full hover:bg-white/10 transition-colors"><svg className="size-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg></div>
							<div className="p-1 rounded-full hover:bg-white/10 transition-colors"><svg className="size-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></div>
							<div className="p-1 rounded-full hover:bg-white/10 transition-colors"><svg className="size-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></div>
						</div>
						{/* URL Bar */}
						<div className="flex-1 h-5 bg-[#202124] rounded-full flex items-center px-2 gap-1.5 border border-border">
							<svg className="size-2.5 text-white/40" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
							<span className="text-[9px] text-white/80 font-sans tracking-wide">nexus.dev<span className="text-white/40">/dashboard</span></span>
						</div>
					</div>
				</div>
				
				{/* Website Content Wrapper for Scrolling */}
				<div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
					<div className="flex flex-col p-4 gap-4 h-[160%] animate-scroll-website">
						{/* Faint Inner Grid for Texture */}
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
						
						{/* Nav */}
						<div className="flex items-center justify-between relative z-10">
							<div className="flex items-center gap-1.5">
								<div className="size-5 rounded bg-blue-500/20 flex items-center justify-center border border-border/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
									<span className="text-[10px] font-bold text-blue-400">N</span>
								</div>
								<span className="text-[10px] font-bold text-white tracking-tight">NEXUS</span>
							</div>
							<div className="flex gap-3">
								<span className="text-[8px] font-medium text-white/50">Platform</span>
								<span className="text-[8px] font-medium text-white/50">Solutions</span>
								<span className="text-[8px] font-medium text-white/50">Company</span>
							</div>
						</div>
						
						{/* Hero Area */}
						<div className="flex flex-col items-center justify-center gap-1.5 mt-2 relative z-10">
							<h1 className="text-sm font-bold text-white tracking-tight drop-shadow-md">Deploy Faster.</h1>
							<p className="text-[8px] text-white/60 text-center px-4 leading-relaxed">The ultimate platform for modern software teams to ship scalable applications.</p>
							<button className="mt-2 px-4 py-1.5 bg-blue-500 hover:bg-blue-400 text-white text-[8px] font-bold rounded shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
								Get Started
							</button>
						</div>
						
						{/* Grid */}
						<div className="grid grid-cols-3 gap-3 mt-4 relative z-10">
							<div className="h-16 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-border p-2.5 flex flex-col gap-1.5 shadow-lg backdrop-blur-md">
								<div className="size-4 rounded flex items-center justify-center bg-cyan-500/20 border border-border/30">
									<span className="text-[8px]">⚡</span>
								</div>
								<span className="text-[9px] font-semibold text-white mt-auto">Performant</span>
							</div>
							<div className="h-16 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-border p-2.5 flex flex-col gap-1.5 shadow-lg backdrop-blur-md">
								<div className="size-4 rounded flex items-center justify-center bg-purple-500/20 border border-border/30">
									<span className="text-[8px]">🛡️</span>
								</div>
								<span className="text-[9px] font-semibold text-white mt-auto">Reliable</span>
							</div>
							<div className="h-16 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-border p-2.5 flex flex-col gap-1.5 shadow-lg backdrop-blur-md">
								<div className="size-4 rounded flex items-center justify-center bg-blue-500/20 border border-border/30">
									<span className="text-[8px]">📈</span>
								</div>
								<span className="text-[9px] font-semibold text-white mt-auto">Scalable</span>
							</div>
						</div>

						{/* Bottom Extra Content for Scrolling */}
						<div className="mt-2 p-3 rounded-lg border border-border bg-white/[0.02] backdrop-blur-sm flex flex-col gap-2 relative z-10">
							<div className="h-2 w-1/3 bg-white/10 rounded-full" />
							<div className="h-12 w-full bg-black/50 rounded flex flex-col items-start justify-center px-3 border border-border shadow-inner">
								<span className="text-[7px] text-pink-400 font-mono">import <span className="text-white">{"{"} Nexus {"}"}</span> from <span className="text-green-400">"@nexus/core"</span>;</span>
								<span className="text-[7px] text-blue-400 font-mono mt-1"><span className="text-white">Nexus.</span>deploy<span className="text-white">();</span></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
