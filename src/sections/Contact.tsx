"use client";

import { useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Section, Card, Button } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { ArrowUpRightIcon, LinkedInIcon, WhatsAppIcon, MessengerIcon, GmailIcon } from "@/components/icons";
import { otherImages } from "@/assets/images";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/constants";
import { sendEmail } from "@/actions/SendEmail";

export const ContactSection = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const [isPending, startTransition] = useTransition();
	const [state, setState] = useState<{ success: boolean; error?: string; message?: string } | null>(null);

	// Handle form submission
	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			const result = await sendEmail(null, formData);
			setState(result);

			// Reset form on successful submission
			if (result.success && formRef.current) {
				formRef.current.reset();
			}
		});
	};

	return (
		<Section id="contact" className="relative">
			{/* Background elements */}
			<div className="absolute inset-0 opacity-5">
				<Image src={otherImages.grain} alt="" fill className="object-cover" />
			</div>

			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center mb-16">
							<h2 className="heading-2 mb-4">
								Let's <span className="gradient-text">Connect</span>
							</h2>
							<p className="body-large text-gray-400 max-w-2xl mx-auto">Ready to bring your ideas to life? Let's discuss your project and create something amazing together.</p>
						</div>
					</FadeIn>

					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
						{/* Contact Form */}
						<FadeIn delay={0.2}>
							<Card variant="glass" className="p-8 h-[750px]">
								<form ref={formRef} action={handleSubmit} className="space-y-6 h-40 flex flex-col">
									<div className="flex-grow space-y-6">
										<div>
											<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
												Name
											</label>
											<input
												type="text"
												id="name"
												name="name"
												className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
												placeholder="Your name"
												required
												disabled={isPending}
											/>
										</div>

										<div>
											<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
												Email
											</label>
											<input
												type="email"
												id="email"
												name="email"
												className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
												placeholder="your.email@example.com"
												required
												disabled={isPending}
											/>
										</div>

										<div>
											<label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
												Message
											</label>
											<textarea
												id="message"
												name="message"
												rows={10}
												className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
												placeholder="Tell me about your project..."
												required
												disabled={isPending}
											/>
										</div>
									</div>

									<div className="pt-4">
										<Button type="submit" disabled={isPending} className="w-full group">
											{isPending ? "Sending..." : "Send Message"}
											{!isPending && <ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
										</Button>
									</div>

									{/* Success Message */}
									{state?.success && (
										<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-center font-medium">
											{state.message || "Message sent successfully! I'll get back to you soon."}
										</motion.p>
									)}

									{/* Error Message */}
									{state?.error && (
										<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-center font-medium">
											{state.error}
										</motion.p>
									)}
								</form>
							</Card>
						</FadeIn>

						{/* Contact Info */}
						<div className="space-y-8 h-full flex flex-col">
							<FadeIn delay={0.4} className="flex-grow">
								<Card variant="glass" className="p-8 h-full flex flex-col">
									<div className="flex-grow">
										<h3 className="heading-3 mb-6">Get in Touch</h3>
										<div className="space-y-6 mb-8">
											<div>
												<h4 className="font-semibold text-white mb-2">Email</h4>
												<a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
													{CONTACT_INFO.email}
												</a>
											</div>
											<div>
												<h4 className="font-semibold text-white mb-2">GitHub</h4>
												<a href="https://github.com/nishatislam04" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
													github.com/nishatislam04
												</a>
											</div>
											<div>
												<h4 className="font-semibold text-white mb-2">Call Me</h4>
												<p className="text-gray-400">{CONTACT_INFO.phone}</p>
											</div>
											<div>
												<h4 className="font-semibold text-white mb-2">Location</h4>
												<p className="text-gray-400">{CONTACT_INFO.location}</p>
											</div>
											<div>
												<h4 className="font-semibold text-white mb-2">Availability</h4>
												<p className="text-gray-400">{CONTACT_INFO.availability}</p>
											</div>
											<div>
												<h4 className="font-semibold text-white mb-2">Response Time</h4>
												<p className="text-gray-400">Usually within 24 hours</p>
											</div>
										</div>
									</div>

									{/* Social Links */}
									<div className="mt-8 pt-8 border-t border-gray-700/50">
										<h4 className="font-semibold text-white mb-4">Connect With Me</h4>
										<div className="grid grid-cols-2 gap-3">
											{SOCIAL_LINKS.map((social) => {
												const getIcon = () => {
													switch (social.icon) {
														case "gmail":
															return <GmailIcon className="w-5 h-5" />;
														case "linkedin":
															return <LinkedInIcon className="w-5 h-5 text-blue-500" />;
														case "whatsapp":
															return <WhatsAppIcon className="w-5 h-5 text-green-500" />;
														case "messenger":
															return <MessengerIcon className="w-5 h-5 text-blue-400" />;
														default:
															return <GmailIcon className="w-5 h-5" />;
													}
												};

												return (
													<motion.a
														key={social.name}
														href={social.url}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 group"
														whileHover={{ scale: 1.02, y: -2 }}
														whileTap={{ scale: 0.98 }}>
														{getIcon()}
														<span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{social.name}</span>
													</motion.a>
												);
											})}
										</div>
									</div>
								</Card>
							</FadeIn>

							{/* Additional Contact Methods */}
							<FadeIn delay={0.6}>
								<Card variant="glass" className="p-6">
									<h4 className="font-semibold text-white mb-4">Prefer Other Ways?</h4>
									<div className="space-y-3 text-sm">
										<p className="text-gray-400">📞 Schedule a call to discuss your project</p>
										<p className="text-gray-400">💬 Send me a message on LinkedIn</p>
										<p className="text-gray-400">⚡ Quick response within 24 hours</p>
									</div>
								</Card>
							</FadeIn>
						</div>
					</div>
				</StaggerContainer>
			</div>
		</Section>
	);
};
