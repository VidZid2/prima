"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { SearchIcon, SearchSlashIcon, SparklesIcon, Camera, FolderKanban, Paperclip, ArrowLeftIcon, Brain, ChevronDown } from "lucide-react";
import { FullWidthDivider } from "@/components/full-width-divider";
import { DecorIcon } from "@/components/decor-icon";
import { useToasts } from "@/components/ui/toast";
import {
  PromptInput,
  type PromptPlusMenuItem,
  type PromptSettingGroup,
} from "@/components/ui/prompt-box";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { TextShimmer } from "@/components/ui/shimmer-text";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
  isThinking?: boolean;
  reasoning?: string;
};


function ThinkingCollapse({ reasoning, isThinking }: { reasoning: string, isThinking?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (isThinking) {
            setSeconds(0);
            const timer = setInterval(() => setSeconds(s => s + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [isThinking]);

    useEffect(() => {
        setDisplayedText(reasoning);
    }, [reasoning]);

    return (
        <div className="mb-4 overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-start sm:items-center gap-2 py-2 text-sm text-zinc-300 hover:text-zinc-100 transition-colors text-left"
            >
                <Brain className={cn("size-4 shrink-0 mt-0.5 sm:mt-0", isThinking ? "text-white animate-pulse" : "text-zinc-500")} />
                <span className="font-medium text-white/90 leading-snug">
                    {isThinking ? (
                        <TextShimmer duration={2.5}>
                            Thinking...
                        </TextShimmer>
                    ) : (
                        <span>Thought process complete</span>
                    )}
                </span>
                <ChevronDown className={cn("size-4 ml-1 shrink-0 mt-0.5 sm:mt-0 text-zinc-500 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pb-3"
                    >
                        <div className="pt-3 pb-2 text-muted-foreground/80 text-[14.5px] border-l border-white/10 pl-4 ml-1.5 whitespace-pre-wrap mb-2">
                            {isThinking ? (
                                <TextShimmer duration={1} className="inline font-medium">
                                    {displayedText || "Analyzing request..."}
                                </TextShimmer>
                            ) : (
                                displayedText || "Analyzing request..."
                            )}
                            {isThinking && <span className="animate-pulse ml-1">|</span>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


const faqHeadingVariants = {
	hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
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

const faqSubtextVariants = {
	hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 1.2,
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.12,
		}
	}
};

const faqSearchVariants = {
	hidden: { opacity: 0, y: 10, filter: "blur(6px)", scale: 0.97 },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		scale: 1,
		transition: {
			duration: 1.0,
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.24,
		}
	}
};

const faqTabsVariants = {
	hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 1.0,
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.36,
		}
	}
};

const faqItemVariants = {
	hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
	show: (i: number) => ({
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.9,
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.48 + i * 0.08,
		}
	})
};

const faqFooterVariants = {
	hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 1.0,
			ease: [0.16, 1, 0.3, 1] as const,
			delay: 0.90,
		}
	}
};

import { faqs, faqCategories as categories } from "@/config/landing-data";

export function FaqsSection() {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeCategory, setActiveCategory] = useState("all");
	const [isPromptBoxOpen, setIsPromptBoxOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [aiSettings, setAiSettings] = useState({ model: "mimo-2.5", effort: "high" });
	const promptBoxRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const toasts = useToasts();

	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollTo({
				top: scrollContainerRef.current.scrollHeight,
				behavior: "smooth"
			});
		}
	}, [messages]);

	useEffect(() => {
		if (isPromptBoxOpen && promptBoxRef.current) {
			setTimeout(() => {
				promptBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 100);
		}
	}, [isPromptBoxOpen]);

	const settingGroups: PromptSettingGroup[] = [
	  {
		id: "model",
		label: "Model",
		display: "featured",
		moreMenuLabel: "More models",
		options: [
		  {
			value: "mimo-2.5",
			label: "MiMo 2.5",
			description: "Next-gen intelligence for complex and everyday tasks",
		  },
		],
	  },
	  {
		id: "effort",
		label: "Effort",
		display: "submenu",
		options: [
		  { value: "low", label: "Low" },
		  { value: "medium", label: "Medium" },
		  { value: "high", label: "High" },
		],
	  },
	];

	const plusMenuItems: PromptPlusMenuItem[] = [
	  {
		id: "attach",
		label: "Add files or photos",
		icon: <Paperclip className="h-4 w-4" />,
		shortcut: "⌘U",
		onSelect: () => console.log("attach"),
	  },
	  {
		id: "screenshot",
		label: "Take a screenshot",
		icon: <Camera className="h-4 w-4" />,
		onSelect: () => console.log("screenshot"),
	  },
	  {
		id: "project",
		label: "Add to project",
		icon: <FolderKanban className="h-4 w-4" />,
		options: [
		  { value: "design-system", label: "Design system" },
		  { value: "marketing-site", label: "Marketing site" },
		],
		onOptionSelect: (value) => console.log("project", value),
	  },
	];

	const filtered = faqs.filter((faq) => {
		const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
		const matchesSearch =
			faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.content.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const contentRef = useRef<HTMLDivElement>(null);
	const heightContainerRef = useRef<HTMLDivElement>(null);

	const syncHeight = useCallback(() => {
		if (contentRef.current && heightContainerRef.current) {
			heightContainerRef.current.style.height = `${contentRef.current.offsetHeight}px`;
		}
	}, []);

	useEffect(() => {
		if (!contentRef.current) return;
		
		const observer = new ResizeObserver(() => {
			syncHeight();
		});
		
		observer.observe(contentRef.current);
		return () => observer.disconnect();
	}, [syncHeight]);

	useEffect(() => {
		const timer = setTimeout(() => syncHeight(), 50);
		return () => clearTimeout(timer);
	}, [isPromptBoxOpen, activeCategory, syncHeight]);

	return (
		<section id="faqs" className="w-full max-w-6xl mx-auto px-4 pb-12 scroll-mt-24">
			{/* Connected border-x wrapper */}
			<div className="relative border-x pt-0 pb-0 bg-background">
				{/* We use a border-y container to cap the section */}
				<div className="relative border-b bg-background">
					<DecorIcon className="size-4" position="bottom-left" />
					<DecorIcon className="size-4" position="bottom-right" />

					<div className="px-4 py-16 lg:px-6">
						<motion.h1
							variants={faqHeadingVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: "-80px" }}
							className="mb-4 font-semibold text-3xl md:text-4xl text-foreground tracking-tight"
						>
							Frequently Asked Questions
						</motion.h1>
						<motion.p
							variants={faqSubtextVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: "-80px" }}
							className="mb-8 max-w-2xl text-muted-foreground text-sm md:text-base"
						>
							Find answers to common questions about our web design services, process, and support. Can't find what you're looking for? Our team is here to help.
						</motion.p>

						<motion.div
							variants={faqSearchVariants}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: "-80px" }}
							className="flex flex-col gap-5 mt-2"
						>
							<InputGroup className="w-full sm:max-w-sm bg-transparent border-border">
								<InputGroupAddon className="bg-transparent border-none pl-3 pr-2">
									<SearchIcon className="size-4 text-muted-foreground" />
								</InputGroupAddon>
								<InputGroupInput
									className="bg-transparent border-none focus-visible:ring-0 pl-0"
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search FAQs..."
									value={searchTerm}
								/>
							</InputGroup>

							<div className="w-full sm:max-w-sm lg:hidden">
								<AnimatePresence mode="wait">
									{!isPromptBoxOpen ? (
										<motion.button 
											key="ask-ai"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.8 }}
											onClick={() => setIsPromptBoxOpen(true)} 
											className="group relative flex items-center justify-center gap-2 w-full rounded-full border border-white/10 bg-gradient-to-b from-[#2a2a2f] to-[#121214] px-4 py-2.5 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98]"
										>
											<SparklesIcon className="size-4 text-primary" />
											<span>Ask AI Helper</span>
										</motion.button>
									) : (
										<motion.button 
											key="back-faqs"
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.8 }}
											onClick={() => setIsPromptBoxOpen(false)} 
											className="group relative flex items-center justify-center gap-2 w-full rounded-full border border-white/10 bg-gradient-to-b from-[#2a2a2f] to-[#121214] px-4 py-2.5 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98]"
										>
											<ArrowLeftIcon className="size-4 text-zinc-400 group-hover:text-white transition-colors" />
											<span>Back to FAQs</span>
										</motion.button>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					</div>

					<motion.div
						variants={faqTabsVariants}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "-80px" }}
						className="relative flex items-center justify-between border-y border-border px-4 md:px-6"
					>
						<FullWidthDivider className="bg-zinc-800" position="top" />
						<FullWidthDivider className="bg-zinc-800" position="bottom" />
						<DecorIcon className="size-4 text-zinc-600" position="top-left" />
						<DecorIcon className="size-4 text-zinc-600" position="top-right" />
						<DecorIcon className="size-4 text-zinc-600" position="bottom-left" />
						<DecorIcon className="size-4 text-zinc-600" position="bottom-right" />
						
						<div className="w-full flex items-center">
							<div className="flex flex-nowrap sm:flex-wrap items-center gap-x-1 sm:gap-x-2 pt-2 flex-1 min-w-0 overflow-x-auto no-scrollbar">
								{categories.map((cat) => (
									<button
										className={cn(
											"relative flex flex-col justify-end outline-none shrink-0 transition-opacity duration-300",
											isPromptBoxOpen ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
										)}
										key={cat.id}
										onClick={() => setActiveCategory(cat.id)}
										type="button"
										disabled={isPromptBoxOpen}
									>
										<span
											className={cn(
												"px-2 pb-4 pt-2 text-sm md:text-base font-medium transition-colors duration-300 hover:text-foreground",
												activeCategory === cat.id ? "text-foreground" : "text-muted-foreground"
											)}
										>
											{cat.label}
										</span>
										{activeCategory === cat.id && (
											<motion.span 
												layoutId="faq-tab-indicator"
												className="absolute bottom-[-1px] left-0 right-0 h-[2px] z-10 bg-foreground"
												transition={{ type: "spring", stiffness: 350, damping: 30 }}
											/>
										)}
										{activeCategory !== cat.id && (
											<span className="absolute bottom-[-1px] left-0 right-0 h-[2px] z-10 bg-transparent" />
										)}
									</button>
								))}
							</div>

							{/* Desktop AI button inside tab bar */}
							<div className="hidden lg:flex items-center shrink-0 pl-4">
								<AnimatePresence mode="wait">
									{!isPromptBoxOpen ? (
										<motion.button 
											key="ask-ai-desktop"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											onClick={() => setIsPromptBoxOpen(true)} 
											className="group relative flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-b from-[#2a2a2f] to-[#121214] px-4 py-1.5 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
										>
											<SparklesIcon className="size-3.5 text-primary" />
											<span>Ask AI Helper</span>
										</motion.button>
									) : (
										<motion.button 
											key="back-faqs-desktop"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											onClick={() => setIsPromptBoxOpen(false)} 
											className="group relative flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-b from-[#2a2a2f] to-[#121214] px-4 py-1.5 text-sm font-medium text-zinc-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
										>
											<ArrowLeftIcon className="size-3.5 text-zinc-400 group-hover:text-white transition-colors" />
											<span>Back to FAQs</span>
										</motion.button>
									)}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>

					<div
						ref={heightContainerRef}
						className="overflow-hidden lg:transition-[height] lg:duration-[450ms] lg:ease-[cubic-bezier(0.25,1,0.5,1)]"
					>
						<div ref={contentRef} className="flex flex-col">
							<AnimatePresence mode="wait" onExitComplete={syncHeight}>
								{!isPromptBoxOpen ? (
									<motion.div
						key={`faq-${activeCategory}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
						className="w-full"
					>
						<Accordion
							className="border-0 px-4 py-12 lg:px-6"
							type="single"
							collapsible
						>
					{filtered.length > 0 ? (
						filtered.map((faq) => (
							<div
								key={faq.id}
								className="mb-3"
							>
								<AccordionItem
									className="rounded-xl border border-white/5 bg-gradient-to-b from-[#18181b] to-[#0a0a0c] px-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),_0_4px_12px_rgba(0,0,0,0.3)] hover:border-white/10 hover:from-[#202024] hover:to-[#0c0c0f] data-[state=open]:from-[#202024] data-[state=open]:to-[#0e0e11] data-[state=open]:border-white/10 data-[state=open]:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_8px_24px_rgba(0,0,0,0.5)] transition-[border-color] duration-200"
									value={faq.id.toString()}
								>
									<AccordionTrigger className="hover:no-underline py-5 text-sm font-sans font-semibold text-zinc-200 uppercase tracking-normal hover:text-white transition-colors">
										{faq.title}
									</AccordionTrigger>
									<AccordionContent className="pt-0 pb-5 text-sm text-zinc-400 leading-relaxed">
										{faq.content}
									</AccordionContent>
								</AccordionItem>
							</div>
						))
					) : (
						<Empty className="py-16">
							<EmptyHeader>
								<EmptyMedia variant="icon" className="bg-zinc-900 border-border">
									<SearchSlashIcon className="text-muted-foreground size-5" />
								</EmptyMedia>
								<EmptyTitle className="text-foreground font-sans font-medium">No FAQs found matching your search.</EmptyTitle>
							</EmptyHeader>
							<EmptyContent>
								<Button onClick={() => setSearchTerm("")} variant="outline" className="bg-transparent border-border mt-4 text-zinc-300 hover:text-white font-sans">
									Clear search
								</Button>
							</EmptyContent>
						</Empty>
					)}
						</Accordion>
					</motion.div>
								) : (
									<motion.div 
								key="chat-container"
								initial={{ opacity: 0, filter: "blur(4px)" }}
								animate={{ opacity: 1, filter: "blur(0px)" }}
								exit={{ opacity: 0, filter: "blur(4px)" }}
								transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
								className="flex flex-col w-full"
							>
							{/* Conversation container */}
							<div className="group relative w-full border border-white/5 bg-zinc-900/10 h-[640px] max-h-[80vh] flex flex-col items-center justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500 overflow-hidden">
								
								{/* Contained Animated Glow Effect */}
								<div className="absolute inset-0 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 z-0">
									<AnimatedGradientBackground 
										Breathing={true}
										gradientColors={["rgba(6, 182, 212, 0.15)", "rgba(6, 182, 212, 0.08)", "rgba(6, 182, 212, 0.03)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"]}
										gradientStops={[0, 30, 50, 70, 80, 90, 100]}
										centerY="100%"
									/>
								</div>

								<div className="flex-1 w-full relative z-10 h-full overflow-hidden">
									{messages.length === 0 ? (
										<div className="absolute inset-0 flex flex-col items-center justify-center p-8 pb-32">
											<SparklesIcon className="size-8 text-primary/40 mb-4" />
											<p className="text-muted-foreground text-sm font-sans">How can I help you today?</p>
										</div>
									) : (
										<div ref={scrollContainerRef} data-lenis-prevent="true" className="absolute inset-0 overflow-y-auto pt-8 pb-36 px-8 flex flex-col gap-6 scrollbar-none">
											{messages.map((msg) => (
												<motion.div 
													key={msg.id} 
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}
												>
													<div className={cn(
														"max-w-[85%] text-[15px] font-sans leading-relaxed",
														msg.role === "user" ? "border border-white/10 bg-gradient-to-b from-[#2a2a2f] to-[#121214] text-zinc-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_2px_4px_rgba(0,0,0,0.2)] rounded-3xl rounded-br-sm px-5 py-2.5" : "text-zinc-300 py-2.5"
													)}>
														{msg.role === "ai" && (
															<ThinkingCollapse reasoning={msg.reasoning || ""} isThinking={msg.isThinking} />
														)}
														{!msg.isThinking && (
    <motion.div 
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10 prose-headings:font-bold prose-a:text-cyan-400 prose-strong:text-white"
    >
        <ReactMarkdown
            components={{
                h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-white" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2 text-white" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-md font-bold mt-2 mb-1 text-white" {...props} />,
                p: ({node, ...props}) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 last:mb-0 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 last:mb-0 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                a: ({node, ...props}) => <a className="text-cyan-400 hover:underline" {...props} />,
            }}
        >
            {msg.content}
        </ReactMarkdown>
    </motion.div>
)}
													</div>
												</motion.div>
											))}
										</div>
									)}
									
									{/* Prompt Box */}
									<div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 p-8 pt-12 pb-6 bg-gradient-to-t from-background via-background/95 to-transparent z-20 pointer-events-none">
										<div className="w-full pointer-events-auto">
											<PromptInput
												defaultSettings={{ model: "mimo-2.5", effort: "high" }}
												onSettingsChange={(settings) => setAiSettings({
													model: String(settings.model || "mimo-2.5"),
													effort: String(settings.effort || "high")
												})}
												onSubmit={async (value) => {
													const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: value };
													const aiMsgId = (Date.now() + 1).toString();
													const aiMsg: ChatMessage = { 
														id: aiMsgId, 
														role: "ai", 
														content: "", 
														isThinking: true,
														reasoning: ""
													};
													
													setMessages(prev => [...prev, userMsg, aiMsg]);
													
													try {
														const history = [...messages, userMsg].filter(msg => !msg.isThinking);
														
														const response = await fetch("/api/chat", {
															method: "POST",
															headers: {
																"Content-Type": "application/json",
															},
															body: JSON.stringify({
																messages: history,
																model: aiSettings.model
															}),
														});
														
														if (!response.ok) {
															let errMsg = "Failed to connect to AI helper";
															try {
																const errData = await response.json();
																errMsg = errData.error || errData.details || errMsg;
															} catch {
																try {
																	const errText = await response.text();
																	if (errText) errMsg = errText;
																} catch {}
															}
															throw new Error(errMsg);
														}
														
														const contentType = response.headers.get("content-type");
														if (contentType && contentType.includes("text/event-stream")) {
															const reader = response.body?.getReader();
															if (!reader) throw new Error("Failed to get stream reader");
															
															const decoder = new TextDecoder();
															let rawReasoningText = "";
															let rawContentText = "";
															let isDone = false;
															let buffer = "";
															
															while (!isDone) {
																const { value, done } = await reader.read();
																isDone = done;
																
																if (value) {
																	buffer += decoder.decode(value, { stream: true });
																	const events = buffer.split(/\n\n+/);
																	buffer = events.pop() || "";
																	
																	for (const event of events) {
																		const trimmedEvent = event.trim();
																		if (trimmedEvent.startsWith("data: ") && !trimmedEvent.includes("[DONE]")) {
																			try {
																				let jsonStr = trimmedEvent.slice(6);
																				// Forcibly escape literal newlines to fix broken JSON from the API
																				jsonStr = jsonStr.replace(/\n/g, "\\n").replace(/\r/g, "");
																				const data = JSON.parse(jsonStr);
																				const delta = data.choices[0].delta || data.choices[0].message;
																				
																				if (delta) {
																					const rContent = delta.reasoning_content || delta.reasoning || "";
																					const content = delta.content || "";
																					
																					if (rContent) {
																						rawReasoningText += rContent;
																					}
																					if (content) {
																						rawContentText += content;
																					}
																					
																					let currentReasoning = rawReasoningText;
																					let currentContent = rawContentText;
																					
																					if (rawContentText.includes("<think>")) {
																						const thinkStart = rawContentText.indexOf("<think>");
																						const thinkEnd = rawContentText.indexOf("</think>");
																						
																						if (thinkEnd > -1) {
																							currentReasoning = rawContentText.substring(thinkStart + 7, thinkEnd).trim();
																							currentContent = rawContentText.substring(thinkEnd + 8).trim();
																						} else {
																							currentReasoning = rawContentText.substring(thinkStart + 7).trim();
																							currentContent = "";
																						}
																					}
																					
																					setMessages(prev => prev.map(msg => 
																						msg.id === aiMsgId 
																							? { 
																								...msg,
																								content: currentContent,
																								reasoning: currentReasoning
																							} 
																							: msg
																					));
																				}
																			} catch (e) {
																				// Ignore parse errors for incomplete JSON chunks
																			}
																		}
																	}
																}
															}
															
															setMessages(prev => prev.map(msg => 
																msg.id === aiMsgId 
																	? { ...msg, isThinking: false } 
																	: msg
															));
														} else {
															// Fallback for non-streaming response
															const data = await response.json();
															const choice = data.choices?.[0]?.message;
															let finalContent = choice?.content || "No response content received.";
															let reasoningText = choice?.reasoning_content || choice?.reasoning || "";
															
															if (!reasoningText && finalContent.includes("<think>")) {
																const thinkStart = finalContent.indexOf("<think>");
																const thinkEnd = finalContent.indexOf("</think>");
																if (thinkEnd > thinkStart) {
																	reasoningText = finalContent.substring(thinkStart + 7, thinkEnd).trim();
																	finalContent = finalContent.substring(thinkEnd + 8).trim();
																}
															}
															
															setMessages(prev => prev.map(msg => 
																msg.id === aiMsgId 
																	? { 
																		...msg, 
																		isThinking: false, 
																		content: finalContent,
																		reasoning: reasoningText
																	} 
																	: msg
															));
														}
													} catch (err: any) {
														console.error("Chat submission error:", err);
														toasts.error(err.message || "Failed to contact OpenCode Zen.");
														setMessages(prev => prev.map(msg => 
															msg.id === aiMsgId 
																? { 
																	...msg, 
																	isThinking: false, 
																	content: "Sorry, I encountered an error connecting to the AI helper. Please check your API key and connection."
																} 
																: msg
														));
													}
												}}
																								placeholder="Ask anything..."
												plusMenuItems={plusMenuItems}
												settingGroups={settingGroups}
											/>
										</div>
										<p className="max-w-[320px] text-balance text-center text-[13px] text-muted-foreground leading-tight pointer-events-auto">
											Tap in, let it bloom, and hit Enter to send.
										</p>
									</div>
								</div>
							</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					<AnimatePresence>
						{!isPromptBoxOpen && (
							<motion.div
								key="faq-footer"
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
								className="overflow-hidden"
							>
								<motion.div
									variants={faqFooterVariants}
									initial="hidden"
									whileInView="show"
									viewport={{ once: true, margin: "-40px" }}
									className="flex items-center px-4 pb-12 pt-0 lg:px-6"
								>
									<p className="text-sm text-muted-foreground font-sans">
										Can't find what you're looking for?{" "}
										<a className="text-foreground hover:underline" href="#contact">
											Contact Us
										</a>
									</p>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>

					<FullWidthDivider className="-bottom-px" />
				</div>

				{/* Fading border extensions */}
				<div className="absolute -bottom-12 -left-px w-px h-12 bg-gradient-to-b from-border to-transparent" />
				<div className="absolute -bottom-12 -right-px w-px h-12 bg-gradient-to-b from-border to-transparent" />
			</div>
		</section>
	);
}
