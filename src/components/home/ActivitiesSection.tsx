import React from "react";
import { Briefcase, Users, Compass, PartyPopper } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const TRAVELLER_TYPES = [
  {
    icon: Briefcase,
    title: "Corporate & Business Stays",
    tagline: "Productivity, Connectivity & Prime Locations",
    description: "Centrally located in major technology hubs like Bengaluru Outer Ring Road, Gurugram Downtown, and Mumbai Airport with executive facilities.",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Users,
    title: "Family Vacations",
    tagline: "Comfort, Multi-Bedroom Suites & Kids Pools",
    description: "Relaxed family environments in Goa Colva, Mahabaleshwar, and Agra featuring dedicated children's menus and spacious suites.",
    bgImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Compass,
    title: "Weekend Leisure & Heritage",
    tagline: "Hill Retreats, Wine Tours & Cultural Gateways",
    description: "Scenic weekend escapes to Nashik vineyards, Shillong pine hills, and Amritsar cultural landmarks with bespoke local tours.",
    bgImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: PartyPopper,
    title: "Conferences & Milestone Events",
    tagline: "Grand Ballrooms, Outdoor Lawns & Catering",
    description: "Accommodating conventions, weddings, and executive offsites in Pune Chakan, Bhopal, and Hyderabad with dedicated event planners.",
    bgImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
  },
];

export function ActivitiesSection() {
  return (
    <section id="experiences" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <SectionHeading
        eyebrow="TAILORED HOSPITALITY"
        title="Stay Information for Every Type of Traveller"
        description="Whether you are planning a business trip, family holiday, couples' getaway or leisure break, Guest Assist can help you explore relevant property information."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRAVELLER_TYPES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative group rounded-2xl overflow-hidden min-h-[380px] flex flex-col justify-end p-6 border border-[#123452] transition-all duration-300 hover:border-[#F6B936]/60 shadow-xl"
            >
              {/* Background Image with Dark Navy Gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${item.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03101F] via-[#03101F]/80 to-transparent" />

              {/* Content */}
              <div className="relative z-10 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#F6B936] text-[#03101F] flex items-center justify-center font-bold mb-3 shadow-lg shadow-[#F6B936]/20">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-serif font-bold text-xl text-[#F7F8FA] group-hover:text-[#FFD16A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-[#FFD16A]">{item.tagline}</p>
                <p className="text-xs text-[#C4D1DF] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
