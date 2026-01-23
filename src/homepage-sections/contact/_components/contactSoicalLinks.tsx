import Link from "next/link";
import GmailIcon from "@/assets/icons/minified/gmail-icon.tsx";
import LinkedInIcon from "@/assets/icons/minified/linkedin-icon.tsx";
import MessengerIcon from "@/assets/icons/minified/messenger-icon.tsx";
import WhatsAppIcon from "@/assets/icons/minified/whatsapp-icon.tsx";
import { PERSONAL_INFO } from "@/constants/personal-info";

export default function ContactSocialLinks() {
	return (
		<div className="mt-2 pt-4 px-4 border-t border-gray-700/50">
			<h4 className="font-semibold text-white mb-4">Connect With Me</h4>
			<div className="grid grid-cols-2 gap-3">
				{PERSONAL_INFO.SOCIAL_LINKS.map((social) => {
					const getIcon = () => {
						switch (social.icon) {
							case "gmail":
								return (
									<GmailIcon
										className="w-5 h-5"
										aria-hidden="true"
										focusable="false"
									/>
								);
							case "linkedin":
								return (
									<LinkedInIcon
										className="w-5 h-5 text-blue-500"
										aria-hidden="true"
										focusable="false"
									/>
								);
							case "whatsapp":
								return (
									<WhatsAppIcon
										className="w-5 h-5 text-green-500"
										aria-hidden="true"
										focusable="false"
									/>
								);
							case "messenger":
								return (
									<MessengerIcon
										className="w-5 h-5 text-blue-400"
										aria-hidden="true"
										focusable="false"
									/>
								);
							default:
								return (
									<GmailIcon
										className="w-5 h-5"
										aria-hidden="true"
										focusable="false"
									/>
								);
						}
					};

					return (
						<Link
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 group"
						>
							{getIcon()}
							<span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
								{social.name}
							</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
