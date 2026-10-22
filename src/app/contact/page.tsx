import React from "react";
import { Metadata } from "next";
import { PhoneCall, Mail, MapPin, Clock, MessageSquare, Compass, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CallNowButton } from "@/components/shared/CallNowButton";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { FAQS } from "@/data/faqs";
import { RoleIndependenceSection } from "@/components/shared/RoleIndependenceSection";

export const metadata: Metadata = {
  title: "Contact Guest Assist | Travel Information & Enquiry Assistance",
  description:
    "Get in touch with the Guest Assist team. Call our helpline or send a message for general hotel property information and stay enquiry assistance across India.",
};

const HOW_WE_HELP = [
  {
    icon: Compass,
    title: "General Hotel Information",
    desc: "Discover verified property details, room configurations, amenities, and location guidance across destinations in India.",
  },
  {
    icon: MessageSquare,
    title: "Stay Enquiry Assistance",
    desc: "Receive prompt guidance on availability, property options, and stay requirements to review before booking with the responsible provider.",
  },
  {
    icon: PhoneCall,
    title: "Direct Phone Guidance",
    desc: "Speak directly with knowledgeable coordinators who understand destination specifics, group needs, and enquiry logistics.",
  },
  {
    icon: ShieldCheck,
    title: "Independent Guidance",
    desc: "Have questions about our independent assistance? We help you explore options and encourage direct verification with booking providers.",
  },
];

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* 1. Hero Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden min-h-[360px] flex items-center p-8 sm:p-12 border border-[#123452] shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1800&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#03101F] via-[#03101F]/95 to-[#03101F]/70" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F6B936]/15 text-[#FFD16A] border border-[#F6B936]/30">
              WE ARE HERE TO HELP
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#F7F8FA] leading-tight">
              Contact Guest Assist
            </h1>

            <p className="text-sm sm:text-base text-[#C4D1DF] leading-relaxed font-light">
              Have questions regarding destinations, property details, or need assistance submitting a stay enquiry? Reach out to the Guest Assist team via phone or send us a message below.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <CallNowButton />
              <a
                href="#contact-form-section"
                className="btn-outline-gold px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
              >
                <span>Send An Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main 2-Column Section: Form Left, Info Cards Right */}
      <section id="contact-form-section" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Call Us */}
            <div className="p-6 rounded-2xl bg-[#06172A] border border-[#123452] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#0A2340] border border-[#123452] flex items-center justify-center text-[#F6B936]">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#F7F8FA]">Call Us Directly</h4>
              <p className="text-xs text-[#C4D1DF]">
                Speak with our Guest Assist coordinators 24/7:
              </p>
              <a
                href={SITE_CONFIG.phoneTel}
                className="block text-lg font-bold text-[#FFD16A] hover:underline pt-1"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
            </div>

            {/* Email Us */}
            <div className="p-6 rounded-2xl bg-[#06172A] border border-[#123452] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#0A2340] border border-[#123452] flex items-center justify-center text-[#F6B936]">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#F7F8FA]">Email Inquiries</h4>
              <p className="text-xs text-[#C4D1DF]">
                Send enquiries or special assistance queries:
              </p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="block text-sm font-bold text-[#FFD16A] hover:underline pt-1"
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-[#06172A] border border-[#123452] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#0A2340] border border-[#123452] flex items-center justify-center text-[#F6B936]">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#F7F8FA]">Guest Assistance Hours</h4>
              <p className="text-xs text-[#C4D1DF] leading-relaxed">
                {SITE_CONFIG.businessHours}
              </p>
              <span className="inline-block text-[11px] text-[#8ba2bc]">
                Our dedicated coordination team is available around the clock to assist you.
              </span>
            </div>

            {/* Office Address & Operator Details */}
            <div className="p-6 rounded-2xl bg-[#06172A] border border-[#123452] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#0A2340] border border-[#123452] flex items-center justify-center text-[#F6B936]">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#F7F8FA]">Office Address</h4>
              <p className="text-xs text-[#C4D1DF] leading-relaxed">
                {SITE_CONFIG.address.line1}
                <br />
                {SITE_CONFIG.address.line2}
                <br />
                {SITE_CONFIG.address.line3}
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-[#8ba2bc]">
                <span className="block font-medium text-[#C4D1DF]">{SITE_CONFIG.operatorName}</span>
                {SITE_CONFIG.gst && (
                  <span className="block text-[11px] font-mono mt-0.5">
                    GSTIN: {SITE_CONFIG.gst}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How We Can Help Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="SERVICES"
          title="How Guest Assist Helps You"
          description="Whatever your travel needs, our dedicated enquiry coordinators are here to facilitate."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_WE_HELP.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#06172A] border border-[#123452] p-6 rounded-2xl space-y-3 hover:border-[#F6B936]/40 transition-colors shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A2340] border border-[#123452] flex items-center justify-center text-[#F6B936]">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#F7F8FA]">{item.title}</h4>
                <p className="text-xs text-[#C4D1DF] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Role & Independence Section */}
      <div className="max-w-7xl mx-auto">
        <RoleIndependenceSection />
      </div>

      {/* 5. Contact FAQs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="HELP & ANSWERS"
          title="Frequently Asked Questions"
          description="Instant clarity on enquiry submissions, contact channels, and our independent role."
        />
        <FAQAccordion items={FAQS} />
      </section>
    </div>
  );
}
