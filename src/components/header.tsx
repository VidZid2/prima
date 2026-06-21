"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export const navLinks = [
	{
		label: "Features",
		href: "#",
	},
	{
		label: "Pricing",
		href: "#",
	},
	{
		label: "About",
		href: "#",
	},
];

export function Header() {
	const scrolled = useScroll(10);

	return (
		<header
			className={cn(
				"fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl border-transparent border-b md:rounded-md md:border transition-all duration-300 ease-out",
				{
					"top-0 md:top-2 border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/50 md:max-w-3xl md:shadow opacity-100 pointer-events-auto":
						scrolled,
					"-top-20 opacity-0 pointer-events-none": !scrolled,
				}
			)}
		>
			<nav
				className={cn(
					"flex h-14 w-full items-center justify-between px-4 md:h-12 transition-all duration-300 ease-out",
					{
						"md:px-2": scrolled,
					}
				)}
			>
				<a
					className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
					href="#"
				>
					<Logo className="h-4" />
				</a>
				<div className="hidden items-center gap-2 md:flex">
					<div>
						{navLinks.map((link) => (
							<Button key={link.label} size="sm" variant="ghost" render={<a href={link.href} />}>
								{link.label}
							</Button>
						))}
					</div>
					<a href="#pricing" className="h-9 px-4 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden group/header-btn-primary flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-ring/50 bg-gradient-to-b from-white to-zinc-200 text-zinc-950 border border-transparent shadow-[inset_0_1px_2px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_6px_16px_rgba(0,0,0,0.2)] hover:from-white hover:to-zinc-100 active:translate-y-[1px] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]">
						<span className="relative z-10">Get Started</span>
					</a>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
