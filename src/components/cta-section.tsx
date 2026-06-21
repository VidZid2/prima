"use client";

import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, VideoIcon } from "lucide-react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { motion, LayoutGroup } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";
import Link from "next/link";
const ctaHeadingVariants = {
	hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 1.2,
			ease: [0.16, 1, 0.3, 1] as const,
		}
	}
};

const ctaSubtextVariants = {
	hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 1.2,
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.15,
		}
	}
};

const ctaButtonVariants = {
	hidden: { opacity: 0, y: 12, filter: "blur(6px)", scale: 0.96 },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		scale: 1,
		transition: {
			duration: 1.0,
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.30,
		}
	}
};

const ctaCardsVariants = {
	hidden: { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.95 },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		scale: 1,
		transition: {
			duration: 1.4,
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.45,
		}
	}
};

const EventCardContent = () => (
	<>
		<div className="flex items-center justify-between mb-5">
			<div className="flex items-center gap-2">
				<div className="size-6 rounded-full bg-zinc-900 border border-border flex items-center justify-center shrink-0">
					<span className="text-white text-[10px] font-bold">PR</span>
				</div>
				<span className="text-sm text-zinc-400 whitespace-nowrap">By PRIMA</span>
			</div>
			<span className="text-sm text-zinc-500">30 Min</span>
		</div>

		<h3 className="text-[22px] font-sans font-semibold text-white tracking-normal uppercase leading-snug mb-2 text-left">
			Project Discovery Call
		</h3>
		<div className="flex items-center gap-1.5 text-[15px] text-zinc-400 mb-6">
			<span>on</span>
			<VideoIcon className="size-4 text-white" />
			<span className="font-medium text-white">Google Meet</span>
		</div>

		<div className="w-full border-t border-dashed border-border mb-5" />

		<div className="space-y-3 text-left">
			<h4 className="text-[15px] font-sans font-bold text-white uppercase tracking-wider">About Session</h4>
			<p className="text-sm text-zinc-400 leading-relaxed">
				Join us for a one-on-one session to discuss your vision. We'll explore our services, map out a potential strategy, and determine the best approach for your brand's digital transformation.
			</p>
		</div>
	</>
);

export function CtaSection() {
	return (
		<section id="partner-with-us" className="w-full max-w-6xl mx-auto px-4 scroll-mt-24">
			<div className="relative border-x pt-0 pb-0">
				<div className="relative border-b bg-background overflow-hidden">
					<AnimatedGradientBackground 
						Breathing={true}
						gradientColors={["rgba(2, 182, 194, 0.22)", "rgba(2, 182, 194, 0.12)", "rgba(2, 182, 194, 0.06)", "rgba(2, 182, 194, 0.03)", "rgba(0, 0, 0, 0.9)", "#000000", "#000000"]}
						gradientStops={[0, 25, 45, 65, 80, 90, 100]}
						centerY="0%"
					/>
					
					{/* Adjusted padding to pb-0 so the cards touch the bottom border and get sliced by overflow-hidden */}
					<div className="px-6 pt-16 pb-0 md:pt-24 md:pb-0 flex flex-col items-center text-center relative z-10">
						{/* Ambient glow behind title for visual depth */}
						<div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-72 h-24 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none -z-10" />

					<LayoutGroup>
						<motion.h2
							variants={ctaHeadingVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: "-80px" }}
							className="text-balance font-sans font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] mb-5 md:mb-4 flex flex-col md:flex-row items-center justify-center gap-2.5 md:gap-0 md:flex-nowrap leading-[1.1] whitespace-nowrap max-md:!blur-none"
							layout
						>
							<motion.span 
								layout 
								transition={{ type: "spring", damping: 30, stiffness: 400 }}
								className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent text-center md:mr-3 lg:mr-4"
							>
								Ready to elevate your
							</motion.span>
							<TextRotate
								texts={["brand?", "vision?", "business?", "future?"]}
								mainClassName="text-white px-2.5 py-0 md:px-4 md:py-0 flex items-center justify-center bg-gradient-to-b from-cyan-600 to-cyan-800 overflow-hidden rounded-lg shadow-[0_10px_24px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_8px_rgba(0,0,0,0.5)] border border-cyan-400/40"
								staggerFrom="last"
								initial={{ y: "100%" }}
								animate={{ y: 0 }}
								exit={{ y: "-120%" }}
								staggerDuration={0.025}
								splitLevelClassName="overflow-hidden"
								transition={{ type: "spring", damping: 30, stiffness: 400 }}
								rotationInterval={2500}
							/>
						</motion.h2>
					</LayoutGroup>
						<motion.p
							variants={ctaSubtextVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: "-80px" }}
							className="text-muted-foreground max-w-xl mx-auto mb-8 text-xs md:text-base px-4 max-md:!blur-none"
						>
							Book a free 30-minute discovery call. We'll explore your goals, outline a strategy, and see how PRIMA can bring your vision to life.
						</motion.p>
						<motion.div
							variants={ctaButtonVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: "-80px" }}
							className="max-md:!blur-none"
						>
							<Link href="#pricing" className="flex items-center justify-center h-11 px-8 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden select-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50 bg-gradient-to-b from-[#2a2a2f] to-[#121214] border border-white/10 hover:border-white/20 hover:from-[#323238] hover:to-[#171719] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_4px_16px_rgba(0,0,0,0.4)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] active:translate-y-[1px] text-zinc-100 group cursor-pointer">
								<span className="relative z-10 flex items-center">
									Book a Discovery Call <ArrowUpRightIcon className="size-4 ml-2 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
								</span>
							</Link>
						</motion.div>

						{/* Overlapping Cards Graphic */}
						<motion.div
							variants={ctaCardsVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: "-60px" }}
							className="mt-16 md:mt-24 relative w-full h-[240px] md:h-[260px] max-md:!blur-none"
						>

							{/* Left Card */}
							<div className="absolute top-12 left-1/2 -translate-x-[110%] lg:-translate-x-[130%] w-[320px] md:w-[400px] bg-[#0c0c0c] border border-border rounded-[20px] p-6 md:p-8 -rotate-[8deg] scale-90 opacity-50 blur-[3px] pointer-events-none hidden md:block">
								<EventCardContent />
							</div>

							{/* Right Card */}
							<div className="absolute top-12 right-1/2 translate-x-[110%] lg:translate-x-[130%] w-[320px] md:w-[400px] bg-[#0c0c0c] border border-border rounded-[20px] p-6 md:p-8 rotate-[8deg] scale-90 opacity-50 blur-[3px] pointer-events-none hidden md:block">
								<EventCardContent />
							</div>

							{/* Center Prominent Card */}
							<div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[320px] md:w-[400px] bg-[#0c0c0c] border border-border rounded-[20px] p-6 md:p-8 shadow-2xl shadow-black">
								<EventCardContent />
							</div>
						</motion.div>

					</div>

				</div>

				{/* Placed outside of overflow-hidden so they extend fully */}
				<DecorIcon className="size-4 text-zinc-600" position="bottom-left" />
				<DecorIcon className="size-4 text-zinc-600" position="bottom-right" />
				<FullWidthDivider className="bg-zinc-800 -bottom-px" />
			</div>
		</section>
	);
}

