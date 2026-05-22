import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = { title: "Admin Login", description: "FighterPlayz command center login." };

export default function AdminLoginPage() {
  return (
    <main>
      <Section className="min-h-[70vh]">
        <SectionHeading eyebrow="Admin" title="Command Center Access" text="Secure login for managing projects, plugins, services, testimonials, dev logs, contact messages, and site settings." />
        <LoginForm />
      </Section>
    </main>
  );
}
