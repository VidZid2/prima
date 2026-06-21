import { LogoCloud } from "@/components/logo-cloud"; // @efferd/logo-cloud-2
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";

import { FlickeringGrid } from "@/components/flickering-footer";

export function LogosSection() {
	return (
		<section className="w-full max-w-6xl mx-auto px-4">
			<div className="relative border-x">
				
				<div className="relative overflow-hidden py-6">

					<h2 className="relative z-20 text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
						Trusted <span className="text-foreground">Partners</span>
					</h2>
				</div>

				<div className="relative *:border-0">
					<DecorIcon className="size-4" position="top-left" />
					<DecorIcon className="size-4" position="top-right" />
					<DecorIcon className="size-4" position="bottom-left" />
					<DecorIcon className="size-4" position="bottom-right" />

					<FullWidthDivider className="-top-px" />
					<div className="-mx-4 lg:mx-0 relative z-10">
						<LogoCloud />
					</div>
					<FullWidthDivider className="-bottom-px" />
				</div>
			</div>
		</section>
	);
}
