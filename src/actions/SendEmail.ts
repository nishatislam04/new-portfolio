"use server";

import { resend } from "@/lib/resend";
import { PERSONAL_INFO } from "@/constants/personal-info";

interface EmailResponse {
	success: boolean;
	error?: string;
	message?: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sanitize HTML content to prevent XSS
function sanitizeHtml(text: string): string {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\n/g, "<br>");
}

export async function sendEmail(_prevState: EmailResponse | null, formData: FormData): Promise<EmailResponse> {
	try {
		// Extract and validate form data
		const name = formData.get("name")?.toString()?.trim();
		const email = formData.get("email")?.toString()?.trim().toLowerCase();
		const message = formData.get("message")?.toString()?.trim();

		// Validation
		if (!name || name.length < 2) {
			return {
				success: false,
				error: "Name must be at least 2 characters long.",
			};
		}

		if (!email || !EMAIL_REGEX.test(email)) {
			return {
				success: false,
				error: "Please enter a valid email address.",
			};
		}

		if (!message || message.length < 10) {
			return {
				success: false,
				error: "Message must be at least 10 characters long.",
			};
		}

		// Additional validation for spam prevention
		if (name.length > 100 || email.length > 100 || message.length > 2000) {
			return {
				success: false,
				error: "Input too long. Please keep your message concise.",
			};
		}

		// Check for suspicious patterns (basic spam detection)
		const suspiciousPatterns = [
			/https?:\/\//gi, // URLs
			/\b(buy|sale|discount|offer|deal|free|win|winner|prize|lottery|casino|viagra|cialis)\b/gi,
		];

		const combinedText = `${name} ${email} ${message}`;
		const hasSuspiciousContent = suspiciousPatterns.some((pattern) => pattern.test(combinedText));

		if (hasSuspiciousContent) {
			return {
				success: false,
				error: "Message appears to be spam. Please contact me directly if this is a legitimate inquiry.",
			};
		}

		// Send email using Resend
		const result = await resend.emails.send({
			from: "Portfolio Contact <onboarding@resend.dev>",
			to: PERSONAL_INFO.email, // Use your actual email from constants
			subject: `New Portfolio Contact from ${name}`,
			replyTo: email,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
					<div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
						<h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
							New Contact Form Submission
						</h2>

						<div style="margin-bottom: 20px;">
							<h3 style="color: #555; margin-bottom: 5px;">From:</h3>
							<p style="margin: 0; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
								<strong>${sanitizeHtml(name)}</strong><br>
								<a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a>
							</p>
						</div>

						<div style="margin-bottom: 20px;">
							<h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
							<div style="padding: 15px; background-color: #f8f8f8; border-left: 4px solid #10b981; border-radius: 5px;">
								${sanitizeHtml(message)}
							</div>
						</div>

						<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
							<p>This message was sent from your portfolio contact form.</p>
							<p>Sent at: ${new Date().toLocaleString()}</p>
						</div>
					</div>
				</div>
			`,
		});

		if (result.error) {
			console.error("Resend API error:", result.error);
			return {
				success: false,
				error: "Failed to send email. Please try again or contact me directly.",
			};
		}

		return {
			success: true,
			message: "Thank you for your message! I'll get back to you within 24 hours.",
		};
	} catch (error) {
		console.error("Email sending error:", error);

		// Handle specific Resend errors
		if (error instanceof Error) {
			if (error.message.includes("API key")) {
				return {
					success: false,
					error: "Email service configuration error. Please contact me directly.",
				};
			}
			if (error.message.includes("rate limit")) {
				return {
					success: false,
					error: "Too many requests. Please wait a moment and try again.",
				};
			}
		}

		return {
			success: false,
			error: "An unexpected error occurred. Please try again or contact me directly.",
		};
	}
}
