import { InfiniteSlider } from "@/components/infinite-slider";
import Image from "next/image";

export function LogoCloud() {
	return (
		<div className="relative py-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
			<InfiniteSlider gap={42} reverse speed={60} speedOnHover={20}>
				{logos.map((logo) => (
					<Image
						alt={logo.alt}
						className="pointer-events-none h-4 select-none md:h-5 w-auto object-contain dark:brightness-0 dark:invert"
						height={20}
						width={100}
						key={`logo-${logo.alt}`}
						src={logo.src}
					/>
				))}
			</InfiniteSlider>
		</div>
	);
}

const logos = [
	{
		src: "https://storage.efferd.com/logo/nvidia-wordmark.svg",
		alt: "Nvidia Logo",
	},
	{
		src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
		alt: "Supabase Logo",
	},
	{
		src: "https://storage.efferd.com/logo/openai-wordmark.svg",
		alt: "OpenAI Logo",
	},
	{
		src: "https://storage.efferd.com/logo/turso-wordmark.svg",
		alt: "Turso Logo",
	},
	{
		src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
		alt: "Vercel Logo",
	},
	{
		src: "https://storage.efferd.com/logo/github-wordmark.svg",
		alt: "GitHub Logo",
	},
	{
		src: "https://storage.efferd.com/logo/claude-wordmark.svg",
		alt: "Claude AI Logo",
	},
	{
		src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
		alt: "Clerk Logo",
	},
];
