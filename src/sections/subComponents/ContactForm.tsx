"use client";

import { FadeIn } from "@/components/animations";
import { Button, Card } from "@/components/ui";
import { motion } from "framer-motion";
import { useRef, useState, useTransition } from "react";
import { sendEmail } from "@/actions/SendEmail";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

export default function ContactForm() {
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
		<FadeIn delay={0.2}>
			<Card variant="glass" className="p-8 h-[860px]">
				<form ref={formRef} action={handleSubmit} className="space-y-6 h-40 flex flex-col">
					<div className="flex-grow space-y-6">
						<div>
							<h1 className="heading-3 mb-8 capitalize">send me an business email</h1>
							<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
								placeholder="Please enter your name"
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
								placeholder="Please enter your email"
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
								rows={14}
								className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
								placeholder="Please enter your message"
								required
								disabled={isPending}
							/>
						</div>
					</div>

					<div className="pt-2">
						<Button type="submit" disabled={isPending} className="w-full group">
							{isPending ? "Sending..." : "Send Message"}
							{!isPending && <ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
						</Button>
					</div>

					{/* Success Message */}
					{state?.success && <p className="text-sm text-emerald-400 text-center font-medium">{state.message || "Message sent successfully! I'll get back to you soon."}</p>}

					{/* Error Message */}
					{state?.error && <p className="text-sm text-red-400 text-center font-medium">{state.error}</p>}
				</form>
			</Card>
		</FadeIn>
	);
}
