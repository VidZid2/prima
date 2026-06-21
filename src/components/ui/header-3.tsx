'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import type { LucideIcon } from 'lucide-react';
import {
	Code as CodeIcon,
	Globe as GlobeIcon,
	Layers as LayersIcon,
	UserPlus as UserPlusIcon,
	Cpu as CpuIcon,
	Gamepad2 as Gamepad2Icon,
	BookOpenText as BookOpenTextIcon,
	Presentation as PresentationIcon,
	AppWindow as AppWindowIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	BarChart,
	Plug as PlugIcon,
} from 'lucide-react';

type LinkItem = {
	title: string;
	href: string;
	icon: LucideIcon;
	description?: string;
};

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<motion.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
			className={cn('sticky top-0 z-50 mx-auto w-full border border-transparent transition-all duration-300 ease-out', {
				'md:top-2 md:max-w-4xl md:rounded-xl bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/50 border-border shadow-md': scrolled,
				'md:max-w-5xl border-b border-transparent': !scrolled,
			})}
		>
			<nav className={cn("mx-auto flex w-full max-w-5xl items-center justify-between px-4 transition-all duration-300 ease-out", {
				"h-14": !scrolled,
				"h-12": scrolled,
			})}>
				<div className="flex items-center gap-5">
					<a href="#" className="hover:bg-accent rounded-md p-2">
						<Logo className="h-4 md:h-5 w-auto" />
					</a>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent hover:text-white transition-colors">Services</NavigationMenuTrigger>
								<NavigationMenuContent className="!bg-[#0a0a0c] border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden p-0">
									<div className="w-[640px] p-3">
										<ul className="grid grid-cols-2 gap-2">
											{productLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
									</div>
									<div className="bg-[#121214] border-t border-white/5 p-4 flex items-center justify-between">
										<p className="text-zinc-400 text-sm">
											Ready to transform your ideas?
										</p>
										<a href="#pricing" className="text-white text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 group">
											Schedule a demo
											<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
										</a>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent hover:text-white transition-colors">Company</NavigationMenuTrigger>
								<NavigationMenuContent className="!bg-[#0a0a0c] border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden p-0">
									<div className="flex w-[600px]">
										<div className="flex-1 p-3 border-r border-white/5">
											<ul className="space-y-1">
												{companyLinks.map((item, i) => (
													<li key={i}>
														<ListItem {...item} />
													</li>
												))}
											</ul>
										</div>
										<div className="w-[220px] bg-[#0c0c0f] p-4">
											<ul className="space-y-4">
												{companyLinks2.map((item, i) => (
													<li key={i}>
														<NavigationMenuLink
															href={item.href}
															className="group flex items-center gap-x-3 text-sm text-zinc-300 hover:text-white transition-colors"
														>
															<item.icon className="size-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
															<span className="font-medium">{item.title}</span>
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</div>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuLink className="px-4" asChild>
								<a href="#pricing" className="hover:bg-accent rounded-md p-2">
									Pricing
								</a>
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<Link href="#pricing" className="h-9 px-5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-2.5 select-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50 bg-gradient-to-b from-[#2c2c30] to-[#151518] border border-black/80 ring-1 ring-white/10 ring-inset shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:from-[#343438] hover:to-[#1a1a1e] hover:ring-white/20 active:scale-[0.98] text-white cursor-pointer">
						<span className="relative z-10 tracking-wide">Get started</span>
					</Link>
				</div>
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>
			<AnimatePresence mode="wait">
				{open && (
					<MobileMenu open={open} className="flex flex-col justify-between h-full">
						<div className="flex flex-col px-4 pt-4">
							<div className="text-zinc-500 border-b border-white/10 uppercase text-xs pb-4 mb-2 font-medium tracking-widest">
								<p>Navigation</p>
							</div>
							<div className="flex flex-col">
								{[...productLinks, ...companyLinks].map((link, idx) => (
									<MobileNavLink 
										key={link.title} 
										title={link.title} 
										href={link.href} 
										index={idx + 1} 
										setOpen={setOpen} 
									/>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-4 px-4 pb-8 mt-8">
							<Link href="#pricing" onClick={() => { setOpen(false); }} className="h-14 w-full rounded-full text-base font-medium transition-all duration-300 relative overflow-hidden group flex items-center justify-center gap-3 select-none outline-none bg-gradient-to-b from-[#2c2c30] to-[#151518] border border-black/80 ring-1 ring-white/10 ring-inset shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:from-[#343438] hover:to-[#1a1a1e] hover:ring-white/20 active:scale-[0.98] text-white cursor-pointer">
								<span className="relative z-10 tracking-wide">Get started</span>
							</Link>
						</div>
					</MobileMenu>
				)}
			</AnimatePresence>
		</motion.header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

const MENU_SLIDE_ANIMATION = {
	initial: {x: "calc(100% + 100px)"},
	enter: {x: "0", transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as const}},
	exit: {
		x: "calc(100% + 100px)",
		transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as const},
	},
};

const Curve: React.FC<{ windowHeight: number }> = ({ windowHeight }) => {
	const initialPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
	const targetPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;

	const curve = {
		initial: {d: initialPath},
		enter: {
			d: targetPath,
			transition: {duration: 1, ease: [0.76, 0, 0.24, 1] as const},
		},
		exit: {
			d: initialPath,
			transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as const},
		},
	};

	return (
		<svg
			className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full"
			style={{fill: "#0a0a0c"}}
		>
			<motion.path
				variants={curve}
				initial="initial"
				animate="enter"
				exit="exit"
			/>
		</svg>
	);
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	const [windowHeight, setWindowHeight] = React.useState(0);
	
	React.useEffect(() => {
		setWindowHeight(window.innerHeight);
		const handleResize = () => setWindowHeight(window.innerHeight);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (typeof window === 'undefined' || windowHeight === 0) return null;

	return createPortal(
		<motion.div
			variants={MENU_SLIDE_ANIMATION}
			initial="initial"
			animate="enter"
			exit="exit"
			className="h-[100dvh] w-screen max-w-screen-sm fixed right-0 top-0 z-40 bg-[#0a0a0c] md:hidden shadow-2xl"
		>
			<div className={cn("h-full pt-20 overflow-y-auto", className)} {...props}>
				{children}
			</div>
			<Curve windowHeight={windowHeight} />
		</motion.div>,
		document.body,
	);
}

const MobileNavLink: React.FC<{
	title: string;
	href: string;
	index: number;
	setOpen: (open: boolean) => void;
}> = ({ title, href, index, setOpen }) => {
	const handleClick = () => setOpen(false);

	return (
		<motion.div
			onClick={handleClick}
			initial="initial"
			whileHover="whileHover"
			whileTap="whileHover"
			className="group relative flex items-center justify-between border-b border-white/5 py-4 transition-colors duration-500"
		>
			<a href={href} className="w-full">
				<div className="relative flex items-center">
					<span className="text-white/30 transition-colors duration-500 text-xl font-thin mr-4">
						0{index}.
					</span>
					<div className="flex flex-row gap-0.5">
						<motion.span
							variants={{
								initial: {x: 0},
								whileHover: {x: -8},
							}}
							transition={{
								type: "spring",
								staggerChildren: 0.05,
								delayChildren: 0.1,
							}}
							className="relative z-10 flex text-2xl font-light text-zinc-100 transition-colors duration-500"
						>
							{title.split("").map((letter, i) => (
								<motion.span
									key={i}
									variants={{
										initial: {x: 0},
										whileHover: {x: 8},
									}}
									transition={{type: "spring"}}
									className="inline-block"
								>
									{letter === " " ? "\u00A0" : letter}
								</motion.span>
							))}
						</motion.span>
					</div>
				</div>
			</a>
		</motion.div>
	);
};

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
	title: string;
	description?: string;
	icon: LucideIcon;
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	...props
}: ListItemProps) {
	return (
		<NavigationMenuLink asChild>
			<a 
				href={href} 
				className={cn(
					"group flex items-center gap-x-4 rounded-xl p-3 hover:bg-white/[0.03] transition-colors duration-300", 
					className
				)} 
				{...props}
			>
				<div className="flex aspect-square size-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-gradient-to-b from-[#18181b] to-[#0a0a0c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),_0_4px_12px_rgba(0,0,0,0.3)] group-hover:border-white/10 group-hover:from-[#202024] group-hover:to-[#0c0c0f] transition-all duration-300">
					<Icon className="text-zinc-200 size-5" />
				</div>
				<div className="flex flex-col items-start justify-center gap-0.5">
					<span className="font-semibold text-sm text-zinc-100">{title}</span>
					<span className="text-zinc-500 text-xs leading-snug max-w-[200px]">{description}</span>
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const productLinks: LinkItem[] = [
	{
		title: 'Website Development',
		href: '#services',
		description: 'Custom, functional web applications from front-end to database.',
		icon: CodeIcon,
	},
	{
		title: 'Engineering Services',
		href: '#services',
		description: 'Embedded Systems, IoT, AI, Robotics, and 3D Modeling.',
		icon: CpuIcon,
	},
	{
		title: 'Game Development',
		href: '#services',
		description: 'Bring your ideas to life with engaging and fun games.',
		icon: Gamepad2Icon,
	},
	{
		title: 'Thesis Documentation',
		href: '#services',
		description: 'Transform ideas into well-documented success.',
		icon: BookOpenTextIcon,
	},
	{
		title: 'Seminars & Trainings',
		href: '#services',
		description: 'Transform knowledge into confidence through dynamic training.',
		icon: PresentationIcon,
	},
	{
		title: 'Software Applications',
		href: '#services',
		description: 'Custom, scalable applications for unique requirements.',
		icon: AppWindowIcon,
	},
];

const companyLinks: LinkItem[] = [
	{
		title: 'About PRIMA',
		href: '#process',
		description: 'Learn more about our story, mission, and expert team',
		icon: Users,
	},
	{
		title: 'Client Success',
		href: '#client-success',
		description: 'See how our talents have helped clients succeed',
		icon: Star,
	},
	{
		title: 'Partner with Us',
		href: '#partner-with-us',
		icon: Handshake,
		description: 'Collaborate with PRIMA for mutual growth',
	},
];

const companyLinks2: LinkItem[] = [
	{
		title: 'Terms of Service',
		href: '#footer',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '#footer',
		icon: Shield,
	},
	{
		title: 'Refund Policy',
		href: '#footer',
		icon: RotateCcw,
	},
	{
		title: 'Blog',
		href: '#footer',
		icon: Leaf,
	},
	{
		title: 'Help Center',
		href: '#footer',
		icon: HelpCircle,
	},
];


function useScroll(threshold: number) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	// also check on first load
	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}



