"use client";

import { cn } from "@/lib/utils";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import { LogoCloud } from "@/components/logo-cloud";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { motion } from "framer-motion";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { UpgradeBanner } from "@/components/ui/upgrade-banner";
import Link from "next/link";
import { useState } from "react";
import { ContactModal } from "@/components/contact-modal";

export function HeroSection() {
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	return (
		<section id="about-prima" className="relative w-full overflow-hidden bg-background min-h-screen flex flex-col -mt-20 pt-20">
			<AnimatedGradientBackground 
				Breathing={true}
				gradientColors={["rgba(0, 255, 255, 0.25)", "rgba(0, 255, 255, 0.15)", "rgba(0, 255, 255, 0.08)", "rgba(0, 255, 255, 0.04)", "rgba(0, 0, 0, 0.9)", "#000000", "#000000"]}
				gradientStops={[0, 20, 40, 60, 80, 90, 100]}
				centerY="0%"
			/>
			<div className="relative z-10 w-full flex flex-col min-h-screen">
					{/* Soft Center Glow */}
					<div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

					{/* Main Hero Content */}
					<div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pt-32 pb-24">
						<motion.div 
							initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							transition={{ 
								duration: 0.9, 
								delay: 0.15,
								ease: [0.16, 1, 0.3, 1] 
							}}
							className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center z-10 relative"
						>
							{/* Top Pill Badge */}
							<UpgradeBanner 
								className="mb-8 z-20 relative" 
								buttonText="✨ Introducing PRIMA" 
								description="Explore our new services" 
								href="#services"
							/>

							{/* Main Headline */}
							<div className="relative">
								{/* Ambient glow behind title for visual depth */}
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />
								
								<h1 className="text-center font-sans font-medium text-[10vw] sm:text-5xl md:text-7xl lg:text-[80px] leading-[1.1] md:leading-[1.05] tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] mb-6 max-w-6xl">
									<span className="whitespace-nowrap">Build the Team That</span><br/>
									<PointerHighlight delay={1.2} containerClassName="inline-block" pointerClassName="text-cyan-400" rectangleClassName="border-cyan-400/40 bg-cyan-500/5">
										<span className="text-[8.5vw] sm:text-inherit font-heading hero-heading bg-gradient-to-b from-cyan-300 via-cyan-400 to-teal-500 bg-clip-text text-transparent font-semibold inline-block whitespace-nowrap">Takes You Further</span>
									</PointerHighlight>
								</h1>
							</div>

							{/* Subheadline */}
							<p className="text-center text-sm sm:text-base md:text-xl text-white/60 tracking-wide max-w-2xl font-light mb-10">
								Connecting you with world-class talent to<br/>scale, innovate and lead
							</p>

							{/* Buttons */}
							<div className="flex items-center gap-4">
								<button onClick={() => setIsContactModalOpen(true)} className="flex items-center justify-center gap-2 px-6 h-12 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group/hero-btn select-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50 bg-gradient-to-b from-[#2a2a2f] to-[#121214] border border-white/10 hover:border-white/20 hover:from-[#323238] hover:to-[#171719] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_4px_16px_rgba(0,0,0,0.4)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] active:translate-y-[1px] text-zinc-100 cursor-pointer">
									<PhoneIcon className="size-4 text-white/60 group-hover/hero-btn:text-white transition-colors relative z-10" />
									<span className="relative z-10">Let's Talk</span>
								</button>
								<LiquidMetalButton label="Get started" onClick={() => { window.location.href = "#pricing"; }} />
							</div>
						</motion.div>
					</div>

					{/* Trusted By Section (Fixed at bottom) */}
					{/* Trusted By Section (Fixed at bottom) */}
					<div className="w-full flex flex-col items-center relative z-10 mt-auto border-b border-border">
						{/* SVG Curved Tab Line */}
						<div className="relative w-full flex items-end h-[40px]">
							{/* Left Line */}
							<div className="flex-1 h-[1px] bg-white/10" />
							
							{/* Left Curve */}
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/10 shrink-0 overflow-visible">
								<path d="M0 40 C 20 40 20 0 40 0" stroke="currentColor" strokeWidth="1" fill="none" />
							</svg>
							
							{/* Center Text block */}
							<div className="h-[40px] px-8 flex items-center justify-center relative">
								<div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
								<motion.span 
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
									className="font-medium text-white/60 tracking-tight md:text-lg lg:text-xl block pt-2"
								>
									Trusted Partners
								</motion.span>
							</div>
							
							{/* Right Curve */}
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/10 shrink-0 overflow-visible">
								<path d="M0 0 C 20 0 20 40 40 40" stroke="currentColor" strokeWidth="1" fill="none" />
							</svg>
							
							{/* Right Line */}
							<div className="flex-1 h-[1px] bg-white/10" />
						</div>
						
						<motion.div 
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ 
								type: "spring",
								stiffness: 70,
								damping: 15,
								mass: 1,
								delay: 0.25
							}}
							className="w-full max-w-6xl mx-auto px-0 lg:px-4"
						>
							<LogoCloud />
						</motion.div>
					</div>
				</div>
			<ContactModal 
				isOpen={isContactModalOpen} 
				onClose={() => setIsContactModalOpen(false)} 
				defaultService="General Inquiry" 
			/>
		</section>
	);
}
