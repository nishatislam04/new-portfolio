"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createSocialLinks } from "@/actions/social-links-actions";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SocialLinksCreate() {
	const [submitting, setSubmitting] = useState(false);

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formEl = e.currentTarget;
		const formData = new FormData(formEl);
		setSubmitting(true);
		const result = await createSocialLinks(formData);
		setSubmitting(false);

		if (!result.success) {
			toast.error(result.message ?? "Failed to create social links");
			return;
		}
		formEl.reset();
		toast.success(result.data.message);
	}

	return (
		<form onSubmit={onSubmit} className="space-y-8">
			<FieldSet>
				<FieldLegend>Gmail</FieldLegend>
				<FieldDescription>
					Enter details for Gmail contact link.
				</FieldDescription>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="gmail[label]">Label</FieldLabel>
						<Input
							id="gmail[label]"
							name="gmail[label]"
							placeholder="Gmail"
							autoComplete="off"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="gmail[url]">URL</FieldLabel>
						<Input
							id="gmail[url]"
							name="gmail[url]"
							placeholder="mailto:you@example.com"
							autoComplete="off"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="gmail[icon]">Icon (SVG/PNG)</FieldLabel>
						<Input
							id="gmail[icon]"
							name="gmail[icon]"
							type="file"
							accept="image/*,image/svg+xml"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="gmail[sortOrder]">Sort order</FieldLabel>
						<Input
							id="gmail[sortOrder]"
							name="gmail[sortOrder]"
							type="number"
							defaultValue={0}
						/>
					</Field>
				</FieldGroup>
			</FieldSet>
			<FieldSeparator />
			<FieldSet>
				<FieldLegend>LinkedIn</FieldLegend>
				<FieldDescription>
					Enter details for LinkedIn profile link.
				</FieldDescription>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="linkedin[label]">Label</FieldLabel>
						<Input
							id="linkedin[label]"
							name="linkedin[label]"
							placeholder="LinkedIn"
							autoComplete="off"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="linkedin[url]">URL</FieldLabel>
						<Input
							id="linkedin[url]"
							name="linkedin[url]"
							placeholder="https://www.linkedin.com/in/username"
							autoComplete="off"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="linkedin[icon]">Icon (SVG/PNG)</FieldLabel>
						<Input
							id="linkedin[icon]"
							name="linkedin[icon]"
							type="file"
							accept="image/*,image/svg+xml"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="linkedin[sortOrder]">Sort order</FieldLabel>
						<Input
							id="linkedin[sortOrder]"
							name="linkedin[sortOrder]"
							type="number"
							defaultValue={1}
						/>
					</Field>
				</FieldGroup>
			</FieldSet>

			<FieldSeparator />
			<FieldSet>
				<FieldLegend>WhatsApp</FieldLegend>
				<FieldDescription>Enter details for WhatsApp link.</FieldDescription>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="whatsapp[label]">Label</FieldLabel>
						<Input
							id="whatsapp[label]"
							name="whatsapp[label]"
							placeholder="WhatsApp"
							autoComplete="off"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="whatsapp[url]">URL</FieldLabel>
						<Input
							id="whatsapp[url]"
							name="whatsapp[url]"
							placeholder="https://wa.me/8801XXXXXXXXX"
							autoComplete="off"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="whatsapp[icon]">Icon (SVG/PNG)</FieldLabel>
						<Input
							id="whatsapp[icon]"
							name="whatsapp[icon]"
							type="file"
							accept="image/*,image/svg+xml"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="whatsapp[sortOrder]">Sort order</FieldLabel>
						<Input
							id="whatsapp[sortOrder]"
							name="whatsapp[sortOrder]"
							type="number"
							defaultValue={2}
						/>
					</Field>
				</FieldGroup>
			</FieldSet>

			<FieldSeparator />
			<FieldSet>
				<FieldLegend>Messenger</FieldLegend>
				<FieldDescription>
					Enter details for Facebook Messenger link.
				</FieldDescription>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="messenger[label]">Label</FieldLabel>
						<Input
							id="messenger[label]"
							name="messenger[label]"
							placeholder="Messenger"
							autoComplete="off"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="messenger[url]">URL</FieldLabel>
						<Input
							id="messenger[url]"
							name="messenger[url]"
							placeholder="https://m.me/username"
							autoComplete="off"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="messenger[icon]">Icon (SVG/PNG)</FieldLabel>
						<Input
							id="messenger[icon]"
							name="messenger[icon]"
							type="file"
							accept="image/*,image/svg+xml"
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="messenger[sortOrder]">Sort order</FieldLabel>
						<Input
							id="messenger[sortOrder]"
							name="messenger[sortOrder]"
							type="number"
							defaultValue={3}
						/>
					</Field>
				</FieldGroup>
			</FieldSet>

			<div className="flex justify-end gap-3">
				<Button type="submit" disabled={submitting}>
					{submitting ? "Saving..." : "Save social links"}
				</Button>
			</div>
		</form>
	);
}
