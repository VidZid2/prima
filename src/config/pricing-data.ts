export interface Feature {
	title: string;
	description: string;
	iconName: string;
}

export interface PackageDetail {
	label: string;
	price: string;
	limit: string;
	desc: string;
}

export interface PricingCard {
	tier: string;
	description: string;
	limit: string;
	price: string;
	buttonText: string;
	buttonVariant: "default" | "outline";
	isPopular?: boolean;
	isLiquidMetal?: boolean;
	badge?: string;
	packages: {
		basic: PackageDetail;
		best: PackageDetail;
		ultimate: PackageDetail;
	};
	features: {
		basic: Feature[];
		best: Feature[];
		ultimate: Feature[];
		priority: Feature[];
	};
}

export const retainerCards: PricingCard[] = [
	{
		tier: "Thesis Documentation",
		description: "Ongoing academic thesis support, document formatting oversight, and structured literature sourcing cycles.",
		limit: "Weekly advisory sessions",
		price: "Custom Retainer",
		buttonText: "Inquire Now",
		buttonVariant: "outline",
		badge: "Academic",
		packages: {
			basic: { label: "Basic Retainer", price: "Custom Retainer", limit: "Standard support", desc: "Core upkeep & updates" },
			best: { label: "Best", price: "Custom Retainer", limit: "Priority support", desc: "Full upkeep & monitoring" },
			ultimate: { label: "Enterprise Retainer", price: "Custom Retainer", limit: "24/7 dedicated support", desc: "Full scale upkeep & optimization" }
		},
		features: {
			basic: [
				{ title: "Literature Outlines", description: "Standard structure templates", iconName: "BookOpenTextIcon" },
				{ title: "Citation Formatting", description: "Standard referencing check", iconName: "LayoutIcon" },
				{ title: "Text Verification", description: "Spellcheck and syntax proofing", iconName: "CheckIcon" },
				{ title: "General Mentorship", description: "Standard email question support", iconName: "PresentationIcon" },
				{ title: "Resource Folders", description: "Access to basic formatting files", iconName: "LayoutIcon" },
				{ title: "General Q&A", description: "48-hour response cycle to queries", iconName: "CogIcon" }
			],
			best: [
				{ title: "Literature Database", description: "In-depth reference checks", iconName: "BookOpenTextIcon" },
				{ title: "Full Citation Audit", description: "Exhaustive referencing review", iconName: "LayoutIcon" },
				{ title: "Writing Assistance", description: "Mentorship on core chapters", iconName: "BookOpenTextIcon" },
				{ title: "Priority Mentorship", description: "Dedicated advisory chats", iconName: "PresentationIcon" },
				{ title: "Resource Library", description: "All private formatting resources", iconName: "LayoutIcon" },
				{ title: "On-Demand Q&A", description: "Fast 24h response to feedback", iconName: "CogIcon" },
				{ title: "Data Validation", description: "Review of statistical results", iconName: "CpuIcon" },
				{ title: "Plagiarism Checks", description: "Monthly similarity scan cycles", iconName: "BookOpenTextIcon" },
				{ title: "Draft Syncs", description: "Bi-weekly draft progress reviews", iconName: "PresentationIcon" },
				{ title: "Grammar Audits", description: "Polishing of syntax and wording", iconName: "CheckIcon" }
			],
			ultimate: [
				{ title: "Database Sourcing", description: "Continuous literature tracking", iconName: "BookOpenTextIcon" },
				{ title: "Real-time Citation", description: "Instant formatting adjustments", iconName: "LayoutIcon" },
				{ title: "Express Writing", description: "High-priority chapter reviews", iconName: "BookOpenTextIcon" },
				{ title: "Hotline Mentorship", description: "WhatsApp advisory channel", iconName: "PresentationIcon" },
				{ title: "Unlocked Portal", description: "All private academic tools unlocked", iconName: "LayoutIcon" },
				{ title: "Instant Q&A", description: "Urgent response within 2 hours", iconName: "CogIcon" },
				{ title: "Express Stat Audit", description: "Priority data calculations", iconName: "CpuIcon" },
				{ title: "Priority Plag Scan", description: "On-demand scan cycles & logs", iconName: "BookOpenTextIcon" },
				{ title: "Daily Revision Sync", description: "Daily progress review calls", iconName: "PresentationIcon" },
				{ title: "Complete Proofing", description: "Expedited grammar and style audits", iconName: "CheckIcon" }
			],
			priority: [
				{ title: "Priority Revisions", description: "Fast-track turnaround for thesis chapter feedback.", iconName: "BookOpenTextIcon" },
				{ title: "24/7 Mentor Hotline", description: "Direct priority channel for urgent academic advice.", iconName: "PresentationIcon" }
			]
		}
	},
	{
		tier: "Seminars & Trainings",
		description: "Ongoing corporate/academic digital training, custom lesson plan upgrades, and live technology seminars.",
		limit: "Flexible training slots",
		price: "Custom Retainer",
		buttonText: "Inquire Now",
		buttonVariant: "outline",
		badge: "Training",
		packages: {
			basic: { label: "Basic Retainer", price: "Custom Retainer", limit: "Standard support", desc: "Core upkeep & updates" },
			best: { label: "Best", price: "Custom Retainer", limit: "Priority support", desc: "Full upkeep & monitoring" },
			ultimate: { label: "Enterprise Retainer", price: "Custom Retainer", limit: "24/7 dedicated support", desc: "Full scale upkeep & optimization" }
		},
		features: {
			basic: [
				{ title: "Entry Webinars", description: "Basic digital technology webinars", iconName: "PresentationIcon" },
				{ title: "Standard Templates", description: "Access to basic slide sets", iconName: "BookOpenTextIcon" },
				{ title: "Code Examples", description: "Access to core demo scripts", iconName: "CodeIcon" },
				{ title: "Q&A Support", description: "Standard email response channel", iconName: "CogIcon" },
				{ title: "Learning Guides", description: "Self-paced progress checklists", iconName: "LayoutIcon" },
				{ title: "Monthly Sessions", description: "1 group live Q&A session/mo", iconName: "PresentationIcon" }
			],
			best: [
				{ title: "Technical Workshops", description: "Expert-led interactive seminars", iconName: "PresentationIcon" },
				{ title: "Custom Slides", description: "Tailored lesson presentation decks", iconName: "BookOpenTextIcon" },
				{ title: "Code Troubleshooting", description: "Live debugging & code help", iconName: "CodeIcon" },
				{ title: "Priority Support", description: "Direct email/chat question portal", iconName: "CogIcon" },
				{ title: "Structured Materials", description: "Weekly reading resources", iconName: "LayoutIcon" },
				{ title: "Bi-Weekly Syncs", description: "Bi-weekly live group sync calls", iconName: "PresentationIcon" },
				{ title: "Practical Labs", description: "Interactive coding tasks & exercises", iconName: "CodeIcon" },
				{ title: "Project Guidance", description: "Mentorship for capstone/thesis apps", iconName: "LayoutIcon" },
				{ title: "Cert Preparation", description: "Assistance with tech cert exams", iconName: "BookOpenTextIcon" },
				{ title: "Shared Folders", description: "Access to shared course resources", iconName: "CogIcon" }
			],
			ultimate: [
				{ title: "Private Seminars", description: "Bespoke 1-on-1 expert training", iconName: "PresentationIcon" },
				{ title: "Custom Lesson Plans", description: "Fully customized course slides", iconName: "BookOpenTextIcon" },
				{ title: "Hotseat Debugging", description: "Immediate developer code review", iconName: "CodeIcon" },
				{ title: "24/7 Chat Line", description: "Real-time Slack/WhatsApp portal", iconName: "CogIcon" },
				{ title: "Dynamic Curriculum", description: "Training plan adjustments on-demand", iconName: "LayoutIcon" },
				{ title: "Daily Sync Calls", description: "1-on-1 progress reviews", iconName: "PresentationIcon" },
				{ title: "Custom Sprints", description: "Express coding workshops", iconName: "CodeIcon" },
				{ title: "Priority Code Review", description: "Comprehensive capstone audits", iconName: "LayoutIcon" },
				{ title: "Expert Prep Sessions", description: "1-on-1 certification review", iconName: "BookOpenTextIcon" },
				{ title: "Unlocked Resources", description: "Full resource portal & git access", iconName: "CogIcon" }
			],
			priority: [
				{ title: "Priority Scheduling", description: "Fast-track scheduling for specialized training bootcamps.", iconName: "PresentationIcon" },
				{ title: "24/7 Support Hotline", description: "Direct priority line for immediate developer Q&A.", iconName: "CodeIcon" }
			]
		}
	},
	{
		tier: "Website Development",
		description: "Ongoing hosting optimization, security oversight, speed audits, and content updates.",
		limit: "Priority 24/7 support",
		price: "Custom Retainer",
		buttonText: "Inquire Now",
		buttonVariant: "outline",
		badge: "Web Dev",
		packages: {
			basic: { label: "Basic Retainer", price: "Custom Retainer", limit: "Standard support", desc: "Core upkeep & updates" },
			best: { label: "Best", price: "Custom Retainer", limit: "Priority support", desc: "Full upkeep & monitoring" },
			ultimate: { label: "Enterprise Retainer", price: "Custom Retainer", limit: "24/7 dedicated support", desc: "Full scale upkeep & optimization" }
		},
		features: {
			basic: [
				{ title: "Monthly Site Polish", description: "Standard hosting check & minor update", iconName: "LayoutIcon" },
				{ title: "Performance Audits", description: "Monthly speed & Lighthouse diagnostics", iconName: "NetworkIcon" },
				{ title: "Ticket Support", description: "Standard 48h turnaround website fixes", iconName: "AppWindowIcon" },
				{ title: "Weekly Backups", description: "Secure weekly database duplication", iconName: "CogIcon" },
				{ title: "Text/Image Swaps", description: "Standard page content changes", iconName: "BookOpenTextIcon" },
				{ title: "SEO Tracking", description: "Monthly ranking & keyword oversight", iconName: "CodeIcon" }
			],
			best: [
				{ title: "Site Maintenance", description: "Hosting & speed optimization", iconName: "LayoutIcon" },
				{ title: "Performance Monitoring", description: "Uptime & speed oversight", iconName: "NetworkIcon" },
				{ title: "Priority Support", description: "On-call website fixes", iconName: "AppWindowIcon" },
				{ title: "Security Oversight", description: "Regular backup & malware scan", iconName: "CogIcon" },
				{ title: "Content Updates", description: "Regular image, text, & page modifications", iconName: "BookOpenTextIcon" },
				{ title: "SEO Maintenance", description: "Ongoing keyword tracking & optimization", iconName: "CodeIcon" },
				{ title: "Database Health", description: "Regular query performance tuning", iconName: "NetworkIcon" },
				{ title: "Form Validation", description: "Continuous lead funnel checks", iconName: "AppWindowIcon" },
				{ title: "SSL Upkeep", description: "Automated renewal & protocol updates", iconName: "CpuIcon" },
				{ title: "Analytics Auditing", description: "Monthly visitor traffic insights reports", iconName: "PresentationIcon" }
			],
			ultimate: [
				{ title: "24/7 Uptime Control", description: "Instant hosting restart & performance tune", iconName: "LayoutIcon" },
				{ title: "Lighthouse 100 Tune", description: "Continuous core web vitals optimization", iconName: "NetworkIcon" },
				{ title: "Hotline Support", description: "2-hour critical website hotfix turnaround", iconName: "AppWindowIcon" },
				{ title: "Daily Cloud Backup", description: "Automated database backup & recovery check", iconName: "CogIcon" },
				{ title: "On-Demand Changes", description: "Priority page addition & content updates", iconName: "BookOpenTextIcon" },
				{ title: "SEO Growth Campaigns", description: "Continuous keyword audits & adjustments", iconName: "CodeIcon" },
				{ title: "Database Refactoring", description: "Instant index optimization & scaling checks", iconName: "NetworkIcon" },
				{ title: "Funnel Optimization", description: "A/B testing form fields & setups", iconName: "AppWindowIcon" },
				{ title: "SSL & Firewall Shield", description: "Enterprise-grade web application firewall", iconName: "CpuIcon" },
				{ title: "Live User Diagnostics", description: "Real-time traffic & heatmap analysis integration", iconName: "PresentationIcon" }
			],
			priority: [
				{ title: "Priority Web Sprints", description: "Fast-track website changes and front-of-queue builds.", iconName: "CodeIcon" },
				{ title: "24/7 Critical Hotline", description: "Direct priority support line for immediate server updates.", iconName: "CpuIcon" }
			]
		}
	},
	{
		tier: "Engineering Services",
		description: "Ongoing hardware R&D support, continuous firmware optimization, and prototype iterations.",
		limit: "Ongoing partnership",
		price: "Custom Retainer",
		buttonText: "Book a Call",
		buttonVariant: "default",
		isPopular: true,
		isLiquidMetal: true,
		badge: "Most Popular",
		packages: {
			basic: { label: "Basic Retainer", price: "Custom Retainer", limit: "Standard support", desc: "Core upkeep & updates" },
			best: { label: "Best", price: "Custom Retainer", limit: "Priority support", desc: "Full upkeep & monitoring" },
			ultimate: { label: "Enterprise Retainer", price: "Custom Retainer", limit: "24/7 dedicated support", desc: "Full scale upkeep & optimization" }
		},
		features: {
			basic: [
				{ title: "Firmware Checkups", description: "Monthly minor bug adjustments", iconName: "CpuIcon" },
				{ title: "IoT DB Oversight", description: "Monthly cloud data sync audits", iconName: "NetworkIcon" },
				{ title: "Prototyping Polish", description: "Standard component casing updates", iconName: "CogIcon" },
				{ title: "Standard Tech Help", description: "Email-based hardware query support", iconName: "CodeIcon" },
				{ title: "General Device QA", description: "Standard power usage diagnostics", iconName: "AppWindowIcon" },
				{ title: "Sourcing Checks", description: "Monthly component alternate audits", iconName: "PresentationIcon" }
			],
			best: [
				{ title: "Firmware Updates", description: "Continuous firmware adjustments", iconName: "CpuIcon" },
				{ title: "Cloud IoT Management", description: "Server & database monitoring", iconName: "NetworkIcon" },
				{ title: "Hardware Iterations", description: "R&D scaling & testing support", iconName: "CogIcon" },
				{ title: "Engineering Support", description: "Direct technical guidance", iconName: "CodeIcon" },
				{ title: "OTA Updates", description: "Over-the-air firmware deployment security", iconName: "AppWindowIcon" },
				{ title: "Diagnostics & Audits", description: "Regular system health & power audits", iconName: "PresentationIcon" },
				{ title: "PCB Refactoring", description: "Continuous board trace optimizations", iconName: "CpuIcon" },
				{ title: "Thermal Reviews", description: "Regular device temperature testing", iconName: "CogIcon" },
				{ title: "Protocol Auditing", description: "BLE & Wi-Fi communication tuning", iconName: "NetworkIcon" },
				{ title: "Parts Sourcing", description: "Component alternate search & support", iconName: "AppWindowIcon" }
			],
			ultimate: [
				{ title: "OTA Code Deploy", description: "Immediate firmware updates on-demand", iconName: "CpuIcon" },
				{ title: "IoT Cloud Scaling", description: "24/7 sensor database & server optimization", iconName: "NetworkIcon" },
				{ title: "Rapid Iterations", description: "Accelerated circuit and board redesigns", iconName: "CogIcon" },
				{ title: "Hotline R&D Support", description: "On-call electrical engineering team access", iconName: "CodeIcon" },
				{ title: "Enterprise OTA", description: "Secure encrypted fleet updates", iconName: "AppWindowIcon" },
				{ title: "Stress & Load Audits", description: "Continuous device safety & thermal review", iconName: "PresentationIcon" },
				{ title: "PCB Trace Tuning", description: "Rapid trace adjustment for high speed layout", iconName: "CpuIcon" },
				{ title: "Thermal Chamber Run", description: "Accelerated aging & load chamber testing", iconName: "CogIcon" },
				{ title: "Protocol Optimization", description: "Custom packet payload compress for low power", iconName: "NetworkIcon" },
				{ title: "Supply Chain Shield", description: "Priority global distributor component sourcing", iconName: "AppWindowIcon" }
			],
			priority: [
				{ title: "Priority PCB Sprints", description: "Fast-track turnaround for custom board design runs.", iconName: "CpuIcon" },
				{ title: "24/7 Engineering Hotline", description: "Direct priority support line to hardware engineers.", iconName: "CogIcon" }
			]
		}
	},
	{
		tier: "Software Applications",
		description: "Dedicated application maintenance, custom feature additions, server scaling, and optimization.",
		limit: "Priority scaling hours",
		price: "Custom Retainer",
		buttonText: "Inquire Now",
		buttonVariant: "outline",
		badge: "Custom SaaS",
		packages: {
			basic: { label: "Basic Retainer", price: "Custom Retainer", limit: "Standard support", desc: "Core upkeep & updates" },
			best: { label: "Best", price: "Custom Retainer", limit: "Priority support", desc: "Full upkeep & monitoring" },
			ultimate: { label: "Enterprise Retainer", price: "Custom Retainer", limit: "24/7 dedicated support", desc: "Full scale upkeep & optimization" }
		},
		features: {
			basic: [
				{ title: "App Bug Patches", description: "Monthly minor software updates", iconName: "CodeIcon" },
				{ title: "Weekly DB Clean", description: "Standard database index audits", iconName: "NetworkIcon" },
				{ title: "General Support", description: "Standard 48h ticket response", iconName: "CogIcon" },
				{ title: "Weekly Backups", description: "Database restore file generation", iconName: "AppWindowIcon" },
				{ title: "Security Reviews", description: "Monthly package vulnerability checks", iconName: "CpuIcon" },
				{ title: "Layout Polish", description: "Standard admin dashboard adjustments", iconName: "PresentationIcon" }
			],
			best: [
				{ title: "App Maintenance", description: "Bug fixes & feature updates", iconName: "CodeIcon" },
				{ title: "Server Management", description: "Scaling & cloud database audits", iconName: "NetworkIcon" },
				{ title: "Performance Tuning", description: "Speed & API optimizations", iconName: "CogIcon" },
				{ title: "Priority Dev Support", description: "On-call software engineering", iconName: "AppWindowIcon" },
				{ title: "Database Backups", description: "Automated daily/weekly backups", iconName: "CpuIcon" },
				{ title: "User Analytics Support", description: "Monitoring user metrics & reports", iconName: "PresentationIcon" },
				{ title: "Security Scans", description: "Continuous package vulnerability checks", iconName: "CogIcon" },
				{ title: "Payment Upkeep", description: "Stripe API & webhook monitoring", iconName: "CodeIcon" },
				{ title: "API Monitoring", description: "Third-party link uptime checks", iconName: "NetworkIcon" },
				{ title: "Feedback Integration", description: "Implementing minor client request polishes", iconName: "AppWindowIcon" }
			],
			ultimate: [
				{ title: "Urgent Hotfixes", description: "Immediate 2h bug patching response SLA", iconName: "CodeIcon" },
				{ title: "Cloud Database Tune", description: "Real-time index clean & scale optimization", iconName: "NetworkIcon" },
				{ title: "Rapid Feature Deploy", description: "Accelerated layout and database updates", iconName: "CogIcon" },
				{ title: "Dedicated Dev Line", description: "Direct developer Slack channel & calls", iconName: "AppWindowIcon" },
				{ title: "Hourly DB Backup", description: "Redundant secure multi-region backup system", iconName: "CpuIcon" },
				{ title: "24/7 Server Alerting", description: "Automated cloud error log & uptime warnings", iconName: "PresentationIcon" },
				{ title: "Enterprise SecAudits", description: "Vulnerability patch scripts & daily scans", iconName: "CogIcon" },
				{ title: "Payment Engine Oversight", description: "Checkout & checkout webhook audit updates", iconName: "CodeIcon" },
				{ title: "API Failover Setup", description: "Alternate server route configuration", iconName: "NetworkIcon" },
				{ title: "Rapid Feedback Cycles", description: "Immediate client request implementation sprints", iconName: "AppWindowIcon" }
			],
			priority: [
				{ title: "Priority SaaS Deploy", description: "Fast-track releases for custom software updates.", iconName: "CodeIcon" },
				{ title: "24/7 Server Hotline", description: "Direct priority hotline for immediate cloud hotfixes.", iconName: "CpuIcon" }
			]
		}
	},
	{
		tier: "Game Development",
		description: "Ongoing game content expansions, active playtesting updates, and live-ops asset additions.",
		limit: "Dedicated game hours",
		price: "Custom Retainer",
		buttonText: "Inquire Now",
		buttonVariant: "outline",
		badge: "Interactive",
		packages: {
			basic: { label: "Basic Retainer", price: "Custom Retainer", limit: "Standard support", desc: "Core upkeep & updates" },
			best: { label: "Best", price: "Custom Retainer", limit: "Priority support", desc: "Full upkeep & monitoring" },
			ultimate: { label: "Enterprise Retainer", price: "Custom Retainer", limit: "24/7 dedicated support", desc: "Full scale upkeep & optimization" }
		},
		features: {
			basic: [
				{ title: "Asset Maintenance", description: "Monthly minor sprite adjustments", iconName: "Gamepad2Icon" },
				{ title: "Performance Fixes", description: "Monthly stability & crash tweaks", iconName: "CpuIcon" },
				{ title: "Standard Patching", description: "Standard update build compilation", iconName: "CogIcon" },
				{ title: "Sound Upkeep", description: "Standard sound file adjustments", iconName: "LayoutIcon" },
				{ title: "Community Tracking", description: "Monthly player issue report review", iconName: "NetworkIcon" },
				{ title: "Weekly Save Sync", description: "Standard database sync audits", iconName: "PresentationIcon" }
			],
			best: [
				{ title: "Game Live-Ops", description: "Asset updates & expansions", iconName: "Gamepad2Icon" },
				{ title: "Code Optimization", description: "Performance and physics tuning", iconName: "CpuIcon" },
				{ title: "Game Patching", description: "Bug fixes and launch support", iconName: "CogIcon" },
				{ title: "Audio & Assets", description: "BGM updates & custom sprites", iconName: "LayoutIcon" },
				{ title: "Server Matchmaking", description: "Multiplayer lobby & server maintenance", iconName: "NetworkIcon" },
				{ title: "Community Patches", description: "Adapting to player reports & reviews", iconName: "PresentationIcon" },
				{ title: "Memory Optimizing", description: "Leak checks & draw call optimization", iconName: "CpuIcon" },
				{ title: "UI Adjustments", description: "Ongoing HUD & menu polish", iconName: "LayoutIcon" },
				{ title: "Event Updates", description: "Seasonal game modifications & setups", iconName: "Gamepad2Icon" },
				{ title: "Save Syncing", description: "Server profile database checks", iconName: "NetworkIcon" }
			],
			ultimate: [
				{ title: "Weekly Live-Ops", description: "Expedited assets & item content updates", iconName: "Gamepad2Icon" },
				{ title: "Lag Fix hotlines", description: "Rapid performance optimization & patch cycles", iconName: "CpuIcon" },
				{ title: "On-Call game patches", description: "24h hotfix turnaround for game breaking bugs", iconName: "CogIcon" },
				{ title: "Custom Audio Sprints", description: "Accelerated music & sound effect tracks", iconName: "LayoutIcon" },
				{ title: "Lobby Server audits", description: "24/7 matchmaking database health & monitoring", iconName: "NetworkIcon" },
				{ title: "Critical reviews fix", description: "Same-week patches for community report issues", iconName: "PresentationIcon" },
				{ title: "Draw Call Refactoring", description: "Urgent engine optimization for target hardware", iconName: "CpuIcon" },
				{ title: "HUD UI redesigns", description: "Priority menu adjustments & HUD tweaks", iconName: "LayoutIcon" },
				{ title: "Rapid Event Setup", description: "Express integration of seasonal maps & events", iconName: "Gamepad2Icon" },
				{ title: "Real-time Save Sync", description: "Cloud profile diagnostic tracking setups", iconName: "NetworkIcon" }
			],
			priority: [
				{ title: "Priority Game Patches", description: "Fast-track deployments for gameplay and physics updates.", iconName: "Gamepad2Icon" },
				{ title: "24/7 Multiplayer Hotline", description: "Direct priority support line for server lobby checks.", iconName: "NetworkIcon" }
			]
		}
	}
];

export const quoteCards: PricingCard[] = [
	{
		tier: "Thesis Documentation",
		description: "Complete thesis documentation support, research-based paper styling, and technical writing help.",
		limit: "Flexible turnaround",
		price: "Custom Quote",
		buttonText: "Discuss Project",
		buttonVariant: "outline",
		badge: "Academic",
		packages: {
			basic: { label: "Basic Version", price: "Flexible Quote", limit: "Standard delivery", desc: "Core files & essentials" },
			best: { label: "Best", price: "Custom Quote", limit: "Priority delivery", desc: "Complete features" },
			ultimate: { label: "Ultimate Version", price: "Custom Quote", limit: "Dedicated delivery", desc: "Enterprise scale & custom integration" }
		},
		features: {
			basic: [
				{ title: "Thesis Outlines", description: "Core documentation structure draft support", iconName: "BookOpenTextIcon" },
				{ title: "Reference Lists", description: "Standard citation formatting check", iconName: "LayoutIcon" },
				{ title: "Text proofing", description: "Core document grammar scan support", iconName: "CheckIcon" },
				{ title: "Basic Mentorship", description: "Standard email question guidance", iconName: "PresentationIcon" },
				{ title: "Formatting Audits", description: "Review against standard style checklist", iconName: "CogIcon" },
				{ title: "Initial Drafts", description: "Core intro and abstract chapter styling", iconName: "PresentationIcon" }
			],
			best: [
				{ title: "Thesis Writing", description: "Comprehensive chapter writing support", iconName: "BookOpenTextIcon" },
				{ title: "Literature Review", description: "In-depth literature and source audits", iconName: "BookOpenTextIcon" },
				{ title: "Active Proofing", description: "Detailed proofreading and wording check", iconName: "CheckIcon" },
				{ title: "Academic Mentorship", description: "Direct expert-led guidance calls", iconName: "PresentationIcon" },
				{ title: "Layout Formatting", description: "Complete university compliance review", iconName: "LayoutIcon" },
				{ title: "Presentation Prep", description: "Defense preparation & slide design", iconName: "PresentationIcon" },
				{ title: "Statistical Review", description: "Detailed data calculations & graphs", iconName: "CpuIcon" },
				{ title: "Plagiarism Checking", description: "Originality verification & reports", iconName: "BookOpenTextIcon" },
				{ title: "Code Prototyping", description: "Functional verification code scripts", iconName: "CodeIcon" },
				{ title: "Bibliography Styling", description: "Accurate APA/IEEE styling of bibliography", iconName: "LayoutIcon" }
			],
			ultimate: [
				{ title: "Full-Suite Writing", description: "Full-scale paper and journal drafting", iconName: "BookOpenTextIcon" },
				{ title: "Deep Research Audits", description: "Exhaustive literature reference vetting", iconName: "BookOpenTextIcon" },
				{ title: "Executive Proofing", description: "Premium editing and publication-ready polish", iconName: "CheckIcon" },
				{ title: "Dedicated Support", description: "Daily mentorship and writing check-ins", iconName: "PresentationIcon" },
				{ title: "Advanced Compliance", description: "Styling compliance with elite journals", iconName: "LayoutIcon" },
				{ title: "Mock Seminars", description: "Unlimited mock defense runs & prep help", iconName: "PresentationIcon" },
				{ title: "Advanced Data Math", description: "Advanced calculation & visual graph support", iconName: "CpuIcon" },
				{ title: "Priority Plag scans", description: "Daily scanning loops with instant logs", iconName: "BookOpenTextIcon" },
				{ title: "Rapid Prototypes", description: "Accelerated app and algorithm scripting help", iconName: "CodeIcon" },
				{ title: "Same-week revisions", description: "Expedited editing cycles for urgent drafts", iconName: "ClockIcon" }
			],
			priority: [
				{ title: "Priority Revisions", description: "Fast-track turnaround for thesis chapter feedback.", iconName: "BookOpenTextIcon" },
				{ title: "24/7 Mentor Hotline", description: "Direct priority channel for urgent academic advice.", iconName: "PresentationIcon" }
			]
		}
	},
	{
		tier: "Seminars & Trainings",
		description: "Interactive technical training sessions, professional seminar slide deck creations, and custom developer workshops.",
		limit: "Flexible turnaround",
		price: "Custom Quote",
		buttonText: "Discuss Project",
		buttonVariant: "outline",
		badge: "Training",
		packages: {
			basic: { label: "Basic Version", price: "Flexible Quote", limit: "Standard delivery", desc: "Core files & essentials" },
			best: { label: "Best", price: "Custom Quote", limit: "Priority delivery", desc: "Complete features" },
			ultimate: { label: "Ultimate Version", price: "Custom Quote", limit: "Dedicated delivery", desc: "Enterprise scale & custom integration" }
		},
		features: {
			basic: [
				{ title: "Introductory Seminars", description: "Entry-level training sessions", iconName: "PresentationIcon" },
				{ title: "Slide Outlines", description: "Standard training slide deck templates", iconName: "BookOpenTextIcon" },
				{ title: "Demo Applications", description: "Access to basic code playground demos", iconName: "CodeIcon" },
				{ title: "Q&A Sessions", description: "Post-training Q&A session standard support", iconName: "CogIcon" },
				{ title: "Progress Checklists", description: "Structured self-paced learning guides", iconName: "LayoutIcon" },
				{ title: "Mentorship Support", description: "Email-based student query guidance", iconName: "CodeIcon" }
			],
			best: [
				{ title: "Expert Workshops", description: "Interactive, specialized tech seminars", iconName: "PresentationIcon" },
				{ title: "Bespoke Slides", description: "Custom presentation decks tailored to you", iconName: "BookOpenTextIcon" },
				{ title: "Code Laboratories", description: "Hands-on coding exercises & solutions", iconName: "CodeIcon" },
				{ title: "Interactive Q&A", description: "Priority live Q&A during workshops", iconName: "CogIcon" },
				{ title: "Learning Curriculums", description: "Custom weekly learning roadmaps", iconName: "LayoutIcon" },
				{ title: "Group Mentorship", description: "Live weekly group mentorship calls", iconName: "PresentationIcon" },
				{ title: "Troubleshooting Sessions", description: "Live debugging and optimization support", iconName: "CodeIcon" },
				{ title: "Capstone Reviews", description: "Mentorship for final capstone applications", iconName: "LayoutIcon" },
				{ title: "Practical Bootcamps", description: "Direct coding lab sprint exercises", iconName: "BookOpenTextIcon" },
				{ title: "Certificate Prep", description: "Guidance for professional certifications", iconName: "CogIcon" }
			],
			ultimate: [
				{ title: "Private Seminars", description: "1-on-1 expert-led private training runs", iconName: "PresentationIcon" },
				{ title: "Fully Tailored Decks", description: "Fully customized professional slide decks", iconName: "BookOpenTextIcon" },
				{ title: "Live Code Sprints", description: "Dedicated developer debugging and reviews", iconName: "CodeIcon" },
				{ title: "Real-time Q&A Chat", description: "24/7 Slack or WhatsApp training channel", iconName: "CogIcon" },
				{ title: "Dynamic Roadmaps", description: "Training plans adjusted to company needs", iconName: "LayoutIcon" },
				{ title: "1-on-1 Sync Calls", description: "Daily progress review conference calls", iconName: "PresentationIcon" },
				{ title: "Premium Dev Labs", description: "Accelerated coding sprints and bootcamps", iconName: "CodeIcon" },
				{ title: "Launch Integration", description: "Direct code review and launch auditing", iconName: "LayoutIcon" },
				{ title: "Premium Cert Vetting", description: "1-on-1 certification check simulations", iconName: "BookOpenTextIcon" },
				{ title: "Resource Portal", description: "Full resource folder & code repository access", iconName: "CogIcon" }
			],
			priority: [
				{ title: "Priority Scheduling", description: "Fast-track scheduling for specialized training bootcamps.", iconName: "PresentationIcon" },
				{ title: "24/7 Support Hotline", description: "Direct priority line for immediate developer Q&A.", iconName: "CodeIcon" }
			]
		}
	},
	{
		tier: "Website Development",
		description: "Custom UI/UX web designs, high-performance landing pages, responsive e-commerce sites, and corporate portals.",
		limit: "2-4 Weeks turnaround",
		price: "Custom Quote",
		buttonText: "Get an Estimate",
		buttonVariant: "outline",
		badge: "Web Dev",
		packages: {
			basic: { label: "Basic Version", price: "Flexible Quote", limit: "Standard delivery", desc: "Core files & essentials" },
			best: { label: "Best", price: "Custom Quote", limit: "Priority delivery", desc: "Complete features" },
			ultimate: { label: "Ultimate Version", price: "Custom Quote", limit: "Dedicated delivery", desc: "Enterprise scale & custom integration" }
		},
		features: {
			basic: [
				{ title: "Web Design", description: "Standard responsive page template", iconName: "LayoutIcon" },
				{ title: "Frontend Layout", description: "Simple React page construction", iconName: "AppWindowIcon" },
				{ title: "Contact Form", description: "Standard email send link setup", iconName: "NetworkIcon" },
				{ title: "SEO Setup", description: "Basic Google page index setups", iconName: "CodeIcon" },
				{ title: "SSL Setup", description: "Standard certificate installation", iconName: "CogIcon" },
				{ title: "Domain Mapping", description: "Standard DNS configuration settings", iconName: "CpuIcon" }
			],
			best: [
				{ title: "Web Design", description: "Modern UI/UX & animations", iconName: "LayoutIcon" },
				{ title: "Next.js Frontend", description: "Responsive & fast page loads", iconName: "AppWindowIcon" },
				{ title: "Database Setup", description: "Secure, structured backend", iconName: "NetworkIcon" },
				{ title: "SEO Integration", description: "Optimized for Google Search", iconName: "CodeIcon" },
				{ title: "CMS Integration", description: "Easy content management systems", iconName: "CogIcon" },
				{ title: "Domain & SSL Setup", description: "Secure certificate & custom domain config", iconName: "CpuIcon" },
				{ title: "Speed Optimization", description: "Core Web Vitals Lighthouse tuning", iconName: "CpuIcon" },
				{ title: "Lead Pipelines", description: "Contact forms & automated emails", iconName: "AppWindowIcon" },
				{ title: "Analytics Tools", description: "Visitor tracking setup & dashboards", iconName: "PresentationIcon" },
				{ title: "Micro-animations", description: "Interactive page scroll effects", iconName: "LayoutIcon" }
			],
			ultimate: [
				{ title: "Priority UI Design", description: "Express custom prototype revisions", iconName: "LayoutIcon" },
				{ title: "Ultra Next.js Build", description: "Optimized speed, responsive layouts", iconName: "AppWindowIcon" },
				{ title: "Scale Backend DB", description: "High-scale database integration structures", iconName: "NetworkIcon" },
				{ title: "Aggressive SEO Audit", description: "Deep competition keyword setups", iconName: "CodeIcon" },
				{ title: "Headless CMS Setup", description: "Sleek editor panel for self-service updates", iconName: "CogIcon" },
				{ title: "Secure Cloud Deploy", description: "Instant AWS or Vercel production launching", iconName: "CpuIcon" },
				{ title: "Speed Shield Tuning", description: "99+ Lighthouse speed score optimization", iconName: "CpuIcon" },
				{ title: "Instant Lead Pipes", description: "Slack & email sales notification configs", iconName: "AppWindowIcon" },
				{ title: "Full Analytics Panel", description: "Heatmaps & visitor metric integrations", iconName: "PresentationIcon" },
				{ title: "Interactive Motions", description: "Complex dynamic scroll animations", iconName: "LayoutIcon" }
			],
			priority: [
				{ title: "Priority Web Sprints", description: "Fast-track website changes and landing page builds.", iconName: "CodeIcon" },
				{ title: "24/7 Critical Hotline", description: "Direct priority support line for website updates.", iconName: "CpuIcon" }
			]
		}
	},
	{
		tier: "Engineering Services",
		description: "End-to-end hardware and software engineering innovations, including embedded systems, robotics, and custom electronics.",
		limit: "4-8 Weeks turnaround",
		price: "Custom Quote",
		buttonText: "Book a Call",
		buttonVariant: "default",
		isPopular: true,
		isLiquidMetal: true,
		badge: "Most Popular",
		packages: {
			basic: { label: "Basic Version", price: "Flexible Quote", limit: "Standard delivery", desc: "Core files & essentials" },
			best: { label: "Best", price: "Custom Quote", limit: "Priority delivery", desc: "Complete features" },
			ultimate: { label: "Ultimate Version", price: "Custom Quote", limit: "Dedicated delivery", desc: "Enterprise scale & custom integration" }
		},
		features: {
			basic: [
				{ title: "PCB Layout", description: "Core single board routing design", iconName: "CpuIcon" },
				{ title: "Firmware Build", description: "Basic microcontroller programming", iconName: "CodeIcon" },
				{ title: "Sensor Setup", description: "Standard device signal reading scripts", iconName: "NetworkIcon" },
				{ title: "Enclosure Model", description: "Basic 3D printing file exports", iconName: "LayoutIcon" },
				{ title: "Standard Bench Run", description: "Volts & signal diagnostic checks", iconName: "CogIcon" },
				{ title: "Supply List", description: "Core component shopping sheet options", iconName: "AppWindowIcon" }
			],
			best: [
				{ title: "PCB Design", description: "Custom circuit boards & layouts", iconName: "CpuIcon" },
				{ title: "Firmware Development", description: "Embedded systems programming", iconName: "CodeIcon" },
				{ title: "IoT Cloud Sync", description: "Secure device-to-database link", iconName: "NetworkIcon" },
				{ title: "3D CAD Modeling", description: "Enclosure styling & prototypes", iconName: "LayoutIcon" },
				{ title: "Sensor Tuning", description: "Calibration & precision readings", iconName: "CogIcon" },
				{ title: "Power Optimization", description: "Low consumption sleep logic", iconName: "CpuIcon" },
				{ title: "Wireless Integration", description: "Bluetooth & Wi-Fi module setups", iconName: "NetworkIcon" },
				{ title: "Thermal Analysis", description: "Heat dissipation & load safety check", iconName: "CogIcon" },
				{ title: "BOM Sourcing", description: "Component availability optimizations", iconName: "AppWindowIcon" },
				{ title: "Hardware Testing", description: "Full signal & electrical verification", iconName: "PresentationIcon" }
			],
			ultimate: [
				{ title: "Rapid PCB Design", description: "High-speed routing board layouts", iconName: "CpuIcon" },
				{ title: "Priority Firmware", description: "Expedited custom coding adjustments", iconName: "CodeIcon" },
				{ title: "Secure IoT Tunnel", description: "Encrypted device communication routes", iconName: "NetworkIcon" },
				{ title: "Custom Enclosure CAD", description: "Industrial prototype casing layouts", iconName: "LayoutIcon" },
				{ title: "High-Res Calibration", description: "Advanced diagnostic signal adjustments", iconName: "CogIcon" },
				{ title: "Ultra Low-Power Tuning", description: "Advanced power-state logic setups", iconName: "CpuIcon" },
				{ title: "Multi-RF Module Sync", description: "Wi-Fi, Bluetooth, & LoRa configurations", iconName: "NetworkIcon" },
				{ title: "Chamber Heat Tests", description: "Expedited stress & thermal board testing", iconName: "CogIcon" },
				{ title: "BOM Shield Supply", description: "Alternate part search for parts shortages", iconName: "AppWindowIcon" },
				{ title: "Oscilloscope Audits", description: "Detailed signal integrity audit checks", iconName: "PresentationIcon" }
			],
			priority: [
				{ title: "Priority PCB Sprints", description: "Fast-track turnaround for custom board design runs.", iconName: "CpuIcon" },
				{ title: "24/7 Engineering Hotline", description: "Direct priority support line to hardware engineers.", iconName: "CogIcon" }
			]
		}
	},
	{
		tier: "Software Applications",
		description: "Robust enterprise software, desktop/mobile applications, and custom business workflow automation.",
		limit: "4-8 Weeks turnaround",
		price: "Custom Quote",
		buttonText: "Discuss Project",
		buttonVariant: "outline",
		badge: "Custom SaaS",
		packages: {
			basic: { label: "Basic Version", price: "Flexible Quote", limit: "Standard delivery", desc: "Core files & essentials" },
			best: { label: "Best", price: "Custom Quote", limit: "Priority delivery", desc: "Complete features" },
			ultimate: { label: "Ultimate Version", price: "Custom Quote", limit: "Dedicated delivery", desc: "Enterprise scale & custom integration" }
		},
		features: {
			basic: [
				{ title: "Software Application", description: "Standard web dashboard build", iconName: "AppWindowIcon" },
				{ title: "Database Schema", description: "Standard database schema outline", iconName: "NetworkIcon" },
				{ title: "Core Integrations", description: "Basic connection to essential tools", iconName: "CodeIcon" },
				{ title: "Workflows Logic", description: "Core business flow process setup", iconName: "LayoutIcon" },
				{ title: "Cloud Launch", description: "Standard server launch configuration", iconName: "CpuIcon" },
				{ title: "Code Audits", description: "Basic security check diagnostics", iconName: "CogIcon" }
			],
			best: [
				{ title: "Software Applications", description: "Tailored desktop & mobile apps", iconName: "AppWindowIcon" },
				{ title: "Database Architecture", description: "Secure, scalable server setup", iconName: "NetworkIcon" },
				{ title: "API Integrations", description: "Third-party service connection", iconName: "CodeIcon" },
				{ title: "Workflow Automation", description: "Streamlined business logic", iconName: "LayoutIcon" },
				{ title: "Cloud Deployment", description: "Hosting on AWS, Vercel, or GCP", iconName: "CpuIcon" },
				{ title: "Security Auditing", description: "Data encryption & user auth protocols", iconName: "CogIcon" },
				{ title: "Stripe Billing", description: "Checkout page & webhooks setup", iconName: "CodeIcon" },
				{ title: "Admin Portal", description: "Metrics dashboard & user management", iconName: "AppWindowIcon" },
				{ title: "Task Schedulers", description: "Background workers & cron triggers", iconName: "NetworkIcon" },
				{ title: "CI/CD Setup", description: "Continuous integration & testing logs", iconName: "CpuIcon" }
			],
			ultimate: [
				{ title: "Priority App Dev", description: "Express desktop/mobile software sprint", iconName: "AppWindowIcon" },
				{ title: "Scalable DB Layout", description: "Optimized server architecture configs", iconName: "NetworkIcon" },
				{ title: "Fast API Links", description: "Same-week API endpoints sync setup", iconName: "CodeIcon" },
				{ title: "Automated Workflows", description: "Advanced background process automations", iconName: "LayoutIcon" },
				{ title: "Priority AWS Setup", description: "Redundant cloud database load balancing", iconName: "CpuIcon" },
				{ title: "Penetration Tests", description: "Rapid vulnerability audit & safety scripts", iconName: "CogIcon" },
				{ title: "Stripe Payment Core", description: "Express billing integrations & checkout setups", iconName: "CodeIcon" },
				{ title: "Live Metrics Admin", description: "Rich UI graphs & user control logs", iconName: "AppWindowIcon" },
				{ title: "Background Queues", description: "High-performance worker queue configurations", iconName: "NetworkIcon" },
				{ title: "Auto-Deploy Actions", description: "Fast Github builds & unit check pipelines", iconName: "CpuIcon" }
			],
			priority: [
				{ title: "Priority SaaS Deploy", description: "Fast-track releases for custom software updates.", iconName: "CodeIcon" },
				{ title: "24/7 Server Hotline", description: "Direct priority hotline for immediate cloud hotfixes.", iconName: "CpuIcon" }
			]
		}
	},
	{
		tier: "Game Development",
		description: "Custom game development from concept to launch, game design mechanics, assets, and engine coding.",
		limit: "Flexible turnaround",
		price: "Custom Quote",
		buttonText: "Get an Estimate",
		buttonVariant: "outline",
		badge: "Interactive",
		packages: {
			basic: { label: "Basic Version", price: "Flexible Quote", limit: "Standard delivery", desc: "Core files & essentials" },
			best: { label: "Best", price: "Custom Quote", limit: "Priority delivery", desc: "Complete features" },
			ultimate: { label: "Ultimate Version", price: "Custom Quote", limit: "Dedicated delivery", desc: "Enterprise scale & custom integration" }
		},
		features: {
			basic: [
				{ title: "Game Mechanics", description: "Core player movement & loop setup", iconName: "Gamepad2Icon" },
				{ title: "Assets Layout", description: "Standard sprite imports & placements", iconName: "LayoutIcon" },
				{ title: "Essential Audio", description: "Standard sound effects & BGM links", iconName: "PresentationIcon" },
				{ title: "Platform Export", description: "Standard PC/Web file compilation", iconName: "AppWindowIcon" },
				{ title: "HUD Menu UI", description: "Simple Title screen & in-game menu", iconName: "CodeIcon" },
				{ title: "Physics Configs", description: "Standard gravity & collision triggers", iconName: "CpuIcon" }
			],
			best: [
				{ title: "Game Development", description: "Full cycle game design & code", iconName: "Gamepad2Icon" },
				{ title: "Custom Assets", description: "Sprites, models, & textures", iconName: "LayoutIcon" },
				{ title: "Audio & SFX", description: "BGM compositions & sound effects", iconName: "PresentationIcon" },
				{ title: "Platform Publishing", description: "Steam, Web, and mobile launches", iconName: "AppWindowIcon" },
				{ title: "UI/UX & Menus", description: "Sleek in-game HUDs & settings layout", iconName: "CodeIcon" },
				{ title: "Physics & Balancing", description: "Tuning mechanics, gravity, & logic", iconName: "CpuIcon" },
				{ title: "Save Profiles", description: "Local & cloud-based game data saving", iconName: "NetworkIcon" },
				{ title: "Framerate Tuning", description: "Lag mitigation & draw call auditing", iconName: "CpuIcon" },
				{ title: "Special VFX", description: "Custom particles & shader effects", iconName: "Gamepad2Icon" },
				{ title: "Lobby Servers", description: "Multiplayer session & match configs", iconName: "NetworkIcon" }
			],
			ultimate: [
				{ title: "Weekly Live-Ops", description: "Express gameplay logic modifications", iconName: "Gamepad2Icon" },
				{ title: "Custom 3D/2D Assets", description: "Priority sprite adjustments & sheet layouts", iconName: "LayoutIcon" },
				{ title: "Stereo Audio SFX", description: "Custom BGM compositions & audio audits", iconName: "PresentationIcon" },
				{ title: "Steam/Console Launches", description: "Priority publishing and store setups", iconName: "AppWindowIcon" },
				{ title: "Responsive Menus UI", description: "Polished in-game layouts & settings controls", iconName: "CodeIcon" },
				{ title: "Fine Physics Balance", description: "Rapid acceleration & collision adjustments", iconName: "CpuIcon" },
				{ title: "Cloud Profiles Sync", description: "Same-week cloud save database config", iconName: "NetworkIcon" },
				{ title: "Draw Call Refactoring", description: "LOD & heap optimizations for framerates", iconName: "CpuIcon" },
				{ title: "VFX Particle Sprints", description: "Custom screen & weapon particle effects", iconName: "Gamepad2Icon" },
				{ title: "Multiplayer Servers", description: "Matchmaking & server configuration settings", iconName: "NetworkIcon" }
			],
			priority: [
				{ title: "Priority Game Patches", description: "Fast-track deployments for gameplay and physics updates.", iconName: "Gamepad2Icon" },
				{ title: "24/7 Multiplayer Hotline", description: "Direct priority support line for server lobby checks.", iconName: "NetworkIcon" }
			]
		}
	}
];
