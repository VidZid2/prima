"use client";

import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import Grainient from "@/components/Grainient";
import { motion } from "framer-motion";

export function TestimonialsSection() {
	return (
		<section id="client-success" className="relative w-full max-w-6xl mx-auto px-4 scroll-mt-24">
			<div className="relative border-x pt-12 md:pt-16 pb-12 md:pb-16">

				<motion.div 
					initial={{ opacity: 0, y: 15, scale: 1.05 }}
					whileInView={{ opacity: 1, y: 0, scale: 1 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
					className="relative z-20 mx-auto max-w-3xl text-center mb-12 md:mb-16 px-4"
				>
					{/* Ambient glow behind title for visual depth */}
					<div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-72 h-24 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none -z-10" />

					<h2 className="hero-heading text-balance font-medium text-5xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
						About <br className="sm:hidden" /><span className="bg-gradient-to-b from-cyan-300 via-cyan-400 to-teal-500 bg-clip-text text-transparent font-semibold">PRIMA</span>
					</h2>
					<p className="mt-4 text-balance text-muted-foreground text-xs md:text-base px-2 tracking-wide uppercase font-medium">
						Your Goals, Our Mission
					</p>
				</motion.div>

				<motion.div 
					initial={{ opacity: 0, y: 40, scale: 1.02 }}
					whileInView={{ opacity: 1, y: 0, scale: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
					className="relative border-y border-white/10"
				>
					{/* Overflow-hidden container for background canvas */}
					<div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
						<div 
							className="absolute inset-0 opacity-40"
							style={{
								maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
								WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
							}}
						>
							<Grainient
								color1="#02b6c2"
								color2="#474747"
								color3="#595959"
								timeSpeed={0.25}
								colorBalance={0}
								warpStrength={1}
								warpFrequency={5}
								warpSpeed={2}
								warpAmplitude={50}
								blendAngle={0}
								blendSoftness={0.05}
								rotationAmount={500}
								noiseScale={2}
								grainAmount={0.1}
								grainScale={2}
								grainAnimated={false}
								contrast={1.5}
								gamma={1}
								saturation={1}
								centerX={0}
								centerY={0}
								zoom={0.9}
							/>
						</div>
					</div>

					<DecorIcon className="size-4" position="top-left" />
					<DecorIcon className="size-4" position="top-right" />
					<DecorIcon className="size-4" position="bottom-left" />
					<DecorIcon className="size-4" position="bottom-right" />

					<FullWidthDivider className="-top-px bg-white/10" />
					
					<div className="relative z-10 overflow-hidden bg-transparent py-20 px-6 md:px-12 max-w-4xl mx-auto flex flex-col items-center text-center">
						<p className="text-xl md:text-3xl font-light text-zinc-200 leading-relaxed md:leading-relaxed mb-8">
							PRIMA is a digital technology solutions provider that delivers cutting-edge software, engineering, and digital services.
						</p>
						<p className="text-lg md:text-xl font-light text-zinc-400 leading-relaxed md:leading-relaxed max-w-3xl">
							Our mission is to transform ideas into robust, scalable, and innovative solutions that empower businesses to thrive in the digital age. We partner with innovators to build the future.
						</p>
					</div>

					<FullWidthDivider className="-bottom-px bg-white/10" />
				</motion.div>
			</div>
		</section>
	);
}
