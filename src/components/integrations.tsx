"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/full-width-divider";
import { DecorIcon } from "@/components/decor-icon";
import { motion } from "framer-motion";

type LogoType = {
	src: string;
	alt: string;
	isInvertable?: boolean;
};

type TileData = {
	row: number;
	col: number;
	logo?: LogoType;
};

export function Integrations() {
	return (
		<section className="w-full max-w-6xl mx-auto px-4">
			<div className="relative border-x">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center pt-0 pb-12 md:pb-16">
					{/* Left Content */}
					<motion.div 
						initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
						whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						className="px-4 md:px-8"
					>
						<div className="space-y-4">
							<h2 className="font-medium text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl">
								Seamless Integration
							</h2>
							<p className="text-lg text-muted-foreground leading-8">
								Integrate with over 100+ tools and platforms to streamline your
								workflow and boost productivity.
							</p>
						</div>
					</motion.div>

					{/* Right Content - Visual */}
					<div className="place-items-end px-4 md:px-8">
						<motion.div 
							variants={{
								hidden: { opacity: 0 },
								show: {
									opacity: 1,
									transition: {
										staggerChildren: 0.05
									}
								}
							}}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: "-100px" }}
							className="relative size-90 mx-auto md:mx-0 mask-[radial-gradient(ellipse_at_center,black,black,transparent)]"
						>
							{tiles.map((tile) => (
								<IntegrationCard key={`${tile.row}_${tile.col}`} {...tile} />
							))}
						</motion.div>
					</div>
				</div>

				<DecorIcon className="size-4" position="bottom-left" />
				<DecorIcon className="size-4" position="bottom-right" />

				<FullWidthDivider className="-bottom-px" />
			</div>
		</section>
	);
}

function IntegrationCard({ row, col, logo }: TileData) {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, scale: 0.4, y: 15, filter: "blur(8px)" },
				show: { 
					opacity: 1, 
					scale: 1, 
					y: 0, 
					filter: "blur(0px)",
					transition: {
						type: "spring",
						stiffness: 110,
						damping: 13
					}
				}
			}}
			className={cn(
				"absolute flex size-18 items-center justify-center rounded-md border",
				logo
					? "bg-gradient-to-b from-muted/80 to-muted/20 shadow-sm dark:from-neutral-800/80 dark:to-neutral-900/40"
					: "bg-transparent dark:bg-transparent" // Restore blank squares with borders
			)}
			style={{
				left: col * 72, // 72px cell
				top: row * 72,
			}}
		>
			{logo && (
				<img
					alt={logo.alt}
					className={cn(
						"pointer-events-none size-8 select-none object-contain p-1",
						logo.isInvertable && "dark:invert"
					)}
					height={40}
					src={logo.src}
					width={40}
				/>
			)}
		</motion.div>
	);
}

// Coordinate mapping to approximate the "scattered" look in the image.
// Grid 5x5.
const tiles: TileData[] = [
	// Row 0
	{
		row: 0,
		col: 1,
	},
	{
		row: 0,
		col: 3,
		logo: {
			src: "https://storage.efferd.com/logo/notion.svg",
			alt: "Notion Logo",
		},
	},

	// Row 1
	{ row: 1, col: 0 }, // Empty
	{
		row: 1,
		col: 2,
		logo: {
			src: "https://storage.efferd.com/logo/cursor.svg",
			alt: "Cursor Logo",
			isInvertable: true,
		},
	},
	{
		row: 1,
		col: 4,
		logo: {
			src: "https://storage.efferd.com/logo/vercel.svg",
			alt: "Vercel Logo",
			isInvertable: true,
		},
	},

	// Row 2
	{
		row: 2,
		col: 1,
		logo: {
			src: "https://storage.efferd.com/logo/planetscale.svg",
			alt: "Planetscale Logo",
			isInvertable: true,
		},
	},
	{
		row: 2,
		col: 3,
		logo: {
			src: "https://storage.efferd.com/logo/gmail.svg",
			alt: "Gmail Logo",
		},
	}, // Empty

	// Row 3

	{ row: 3, col: 0 }, // Empty
	{
		row: 3,
		col: 2,
		logo: {
			src: "https://storage.efferd.com/logo/supabase.svg",
			alt: "Supabase Logo",
		},
	},
	{
		row: 3,
		col: 4,
		logo: {
			src: "https://storage.efferd.com/logo/canva.svg",
			alt: "Canva Logo",
		},
	},

	// Row 4
	{
		row: 4,
		col: 1,
		logo: {
			src: "https://storage.efferd.com/logo/adobe.svg",
			alt: "Adobe Logo",
		},
	},
	{
		row: 4,
		col: 3,
		logo: {
			src: "https://storage.efferd.com/logo/polar.svg",
			alt: "Polar Logo",
		},
	},
];
