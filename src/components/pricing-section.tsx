"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { retainerCards, quoteCards } from "@/config/pricing-data";
import { motion, AnimatePresence } from "framer-motion";
import { ContactModal } from "@/components/contact-modal";
import { 
	CheckIcon, 
	ChevronDownIcon, 
	ClockIcon, 
	InfoIcon, 
	ExternalLinkIcon, 
	CodeIcon, 
	AppWindowIcon, 
	LayoutIcon, 
	CpuIcon, 
	NetworkIcon, 
	CogIcon, 
	Gamepad2Icon, 
	BookOpenTextIcon, 
	PresentationIcon, 
	Sparkles 
} from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export function PricingSection() {
	return (
		<Suspense fallback={
			<section className="w-full max-w-6xl mx-auto px-4 py-24 text-center text-zinc-400">
				Loading pricing...
			</section>
		}>
			<PricingSectionInner />
		</Suspense>
	);
}

const headerVariants = {
	hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { 
			duration: 1.2, 
			ease: [0.16, 1, 0.3, 1] as const 
		}
	}
};

const containerVariants = {
	hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { 
			duration: 1.4, 
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.15
		}
	}
};

const leftColumnVariants = {
	hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { 
			duration: 1.2, 
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.30
		}
	}
};

const rightHeaderVariants = {
	hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { 
			duration: 1.2, 
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.45
		}
	}
};

const gridVariants = {
	hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { 
			duration: 1.4, 
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.60
		}
	}
};

const featureItemVariants = {
	hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
	show: (i: number) => ({
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { 
			duration: 0.8, 
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.60 + i * 0.05
		}
	})
};

const bottomRowVariants = {
	hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { 
			duration: 1.2, 
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.80
		}
	}
};

function PricingSectionInner() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const [viewRetainers, setViewRetainersState] = useState(false);
	const [activeTab, setActiveTabState] = useState(3); // Default to Engineering Services
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [activeTier, setActiveTierState] = useState(1); // Default to Best
	const [fastPriority, setFastPriorityState] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Read URL query parameters on mount or change
	useEffect(() => {
		const service = searchParams.get("service");
		const mode = searchParams.get("mode");
		const tier = searchParams.get("tier");
		const priority = searchParams.get("priority");

		const serviceKeys = ["thesis", "training", "website", "engineering", "software", "game"];
		if (service && serviceKeys.includes(service)) {
			setActiveTabState(serviceKeys.indexOf(service));
		}
		if (mode) {
			setViewRetainersState(mode === "retainer");
		}
		const tierKeys = ["basic", "best", "ultimate"];
		if (tier && tierKeys.includes(tier)) {
			setActiveTierState(tierKeys.indexOf(tier));
		}
		if (priority) {
			setFastPriorityState(priority === "true");
		}
	}, [searchParams]);

	// Consolidated helper to update multiple URL parameters atomically
	const updateQueryParams = (updates: Record<string, string | null>) => {
		const params = new URLSearchParams(searchParams.toString());
		Object.entries(updates).forEach(([key, value]) => {
			if (value === null) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		});
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const updateService = (index: number) => {
		setActiveTabState(index);
		const serviceKeys = ["thesis", "training", "website", "engineering", "software", "game"];
		updateQueryParams({ service: serviceKeys[index] });
	};

	const updateMode = (isRetainer: boolean) => {
		setViewRetainersState(isRetainer);
		updateQueryParams({ mode: isRetainer ? "retainer" : "quote" });
	};

	const updateTier = (tierIndex: number) => {
		setActiveTierState(tierIndex);
		const tierKeys = ["basic", "best", "ultimate"];
		updateQueryParams({ tier: tierKeys[tierIndex] });
	};

	const updatePriority = (isPriority: boolean) => {
		setFastPriorityState(isPriority);
		updateQueryParams({ priority: isPriority ? "true" : "false" });
	};

	const categories = [
		{ name: "Thesis Documentation", index: 0 },
		{ name: "Seminars & Trainings", index: 1 },
		{ name: "Website Development", index: 2 },
		{ name: "Engineering Services", index: 3 },
		{ name: "Software Applications", index: 4 },
		{ name: "Game Development", index: 5 }
	];

	const cards = viewRetainers ? retainerCards : quoteCards;
	const activeCard = cards[activeTab];
	const tierKeys = ["basic", "best", "ultimate"] as const;
	const activeTierKey = tierKeys[activeTier];
	
	const activeFeatures = [
		...(activeCard.features[activeTierKey] || []).map(f => ({ ...f, isPriorityAddon: false })),
		...(fastPriority ? (activeCard.features.priority || []).map(f => ({ ...f, isPriorityAddon: true })) : [])
	];

	const getTurnaroundLimit = (pkgLimit: string, tierIndex: number) => {
		if (!fastPriority) return pkgLimit;
		if (viewRetainers) {
			if (tierIndex === 0) return "Priority support";
			if (tierIndex === 1) return "24/7 Urgent support";
			return "Immediate hotseat support";
		} else {
			if (tierIndex === 0) return "Priority delivery";
			if (tierIndex === 1) return "Express delivery";
			return "Immediate delivery";
		}
	};

	return (
		<section id="pricing" className="w-full max-w-6xl mx-auto px-4">
			<div className="relative border-x border-white/10 pt-12 pb-0">
				<motion.div 
					variants={headerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-100px" }}
					className="relative z-20 flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 gap-6 mb-8 max-md:!blur-none"
				>
					<h2 className="text-balance font-medium text-2xl md:text-3xl lg:text-4xl">
						Flexible pricing
					</h2>

					{/* Glassmorphic Dropdown Selector with Premium Depth */}
					<div className="relative z-50" ref={dropdownRef}>
						<button 
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="flex items-center justify-between gap-3 px-3 py-1.5 bg-gradient-to-b from-[#1b1b1f] to-[#121214] hover:from-[#222227] hover:to-[#171719] border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_4px_16px_rgba(0,0,0,0.6)] w-full sm:w-[180px] group active:scale-[0.98]"
						>
							<div className="flex flex-col items-start text-left">
								<span className="text-[9px] uppercase tracking-wider text-zinc-400 font-medium leading-none mb-0.5 group-hover:text-zinc-300 transition-colors">
									{viewRetainers ? "Retainer" : "Service"}
								</span>
								<span className="text-xs font-semibold text-white leading-tight">{categories.find(c => c.index === activeTab)?.name || "Select Service"}</span>
							</div>
							<ChevronDownIcon className={cn("w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-all duration-300", isDropdownOpen && "rotate-180")} />
						</button>

						<AnimatePresence>
							{isDropdownOpen && (
								<motion.div 
									initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
									animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
									exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
									transition={{ duration: 0.18, ease: "easeOut" }}
									className="absolute top-full left-0 md:left-auto md:right-0 mt-2 w-full sm:w-[180px] bg-[#121214]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[100] max-md:!blur-none"
								>
									<div className="flex flex-col p-1">
										{categories.map((category) => {
											const isActive = activeTab === category.index;
											return (
												<button
													key={category.index}
													onClick={() => {
														updateService(category.index);
														setIsDropdownOpen(false);
													}}
													className={cn(
														"flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-all duration-200 text-left border border-transparent",
														isActive
															? "bg-gradient-to-b from-white/15 to-white/5 text-white border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.4)]"
															: "text-zinc-400 hover:bg-white/5 hover:text-white hover:translate-x-0.5"
													)}
												>
													{category.name}
													{isActive && <CheckIcon className="w-3.5 h-3.5 text-white" />}
												</button>
											);
										})}
										
										<div className="h-px bg-white/10 my-1" />
										
										<div 
											onClick={(e) => {
												e.stopPropagation();
												updateMode(!viewRetainers);
											}}
											className="flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium text-zinc-400 hover:bg-white/5 hover:text-white cursor-pointer select-none transition-all duration-200 hover:translate-x-0.5"
										>
											<span>Monthly Retainer</span>
											<Switch 
												id="services-toggle-dropdown" 
												checked={viewRetainers}
												onCheckedChange={(checked) => updateMode(checked)}
												className="scale-75 origin-right"
												onClick={(e) => e.stopPropagation()}
											/>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>

				<motion.div 
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-100px" }}
					className="relative border-y border-white/10 max-md:!blur-none"
				>
					<DecorIcon className="size-4" position="top-left" />
					<DecorIcon className="size-4" position="top-right" />
					<DecorIcon className="size-4" position="bottom-left" />
					<DecorIcon className="size-4" position="bottom-right" />

					<FullWidthDivider className="-top-px bg-white/10" />
					
					<div className="overflow-hidden">
						<div className="flex flex-col bg-[#1e1e1e] gap-px">
							{/* Large Expanded Two-Column Container */}
							<div className="bg-background grid grid-cols-1 lg:grid-cols-12 gap-0">
								
								{/* Left Column: Pricing Info (spans 5 cols on lg) */}
								<motion.div 
									variants={leftColumnVariants}
									className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between relative bg-gradient-to-b from-zinc-900/40 to-background border-b lg:border-b-0 lg:border-r border-white/10"
								>
									{activeCard.isPopular && (
										<>
											{/* Noise overlay */}
											<div 
												className="absolute inset-0 z-0 opacity-[0.04] mix-blend-screen pointer-events-none"
												style={{
													backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
												}}
											/>
											<div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />
											<div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[150px] bg-white/10 blur-[50px] pointer-events-none rounded-full z-0" />
										</>
									)}
									<motion.div
										key={`${activeTab}-${viewRetainers}`}
										initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
										animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
										transition={{ duration: 0.28, ease: "easeOut" }}
										className="flex flex-col justify-between flex-1 relative z-10 w-full max-md:!blur-none"
									>
										<div className="space-y-6">
											{activeCard.badge && (
												<div>
													{activeCard.isPopular ? (
														<span className="inline-block rounded-full bg-gradient-to-b from-zinc-100 to-zinc-300 text-zinc-950 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border border-border shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.6)]">
															{activeCard.badge}
														</span>
													) : (
														<span className="inline-block rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 text-zinc-300 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-border/50 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
															{activeCard.badge}
														</span>
													)}
												</div>
											)}
											<div>
												<h3 className={cn("text-2xl md:text-3xl font-bold leading-tight", activeCard.isPopular && "text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70")}>
													{activeCard.tier}
												</h3>
												<p className="mt-3 text-base text-muted-foreground leading-relaxed">
													{activeCard.description}
												</p>
											</div>
										</div>

										<div className="mt-8 pt-6 border-t border-white/5 space-y-5">
											{/* Detailed Packages Breakdown */}
											<div className="space-y-2.5">
												<span className="text-[9px] text-zinc-400 block uppercase tracking-wider font-semibold">Available Tiers & Turnaround</span>
												<div className="space-y-1.5">
													{[activeCard.packages.basic, activeCard.packages.best, activeCard.packages.ultimate].map((pkg, i) => (
														<div 
															key={i} 
															onClick={() => updateTier(i)}
															className={cn(
																"p-2.5 rounded-lg border text-left transition-all duration-200 cursor-pointer select-none",
																activeTier === i
																	? "bg-gradient-to-b from-[#1b1b1f] to-[#121214]/50 border-cyan-500/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_0_12px_rgba(6,182,212,0.15),_0_8px_20px_rgba(0,0,0,0.6)] scale-[1.01]"
																	: "border-white/5 bg-transparent hover:bg-white/[0.02] hover:border-white/10"
															)}
														>
															<div className="flex items-center justify-between">
																<span className="text-[11px] font-bold text-white flex items-center gap-1.5">
																	{pkg.label}
																	{i === 1 && (
																		<span className="px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wide bg-gradient-to-b from-cyan-500 to-cyan-700 text-white rounded border border-cyan-400/40 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]">
																			Recommended
																		</span>
																	)}
																</span>
																<span className="text-[11px] font-extrabold text-white flex items-center">
																	{pkg.price}
																	<AnimatePresence>
																		{fastPriority && activeTier === i && (
																			<motion.span
																				initial={{ opacity: 0, width: 0, scale: 0.8, filter: "blur(2px)", marginLeft: 0 }}
																				animate={{ opacity: 1, width: "auto", scale: 1, filter: "blur(0px)", marginLeft: 6 }}
																				exit={{ opacity: 0, width: 0, scale: 0.8, filter: "blur(2px)", marginLeft: 0 }}
																				transition={{ duration: 0.2, ease: "easeOut" }}
																				className="text-[9px] font-bold text-cyan-400 inline-block origin-left whitespace-nowrap overflow-hidden max-md:!blur-none"
																			>
																				+ Fast
																			</motion.span>
																		)}
																	</AnimatePresence>
																</span>
															</div>
															<div className="flex justify-between items-center mt-1 text-[10px] text-zinc-400">
																<span>{pkg.desc}</span>
																<span className="text-zinc-500 inline-block text-right">
																	<AnimatePresence mode="wait">
																		<motion.span
																			key={getTurnaroundLimit(pkg.limit, i)}
																			initial={{ opacity: 0, y: -2, filter: "blur(2px)" }}
																			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
																			exit={{ opacity: 0, y: 2, filter: "blur(2px)" }}
																			transition={{ duration: 0.2, ease: "easeOut" }}
																			className="flex items-center gap-1.5 max-md:!blur-none"
																		>
																			{getTurnaroundLimit(pkg.limit, i)}
																		</motion.span>
																	</AnimatePresence>
																</span>
															</div>
														</div>
													))}
												</div>
											</div>

											{/* Fast Priority Toggle Switch with Pressed Depth */}
											<div 
												onClick={() => updatePriority(!fastPriority)}
												className={cn(
													"p-3 py-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer select-none relative overflow-hidden flex items-center justify-between group",
													fastPriority
														? "bg-gradient-to-b from-[#0a0a0c] to-[#0f0f11] border-cyan-500/30 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),_inset_0_1px_0_rgba(255,255,255,0.02)]"
														: "bg-gradient-to-b from-[#1b1b1f] to-[#121214] border-white/5 hover:border-white/10 hover:from-[#222227] hover:to-[#171719] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_2px_8px_rgba(0,0,0,0.6)]"
												)}
											>
												<div className="flex flex-col gap-1 relative z-10">
													<span 
														className={cn(
															"text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300",
															fastPriority 
																? "text-cyan-400" 
																: "text-zinc-400 group-hover:text-zinc-300"
														)}
													>
														Fast Priority Add-on
													</span>
													<span className={cn("text-[9px] font-medium transition-colors duration-300", fastPriority ? "text-zinc-300" : "text-zinc-400")}>
														Prioritizes your project for fast delivery
													</span>
												</div>
												
												<div onClick={(e) => e.stopPropagation()} className="relative z-10">
													<Switch 
														checked={fastPriority} 
														onCheckedChange={(checked) => updatePriority(checked)}
														className={cn(
															"transition-all duration-300 scale-90 border border-black/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),_0_1px_1px_rgba(255,255,255,0.05)]",
															fastPriority 
																? "data-checked:bg-cyan-500" 
																: "data-unchecked:bg-zinc-900"
														)}
													/>
												</div>
											</div>

											{activeCard.isLiquidMetal ? (
												<div className="w-full pt-1">
													<LiquidMetalButton fluid borderRadius="8px" height={44} label={activeCard.buttonText} onClick={() => setIsContactModalOpen(true)} />
												</div>
											) : (
												<button 
													onClick={() => setIsContactModalOpen(true)}
													className={cn(
														"w-full h-11 rounded-lg text-sm font-semibold mt-1 transition-all duration-300 relative overflow-hidden group/pricing-btn flex items-center justify-center select-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
														activeCard.buttonVariant === "outline" 
															? "bg-gradient-to-b from-[#2a2a2f] to-[#121214] border border-white/10 hover:border-white/20 hover:from-[#323238] hover:to-[#171719] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_4px_16px_rgba(0,0,0,0.4)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] active:translate-y-[1px] text-white"
															: "bg-white text-zinc-950 border border-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.8),_0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),_0_6px_20px_rgba(0,0,0,0.4)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] hover:bg-zinc-100"
													)}
												>
													<span className="relative z-10">{activeCard.buttonText}</span>
												</button>
											)}
										</div>
									</motion.div>
								</motion.div>

								{/* Right Column: 10-12 Features (spans 7 cols on lg) */}
								<div className="lg:col-span-7 bg-background/50 flex flex-col justify-between">
									<motion.div 
										variants={rightHeaderVariants}
										className="px-6 py-5 md:px-10 md:py-6 border-b border-white/10 bg-background relative overflow-hidden flex items-center justify-center"
									>
										<div className="flex flex-col items-center text-center gap-2 relative z-10">
											<div className="flex items-center justify-center rounded-lg bg-zinc-900/80 border border-white/10 p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.5)] w-fit">
												<Sparkles className="size-3.5 text-zinc-300 animate-pulse" />
											</div>
											<div className="flex flex-col gap-0.5">
												<h4 className="text-xs font-sans font-bold uppercase tracking-wider text-white">What's Included</h4>
												<p className="text-[10px] text-muted-foreground">Detailed package features & deliverables</p>
											</div>
										</div>
									</motion.div>
									
									<motion.div 
										variants={gridVariants}
										layout
										transition={{ layout: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }}
										className="grid grid-cols-1 md:grid-cols-2 flex-1"
									>
										<AnimatePresence initial={false} mode="popLayout">
										{activeFeatures.map((feature, i) => {
											const uniqueKey = `${activeTab}-${activeTier}-${viewRetainers}-${feature.title}-${feature.isPriorityAddon ? 'p' : 'n'}`;
											return (
												<motion.div 
													key={uniqueKey}
													layout
													initial={feature.isPriorityAddon 
														? { opacity: 0, y: 12, scale: 0.97 } 
														: { opacity: 0, y: 6 }
													}
													animate={{ opacity: 1, y: 0, scale: 1 }}
													exit={{ opacity: 0, y: -8, scale: 0.97 }}
													transition={{ 
														opacity: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
														y: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
														scale: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
														layout: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
													}}
													className={cn(
														"flex items-center gap-4 px-6 py-4 transition-colors duration-300 border-b border-white/10",
														i % 2 === 0 && "md:border-r border-white/10",
														feature.isPriorityAddon
															? "bg-cyan-950/10 hover:bg-cyan-950/15"
															: "hover:bg-white/[0.02]"
													)}
												>
													<div 
														className={cn(
															"relative size-10 shrink-0 rounded-xl overflow-hidden flex items-center justify-center border shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)]",
															feature.isPriorityAddon
																? "bg-cyan-950/80 border-cyan-500/30"
																: "bg-zinc-900/80 border-white/10"
														)}
													>
														<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
														<ServiceIcon 
															name={feature.iconName} 
															className={cn("size-5", feature.isPriorityAddon ? "text-cyan-400" : "text-white")} 
														/>
													</div>
													<div className="flex flex-col justify-center">
														<h5 className="text-sm font-sans font-semibold text-white leading-tight flex items-center gap-1.5 tracking-normal">
															{feature.title}
															{feature.isPriorityAddon && (
																<span className="px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider bg-zinc-950 text-cyan-500 border border-zinc-800 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.8),_0_1px_0_rgba(255,255,255,0.05)] rounded shrink-0">
																	Priority
																</span>
															)}
														</h5>
														<p className={cn("text-xs leading-snug mt-1", feature.isPriorityAddon ? "text-cyan-200/70" : "text-zinc-400")}>
															{feature.description}
														</p>
													</div>
												</motion.div>
											);
										})}
										</AnimatePresence>
									</motion.div>
								</div>

							</div>

							{/* Bottom Span Row */}
							<div className="bg-background p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-4">
								<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
									<div className="flex items-center gap-3">
										<div className="relative size-10 sm:size-12 shrink-0 rounded-xl overflow-hidden flex items-center justify-center border bg-zinc-900/80 border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)]">
											<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
											<InfoIcon className="size-4 sm:size-5 text-white relative z-10" />
										</div>
										<h4 className="text-base font-sans font-medium text-foreground sm:hidden tracking-normal uppercase">Pricing Tailored to You</h4>
									</div>
									<div className="space-y-1 sm:space-y-0.5">
										<h4 className="hidden sm:block text-base font-sans font-medium text-foreground tracking-normal uppercase">Pricing Tailored to You</h4>
										<p className="text-sm text-muted-foreground">Every project is unique. Final pricing and timelines may vary based on your specific requirements and our initial discovery conversation.</p>
									</div>
								</div>
								<a href="#" className="text-sm font-medium text-foreground hover:underline inline-flex items-center gap-1.5 shrink-0">
									Book a discovery call <ExternalLinkIcon className="size-4 text-muted-foreground" />
								</a>
							</div>
						</div>
					</div>

					<FullWidthDivider className="-bottom-px bg-white/10" />
				</motion.div>
			</div>
			<ContactModal 
				isOpen={isContactModalOpen} 
				onClose={() => setIsContactModalOpen(false)} 
				defaultService={categories.find(c => c.index === activeTab)?.name || "General Inquiry"} 
			/>
		</section>
	);
}

function ServiceIcon({ name, className }: { name: string; className?: string }) {
	const icons: Record<string, React.ReactNode> = {
		CodeIcon: <CodeIcon className={cn("size-5 text-white", className)} />,
		AppWindowIcon: <AppWindowIcon className={cn("size-5 text-white", className)} />,
		LayoutIcon: <LayoutIcon className={cn("size-5 text-white", className)} />,
		CpuIcon: <CpuIcon className={cn("size-5 text-white", className)} />,
		NetworkIcon: <NetworkIcon className={cn("size-5 text-white", className)} />,
		CogIcon: <CogIcon className={cn("size-5 text-white", className)} />,
		Gamepad2Icon: <Gamepad2Icon className={cn("size-5 text-white", className)} />,
		BookOpenTextIcon: <BookOpenTextIcon className={cn("size-5 text-white", className)} />,
		PresentationIcon: <PresentationIcon className={cn("size-5 text-white", className)} />,
		ClockIcon: <ClockIcon className={cn("size-5 text-white", className)} />,
	};
	return <>{icons[name] || <CheckIcon className={cn("size-5 text-white", className)} />}</>;
}
