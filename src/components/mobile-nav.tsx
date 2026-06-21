import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/portal";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon } from "lucide-react";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="md:hidden">
			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				className="md:hidden"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				{open ? (
					<XIcon className="size-4.5" />
				) : (
					<MenuIcon className="size-4.5" />
				)}
			</Button>
			{open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"size-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Button className="justify-start" key={link.label} variant="ghost" render={<a href={link.href} />}>
									{link.label}
								</Button>
							))}
						</div>
						<div className="mt-12 flex flex-col gap-2">
							<a href="#pricing" onClick={() => setOpen(false)} className="h-11 w-full rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden group/mobile-btn-primary flex items-center justify-center select-none outline-none focus-visible:ring-2 focus-visible:ring-ring/50 bg-gradient-to-b from-white to-zinc-200 text-zinc-950 border border-transparent shadow-[inset_0_1px_2px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(0,0,0,0.1),_0_6px_16px_rgba(0,0,0,0.2)] hover:from-white hover:to-zinc-100 active:translate-y-[1px] active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]">
								<span className="relative z-10">Get Started</span>
							</a>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
