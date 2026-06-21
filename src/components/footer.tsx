import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/github-icon";
import { InstagramIcon } from "@/components/instagram-icon";
import { XIcon } from "@/components/x-icon";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/full-width-divider";
import { DecorIcon } from "@/components/decor-icon";

export function Footer() {
	return (
		<footer className="w-full max-w-4xl mx-auto px-4">
			<div className="relative border-x border-b border-border pt-8 pb-4">
			<FullWidthDivider position="top" />
			<div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
				<div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
					<a className="w-max" href="#">
						<Logo className="h-5" />
					</a>
					<p className="max-w-sm text-balance text-muted-foreground text-sm">
						Elevating your brand with PRIMA.
					</p>
					<div className="flex gap-2">
						{socialLinks.map((item, index) => (
							<Button key={`social-${item.link}-${index}`} size="icon" variant="outline" render={<a href={item.link} target="_blank" rel="noopener noreferrer" />}>
								{item.icon}
							</Button>
						))}
					</div>
				</div>
				<div className="col-span-3 w-full md:col-span-1">
					<span className="text-muted-foreground text-xs">Resources</span>
					<div className="mt-2 flex flex-col gap-2">
						{resources.map(({ href, title }) => (
							<a
								className="w-max text-sm hover:underline"
								href={href}
								key={title}
							>
								{title}
							</a>
						))}
					</div>
				</div>
				<div className="col-span-3 w-full md:col-span-1">
					<span className="text-muted-foreground text-xs">Company</span>
					<div className="mt-2 flex flex-col gap-2">
						{company.map(({ href, title }) => (
							<a
								className="w-max text-sm hover:underline"
								href={href}
								key={title}
							>
								{title}
							</a>
						))}
					</div>
				</div>
			</div>
			<FullWidthDivider className="bg-zinc-800 -bottom-px" />
			<DecorIcon className="size-4 text-zinc-600" position="bottom-left" />
			<DecorIcon className="size-4 text-zinc-600" position="bottom-right" />
			<div className="flex items-center justify-center gap-2 py-4">
				<p className="text-center font-light text-muted-foreground text-sm">
					&copy; {new Date().getFullYear()} PRIMA, All rights reserved
				</p>
			</div>
			</div>
		</footer>
	);
}

const company = [
	{
		title: "About Us",
		href: "#",
	},
	{
		title: "Careers",
		href: "#",
	},
	{
		title: "Brand assets",
		href: "#",
	},
	{
		title: "Privacy Policy",
		href: "#",
	},
	{
		title: "Terms of Service",
		href: "#",
	},
];

const resources = [
	{
		title: "Blog",
		href: "#",
	},
	{
		title: "Help Center",
		href: "#",
	},
	{
		title: "Contact Support",
		href: "#",
	},
	{
		title: "Community",
		href: "#",
	},
	{
		title: "Security",
		href: "#",
	},
];

const socialLinks = [
	{
		icon: <GithubIcon />,
		link: "#",
	},
	{
		icon: <InstagramIcon />,
		link: "#",
	},
	{
		icon: <XIcon />,
		link: "#",
	},
];
