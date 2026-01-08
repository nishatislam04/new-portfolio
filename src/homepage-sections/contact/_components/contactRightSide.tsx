import Link from "next/link";
import AvailabilityIcon from "@/assets/icons/availability.svg";
import EmailIcon from "@/assets/icons/email.svg";
import GithubIcon from "@/assets/icons/github.svg";
import LocationIcon from "@/assets/icons/location.svg";

import PhoneIcon from "@/assets/icons/phone.svg";
import ResponseTimeIcon from "@/assets/icons/response-time.svg";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui";
import { PERSONAL_INFO } from "@/constants/personal-info";
import ContactAdditional from "./contactAdditional";
import ContactSocialLinks from "./contactSoicalLinks";

export default function ContactRightSide() {
	return (
		<div className="space-y-8 h-full flex flex-col">
			<FadeIn delay={0.4} {...{ className: "flex-grow" }}>
				<Card variant="glass" className="p-8 h-full flex flex-col">
					<div className="flex-grow">
						<h3 className="heading-3 mb-6">Get in Touch</h3>
						<div className="space-y-6 mb-8">
							<div className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300">
								<EmailIcon
									className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
									aria-hidden="true"
									focusable="false"
								/>
								<div>
									<h4 className="font-semibold text-white mb-1">Email</h4>
									<a
										href={`mailto:${PERSONAL_INFO.CONTACT_INFO.email}`}
										className="text-gray-400 underline underline-offset-4 hover:text-emerald-400 transition-colors duration-200"
									>
										{PERSONAL_INFO.CONTACT_INFO.email}
									</a>
								</div>
							</div>
							<div className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300">
								<GithubIcon
									className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
									aria-hidden="true"
									focusable="false"
								/>
								<div>
									<h4 className="font-semibold text-white mb-1">GitHub</h4>
									<Link
										href={PERSONAL_INFO.CONTACT_INFO.github}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-400 underline underline-offset-4 hover:text-emerald-400 transition-colors duration-200"
									>
										github.com/nishatislam04
									</Link>
								</div>
							</div>
							<div className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300">
								<PhoneIcon
									className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
									aria-hidden="true"
									focusable="false"
								/>
								<div>
									<h4 className="font-semibold text-white mb-1">Call Me</h4>
									<a
										href={`tel:${PERSONAL_INFO.CONTACT_INFO.phone}`}
										className="text-gray-400 underline underline-offset-4 hover:text-emerald-400 transition-colors duration-200"
									>
										{PERSONAL_INFO.CONTACT_INFO.phone}
									</a>
								</div>
							</div>
							<div className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300">
								<LocationIcon
									className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
									aria-hidden="true"
									focusable="false"
								/>
								<div>
									<h4 className="font-semibold text-white mb-1">Location</h4>
									<a
										href={PERSONAL_INFO.CONTACT_INFO.locationLink}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-400 underline underline-offset-4 hover:text-emerald-400 transition-colors duration-200"
									>
										{PERSONAL_INFO.CONTACT_INFO.location}
									</a>
								</div>
							</div>
							<div className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300">
								<AvailabilityIcon
									className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
									aria-hidden="true"
									focusable="false"
								/>
								<div>
									<h4 className="font-semibold text-white mb-1">
										Availability
									</h4>
									<p className="text-gray-400">
										{PERSONAL_INFO.CONTACT_INFO.availability}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300">
								<ResponseTimeIcon
									className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0"
									aria-hidden="true"
									focusable="false"
								/>
								<div>
									<h4 className="font-semibold text-white mb-1">
										Response Time
									</h4>
									<p className="text-gray-400">Usually within 24 hours</p>
								</div>
							</div>
						</div>
					</div>

					{/* Social Links */}
					<ContactSocialLinks />
				</Card>
			</FadeIn>

			{/* Additional Contact Methods */}
			<ContactAdditional />
		</div>
	);
}
