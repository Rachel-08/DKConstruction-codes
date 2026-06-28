"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

// ─────────────────────────────────────────────
// Types  (identical to Category page)
// ─────────────────────────────────────────────

type Project = {
  id: number;
  title: string;
  year: string;
  location: string;
  area: string;
  tags: string[];
  image: string;
  description: string;
};

type ServiceMeta = {
  label: string;
  description: string;
  tagline: string;
  stat: string;
  statLabel: string;
};

// ─────────────────────────────────────────────
// Meta — one entry per service slug
// ─────────────────────────────────────────────

const SERVICE_META: Record<string, ServiceMeta> = {
  construction: {
    label: "Construction",
    description:
      "Full-scale building construction managed end-to-end — from foundation engineering to final finishing. Every material sourced, every milestone verified.",
    tagline: "Built to last, delivered with precision",
    stat: "40+",
    statLabel: "Projects",
  },
  "floor-planning": {
    label: "Floor Planning",
    description:
      "Precise spatial layouts that balance flow, function, and form. Every square foot considered with purpose — from concept sketch to construction drawings.",
    tagline: "Space planned with intent",
    stat: "120+",
    statLabel: "Plans",
  },
  "structural-design": {
    label: "Structural Design",
    description:
      "Engineering-grade structural systems designed for longevity, safety, and load integrity across all building typologies.",
    tagline: "Structure that endures",
    stat: "55+",
    statLabel: "Structures",
  },
  "3d-design": {
    label: "3D Design",
    description:
      "Photorealistic visualisations, walkthroughs, and material studies that bring unbuilt architecture to life before a single brick is laid.",
    tagline: "Vision before construction",
    stat: "200+",
    statLabel: "Renders",
  },
  approvals: {
    label: "Approvals",
    description:
      "End-to-end handling of Municipal, N.A.C., Fire & BRIT approvals. We navigate compliance so your project moves without friction.",
    tagline: "Compliance made effortless",
    stat: "80+",
    statLabel: "Approvals",
  },
  renovation: {
    label: "Renovation",
    description:
      "Considered renovation that respects existing character while introducing contemporary precision. Old bones, new life.",
    tagline: "Old bones, new life",
    stat: "30+",
    statLabel: "Projects",
  },
};

// ─────────────────────────────────────────────
// Projects — keyed by slug
// ─────────────────────────────────────────────

const SERVICE_PROJECTS: Record<string, Project[]> = {
  construction: [
    {
      id: 1,
      title: "The Mandal Residence",
      year: "2024",
      location: "Balasore, OD",
      area: "3,800 sq ft",
      tags: ["Residential", "G+2"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop",
      description: "A G+2 family residence executed with RCC framed structure, premium brick masonry, and complete MEP installation. The project was delivered in 14 months with zero structural defects at handover.",
    },
    {
      id: 2,
      title: "Sunrise Commercial Block",
      year: "2024",
      location: "Baripada, OD",
      area: "12,000 sq ft",
      tags: ["Commercial", "G+4"],
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=900&auto=format&fit=crop",
      description: "A G+4 mixed-use commercial block with ground floor retail, upper floor office spaces, and a rooftop utility zone. Structural design optimised for long column-free spans.",
    },
    {
      id: 3,
      title: "Patel Villa",
      year: "2023",
      location: "Bhubaneswar, OD",
      area: "5,200 sq ft",
      tags: ["Villa", "Luxury"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop",
      description: "A luxury bungalow with double-height living spaces, a private swimming pool, and a landscaped garden. Premium Italian marble and German hardware throughout.",
    },
    {
      id: 4,
      title: "NH-60 Warehouse",
      year: "2023",
      location: "Jaleswar, OD",
      area: "28,000 sq ft",
      tags: ["Industrial", "Steel Frame"],
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=900&auto=format&fit=crop",
      description: "A pre-engineered steel frame warehouse with 9m clear height, dock levellers, and fire suppression systems. Completed in 8 months from ground-breaking.",
    },
    {
      id: 5,
      title: "Ashok Nagar Row Houses",
      year: "2022",
      location: "Balasore, OD",
      area: "1,400 sq ft each",
      tags: ["Residential", "Cluster"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
      description: "A cluster of 8 identical row houses developed as affordable housing units. Standardised construction methodology reduced cost per unit by 18% versus conventional methods.",
    },
    {
      id: 6,
      title: "District Court Annex",
      year: "2022",
      location: "Balasore, OD",
      area: "9,400 sq ft",
      tags: ["Institutional", "Government"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop",
      description: "A government institutional building constructed to CPWD specifications. Seismic zone III compliance, 50-year design life, and full accessibility provisions throughout.",
    },
  ],

  "floor-planning": [
    {
      id: 1,
      title: "The Lakefront Bungalow Plan",
      year: "2024",
      location: "Chandipur, OD",
      area: "4,100 sq ft",
      tags: ["Residential", "Open Plan"],
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop",
      description: "A lakefront bungalow planned around panoramic water views. The layout organises all primary living spaces along the eastern facade while service zones are tucked to the rear.",
    },
    {
      id: 2,
      title: "Multi-Tenant Office Floor",
      year: "2024",
      location: "Bhubaneswar, OD",
      area: "6,800 sq ft",
      tags: ["Commercial", "Multi-tenant"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop",
      description: "A flexible floor plate designed to accommodate two to four independent office tenants with shared lobbies, toilets, and service cores. Partition walls align with the structural grid.",
    },
    {
      id: 3,
      title: "Compact Urban Apartment",
      year: "2023",
      location: "Cuttack, OD",
      area: "780 sq ft",
      tags: ["Apartment", "Compact"],
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=900&auto=format&fit=crop",
      description: "A compact 2BHK apartment planned to feel generous despite its small footprint. Furniture zoning, built-in storage walls, and a through-ventilation strategy maximise livability.",
    },
    {
      id: 4,
      title: "Clinic & Pharmacy Layout",
      year: "2023",
      location: "Balasore, OD",
      area: "1,200 sq ft",
      tags: ["Healthcare", "Retail"],
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=900&auto=format&fit=crop",
      description: "A combined GP clinic and pharmacy planned for smooth patient flow. Consultation rooms, waiting, dispensing, and storage are zoned to prevent cross-circulation.",
    },
    {
      id: 5,
      title: "G+3 Apartment Block",
      year: "2022",
      location: "Balasore, OD",
      area: "2,200 sq ft per floor",
      tags: ["Apartment", "G+3"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
      description: "A G+3 block planned with two units per floor. Each unit is a mirror image of the other, minimising plumbing runs and structural complexity while providing generous 3BHK layouts.",
    },
  ],

  "structural-design": [
    {
      id: 1,
      title: "RCC Framed Residence",
      year: "2024",
      location: "Balasore, OD",
      area: "2,600 sq ft",
      tags: ["RCC", "Residential"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop",
      description: "Complete structural design for a G+1 residence including soil investigation, foundation design, column layout, and beam-slab schedule. IS 456 compliant with seismic zone II detailing.",
    },
    {
      id: 2,
      title: "Long-Span Commercial Roof",
      year: "2024",
      location: "Bhadrak, OD",
      area: "18,000 sq ft",
      tags: ["Steel", "Long-span"],
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=900&auto=format&fit=crop",
      description: "A steel portal frame roof structure spanning 24m without intermediate columns for a showroom. Wind uplift analysis, connection design, and fabrication drawings produced.",
    },
    {
      id: 3,
      title: "Basement Retaining Wall",
      year: "2023",
      location: "Cuttack, OD",
      area: "Basement: 8,000 sq ft",
      tags: ["Basement", "Retaining"],
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=900&auto=format&fit=crop",
      description: "Structural design for a two-level basement with cantilever retaining walls and raft foundation. Waterproofing strategy, dewatering plan, and temporary propping scheme included.",
    },
    {
      id: 4,
      title: "Water Tank Structure",
      year: "2023",
      location: "Balasore, OD",
      area: "200,000 L capacity",
      tags: ["Infrastructure", "RCC"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
      description: "Elevated RCC water tank structure with 200,000 litre capacity. Intze-type tank with staging designed for seismic zone III and 50m/s wind speed.",
    },
  ],

  "3d-design": [
    {
      id: 1,
      title: "Coastal Villa Render Series",
      year: "2024",
      location: "Chandipur, OD",
      area: "Exterior + Interior",
      tags: ["3D", "Exterior"],
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop",
      description: "A full render series for a coastal villa covering all elevations, dusk views, and four key interior spaces. Produced at 4K resolution for client presentation and marketing.",
    },
    {
      id: 2,
      title: "Showroom Walkthrough",
      year: "2024",
      location: "Bhubaneswar, OD",
      area: "Animation + Stills",
      tags: ["3D", "Animation"],
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=900&auto=format&fit=crop",
      description: "A 90-second animated walkthrough of a proposed car showroom used for investor presentations. Real-time render engine enabled daily design iterations during the scheme development phase.",
    },
    {
      id: 3,
      title: "Kitchen & Living Material Study",
      year: "2024",
      location: "Remote",
      area: "Material Visualisation",
      tags: ["3D", "Interior"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900&auto=format&fit=crop",
      description: "Detailed material study renders for a luxury apartment's kitchen and living area, allowing the client to visualise three alternative finish combinations before specifying.",
    },
    {
      id: 4,
      title: "G+4 Facade Options",
      year: "2023",
      location: "Balasore, OD",
      area: "Concept Renders",
      tags: ["3D", "Facade"],
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=900&auto=format&fit=crop",
      description: "Three alternative facade treatments rendered for a G+4 commercial block — tile, paint, and ACP cladding — across morning and evening lighting conditions to aid client decision-making.",
    },
    {
      id: 5,
      title: "Landscape & Site Visualisation",
      year: "2023",
      location: "Jajpur, OD",
      area: "Full Site",
      tags: ["3D", "Landscape"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
      description: "Full-site landscape visualisation for a gated residential township showing planting at 5-year maturity, street lighting, and amenity zones.",
    },
    {
      id: 6,
      title: "Temple Complex Render",
      year: "2022",
      location: "Balasore, OD",
      area: "3D Documentation",
      tags: ["3D", "Heritage"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop",
      description: "Photorealistic renders of a proposed temple complex produced for the trust committee. Traditional Kalinga architecture elements digitally modelled and visualised for approval.",
    },
  ],

  approvals: [
    {
      id: 1,
      title: "Municipal Building Plan Sanction",
      year: "2024",
      location: "Balasore, OD",
      area: "3,200 sq ft",
      tags: ["Municipal", "Residential"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop",
      description: "End-to-end building plan sanction from BDA including site plan, floor plans, elevation drawings, NOC coordination, and fee deposit. Approved in 38 working days.",
    },
    {
      id: 2,
      title: "N.A.C. Conversion Certificate",
      year: "2024",
      location: "Jaleswar, OD",
      area: "Agricultural to Residential",
      tags: ["N.A.C.", "Land Use"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop",
      description: "Full documentation and follow-up for Non-Agricultural Clearance for a 0.8 acre plot. Includes revenue records, survey reports, collector's order, and mutation.",
    },
    {
      id: 3,
      title: "Fire NOC — Commercial Complex",
      year: "2023",
      location: "Bhubaneswar, OD",
      area: "22,000 sq ft",
      tags: ["Fire NOC", "Commercial"],
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=900&auto=format&fit=crop",
      description: "Fire safety layout design, hydrant and sprinkler system specifications, staircase compliance review, and liaison with the Fire Services Department for NOC issuance.",
    },
    {
      id: 4,
      title: "BRIT Clearance — Industrial Unit",
      year: "2023",
      location: "Balasore, OD",
      area: "Industrial",
      tags: ["BRIT", "Industrial"],
      image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=900&auto=format&fit=crop",
      description: "BRIT clearance obtained for a new industrial unit near NH-60. Full application, site inspection coordination, and post-approval compliance documentation.",
    },
    {
      id: 5,
      title: "Completion Certificate",
      year: "2022",
      location: "Baripada, OD",
      area: "G+2 Residence",
      tags: ["Completion", "Municipal"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
      description: "Obtaining the Completion / Occupancy Certificate from the local municipal authority post construction. Includes inspection facilitation, deficiency rectification, and final submission.",
    },
  ],

  renovation: [
    {
      id: 1,
      title: "The Old Town Haveli",
      year: "2024",
      location: "Balasore, OD",
      area: "4,600 sq ft",
      tags: ["Heritage", "Restoration"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop",
      description: "Sensitive restoration of a 1940s haveli, retaining original lime plaster ceilings, teak joinery, and courtyard geometry while upgrading structural, electrical, and plumbing systems.",
    },
    {
      id: 2,
      title: "Apartment Full Remodel",
      year: "2024",
      location: "Cuttack, OD",
      area: "1,450 sq ft",
      tags: ["Apartment", "Remodel"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=900&auto=format&fit=crop",
      description: "Complete gut-and-rebuild renovation of a 20-year-old 3BHK apartment. New layout, concealed wiring, modular kitchen, false ceiling, and full finish specification.",
    },
    {
      id: 3,
      title: "Shopfront Retrofit",
      year: "2023",
      location: "Balasore, OD",
      area: "800 sq ft",
      tags: ["Retail", "Retrofit"],
      image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=900&auto=format&fit=crop",
      description: "Retail shopfront renovation including new facade, internal fit-out, display shelving, lighting design, and signage. Completed over a single weekend to minimise trading disruption.",
    },
    {
      id: 4,
      title: "School Building Upgrade",
      year: "2023",
      location: "Jaleswar, OD",
      area: "8,200 sq ft",
      tags: ["Institutional", "Upgrade"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop",
      description: "Structural strengthening, roof replacement, toilet block additions, ramp access, and repainting for a government school building. Work completed during the summer vacation period.",
    },
    {
      id: 5,
      title: "Office Reception Refresh",
      year: "2022",
      location: "Bhubaneswar, OD",
      area: "320 sq ft",
      tags: ["Commercial", "Refresh"],
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=900&auto=format&fit=crop",
      description: "A reception and lobby refresh for a consulting firm — new stone cladding, backlit logo panel, custom reception desk, and updated lighting scheme. Three-day execution.",
    },
  ],
};

// ─────────────────────────────────────────────
// ProjectCard  (identical to Category page)
// ─────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: 0.2 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => window.innerWidth >= 640 && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className="relative overflow-hidden w-full flex flex-col sm:cursor-pointer"
      style={{
        borderRadius: 4,
        border: "0.5px solid rgba(26,18,8,0.1)",
        background: "#f0ece0",
        boxShadow: hovered
          ? "0 20px 56px rgba(26,18,8,0.14)"
          : "0 4px 16px rgba(26,18,8,0.07)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "clamp(220px,32vh,320px)" }}>
        <motion.img
          src={project.image}
          alt={project.title}
          draggable={false}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ transformOrigin: "center" }}
        />

        {/* Desktop blur overlay */}
        <motion.div
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:flex absolute inset-0 flex-col items-center justify-center gap-2"
          style={{
            backdropFilter: "blur(10px) saturate(0.8)",
            WebkitBackdropFilter: "blur(10px) saturate(0.8)",
            background: "rgba(240,236,224,0.38)",
          }}
        >
          <span className="font-mono uppercase tracking-[0.32em]" style={{ fontSize: "clamp(6px,0.58vw,8px)", color: "rgba(26,18,8,0.45)" }}>
            {project.tags.join(" · ")}
          </span>
          <h3 className="font-serif text-center leading-tight px-4" style={{ fontSize: "clamp(16px,1.8vw,24px)", color: "#1a1208", letterSpacing: "-0.02em" }}>
            {project.title}
          </h3>
          <motion.span animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="font-mono uppercase tracking-[0.28em] mt-1" style={{ fontSize: "clamp(5px,0.5vw,7px)", color: "rgba(200,160,80,0.7)" }}>
            Hover to reveal
          </motion.span>
        </motion.div>

        {/* Desktop hover info */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden sm:block absolute bottom-0 left-0 right-0"
          style={{
            padding: "clamp(10px,1.8vh,18px) clamp(12px,1.6vw,20px)",
            background: "linear-gradient(0deg,rgba(10,7,3,0.82) 0%,rgba(10,7,3,0.4) 70%,transparent 100%)",
          }}
        >
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col gap-1">
              <span className="font-mono uppercase tracking-[0.28em]" style={{ fontSize: "clamp(6px,0.55vw,7px)", color: "rgba(200,160,80,0.75)" }}>
                {project.tags.join(" · ")}
              </span>
              <h3 className="font-serif leading-tight" style={{ fontSize: "clamp(14px,1.6vw,22px)", color: "#f0e8d4", letterSpacing: "-0.02em" }}>
                {project.title}
              </h3>
            </div>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="flex flex-col items-center gap-1 shrink-0">
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: "0.5px solid rgba(200,160,80,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 12 12" fill="none" style={{ width: 10 }}>
                  <line x1="6" y1="2" x2="6" y2="10" stroke="rgba(200,160,80,0.8)" strokeWidth="1" />
                  <line x1="2" y1="6" x2="10" y2="6" stroke="rgba(200,160,80,0.8)" strokeWidth="1" />
                </svg>
              </div>
              <span className="font-mono uppercase" style={{ fontSize: 5, color: "rgba(200,160,80,0.55)", letterSpacing: "0.2em" }}>Open</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Index */}
        <div className="absolute top-3 left-3 font-mono" style={{ fontSize: "clamp(7px,0.55vw,8px)", color: hovered ? "rgba(200,160,80,0.7)" : "rgba(26,18,8,0.35)", letterSpacing: "0.3em", transition: "color 0.3s" }}>
          {String(project.id).padStart(2, "0")}
        </div>
        {/* Year */}
        <div className="absolute top-3 right-3 font-mono" style={{ fontSize: "clamp(7px,0.55vw,8px)", color: hovered ? "rgba(255,255,255,0.55)" : "rgba(26,18,8,0.35)", letterSpacing: "0.25em", transition: "color 0.3s" }}>
          {project.year}
        </div>
      </div>

      {/* Metadata row */}
      <div className="flex flex-col gap-3 flex-1 justify-between" style={{ padding: "16px clamp(12px,1.6vw,20px)", borderTop: "0.5px solid rgba(26,18,8,0.08)" }}>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-serif block text-base sm:text-[13px] md:text-sm" style={{ color: "#1a1208", letterSpacing: "-0.01em" }}>
            {project.title}
          </span>
          <span className="font-mono block sm:hidden uppercase mt-1" style={{ fontSize: "9px", color: "rgba(200,160,80,0.85)", letterSpacing: "0.15em" }}>
            {project.tags.join(" · ")}
          </span>
          <span className="font-mono block text-[10px] sm:text-[8px] mt-0.5" style={{ color: "rgba(26,18,8,0.5)", letterSpacing: "0.15em" }}>
            {project.location} · {project.area}
          </span>
        </div>
        <motion.div
          className="hidden sm:block self-end"
          animate={{ x: hovered ? 3 : 0, opacity: hovered ? 0.8 : 0.35 }}
          transition={{ duration: 0.3 }}
          style={{ color: "rgba(200,160,80,0.7)", flexShrink: 0 }}
        >
          <svg viewBox="0 0 14 10" fill="none" style={{ width: 12 }}>
            <line x1="0" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1" />
            <polyline points="7,1 12,5 7,9" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────
// ProjectModal  (identical to Category page)
// ─────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ background: "rgba(10,7,3,0.65)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", padding: "clamp(16px,4vw,48px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute top-5 left-1/2 -translate-x-1/2 font-mono uppercase pointer-events-none"
        style={{ fontSize: "clamp(6px,0.55vw,7px)", color: "rgba(240,232,212,0.35)", letterSpacing: "0.3em", whiteSpace: "nowrap" }}
      >
        Click outside or press Esc to close
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex overflow-hidden"
        style={{ width: "min(88vw, 900px)", maxHeight: "80vh", background: "#f5f2eb", borderRadius: 4, border: "0.5px solid rgba(26,18,8,0.12)", boxShadow: "0 40px 100px rgba(10,7,3,0.45)" }}
      >
        {/* Image */}
        <div className="relative shrink-0 overflow-hidden" style={{ width: "45%", minHeight: "clamp(260px,50vh,500px)" }}>
          <img src={project.image} alt={project.title} draggable={false} className="absolute inset-0 w-full h-full object-cover select-none" />
          <div className="absolute top-4 left-4 font-mono" style={{ fontSize: "clamp(7px,0.62vw,9px)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.3em" }}>
            {String(project.id).padStart(2, "0")}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between flex-1 overflow-y-auto" style={{ padding: "clamp(24px,4vh,40px) clamp(20px,3vw,36px)" }}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono uppercase" style={{ fontSize: "clamp(6px,0.55vw,7px)", color: "rgba(200,160,80,0.7)", background: "rgba(200,160,80,0.08)", border: "0.5px solid rgba(200,160,80,0.22)", borderRadius: 2, padding: "2px 8px", letterSpacing: "0.22em" }}>
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-serif leading-tight" style={{ fontSize: "clamp(20px,2.8vw,38px)", color: "#1a1208", letterSpacing: "-0.02em" }}>
              {project.title}
            </h2>
            <div style={{ height: "0.5px", width: "clamp(32px,5vw,64px)", background: "linear-gradient(90deg,#c8a052,#e8c070,transparent)" }} />
            <p style={{ fontSize: "clamp(10px,0.9vw,13px)", color: "rgba(26,18,8,0.62)", lineHeight: 1.8 }}>
              {project.description}
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4" style={{ marginTop: 4 }}>
              {[
                { label: "Year", value: project.year },
                { label: "Location", value: project.location },
                { label: "Area", value: project.area },
                { label: "Type", value: project.tags[0] },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="font-mono uppercase tracking-[0.3em]" style={{ fontSize: "clamp(6px,0.52vw,7px)", color: "rgba(200,160,80,0.5)" }}>{label}</span>
                  <span className="font-serif" style={{ fontSize: "clamp(11px,1vw,14px)", color: "#1a1208" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-5" style={{ borderTop: "0.5px solid rgba(26,18,8,0.08)" }}>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full font-mono uppercase tracking-[0.32em]"
              style={{ background: "transparent", border: "0.5px solid rgba(26,18,8,0.2)", borderRadius: 2, padding: "10px 20px", fontSize: "clamp(7px,0.62vw,9px)", color: "rgba(26,18,8,0.45)", cursor: "pointer", fontFamily: "inherit" }}
            >
              Close
            </motion.button>
          </div>
        </div>

        {/* X button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.15, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 z-10"
          style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(26,18,8,0.08)", border: "0.5px solid rgba(26,18,8,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontFamily: "inherit" }}
          aria-label="Close"
        >
          <svg viewBox="0 0 12 12" fill="none" style={{ width: 10 }}>
            <line x1="2" y1="2" x2="10" y2="10" stroke="rgba(26,18,8,0.55)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="10" y1="2" x2="2" y2="10" stroke="rgba(26,18,8,0.55)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) ?? "";

  const meta = SERVICE_META[slug];
  const projects = SERVICE_PROJECTS[slug] ?? [];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pageReady, setPageReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!meta) {
      router.replace("/");
    } else {
      const t = setTimeout(() => setPageReady(true), 60);
      return () => clearTimeout(t);
    }
  }, [meta, router]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!meta || !pageReady) {
    return <div style={{ background: "#f5f2eb", minHeight: "100vh" }} />;
  }

  return (
    <>
      <main style={{ background: "#f5f2eb", minHeight: "100vh" }}>

        {/* Sticky header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-50 flex items-center justify-between"
          style={{
            padding: "clamp(14px,2.2vh,22px) clamp(24px,5vw,72px)",
            borderBottom: "0.5px solid rgba(26,18,8,0.1)",
            background: "rgba(245,242,235,0.92)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <motion.button
            onClick={() => router.back()}
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 font-mono uppercase"
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "clamp(7px,0.62vw,9px)", color: "rgba(26,18,8,0.42)", letterSpacing: "0.32em", fontFamily: "inherit", padding: 0 }}
          >
            <svg viewBox="0 0 14 10" fill="none" style={{ width: 12 }}>
              <line x1="14" y1="5" x2="1" y2="5" stroke="currentColor" strokeWidth="1" />
              <polyline points="5,1 0,5 5,9" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
            </svg>
            Back
          </motion.button>

          <span className="font-serif" style={{ fontSize: "clamp(11px,1vw,15px)", color: "rgba(26,18,8,0.45)", letterSpacing: "0.08em" }}>
            DK Construction & Consultancy
          </span>

          <span className="font-mono uppercase" style={{ fontSize: "clamp(7px,0.62vw,9px)", color: "rgba(200,160,80,0.6)", letterSpacing: "0.38em" }}>
            {meta.label}
          </span>
        </motion.header>

        {/* Hero */}
        <section style={{ padding: "clamp(44px,8vh,88px) clamp(24px,5vw,72px) clamp(28px,5vh,56px)", borderBottom: "0.5px solid rgba(26,18,8,0.08)" }}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-2xl">
              <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="flex items-center gap-3">
                <span className="font-mono uppercase tracking-[0.4em]" style={{ fontSize: "clamp(7px,0.62vw,9px)", color: "rgba(200,160,80,0.6)" }}>Services</span>
                <div style={{ width: "clamp(20px,2.5vw,36px)", height: "0.5px", background: "rgba(200,160,80,0.3)" }} />
                <span className="font-mono uppercase tracking-[0.4em]" style={{ fontSize: "clamp(7px,0.62vw,9px)", color: "rgba(26,18,8,0.35)" }}>{meta.label}</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="font-serif leading-none tracking-tight" style={{ fontSize: "clamp(36px,7vw,96px)", color: "#1a1208" }}>
                {meta.label}
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.22 }} className="font-serif italic" style={{ fontSize: "clamp(13px,1.2vw,18px)", color: "rgba(26,18,8,0.42)", lineHeight: 1.55 }}>
                {meta.tagline}
              </motion.p>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ fontSize: "clamp(12px,1vw,15px)", color: "rgba(26,18,8,0.55)", lineHeight: 1.7, maxWidth: 540 }}>
                {meta.description}
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.3 }} className="flex items-center gap-6 shrink-0">
              <div className="flex flex-col gap-1">
                <span className="font-serif" style={{ fontSize: "clamp(28px,4vw,52px)", color: "#1a1208", lineHeight: 1 }}>{meta.stat}</span>
                <span className="font-mono uppercase tracking-[0.3em]" style={{ fontSize: "clamp(6px,0.55vw,8px)", color: "rgba(200,160,80,0.55)" }}>{meta.statLabel}</span>
              </div>
              <div style={{ width: "0.5px", height: 40, background: "rgba(26,18,8,0.1)" }} />
              <div className="flex flex-col gap-1">
                <span className="font-serif" style={{ fontSize: "clamp(28px,4vw,52px)", color: "#1a1208", lineHeight: 1 }}>{new Date().getFullYear() - 2018}+</span>
                <span className="font-mono uppercase tracking-[0.3em]" style={{ fontSize: "clamp(6px,0.55vw,8px)", color: "rgba(200,160,80,0.55)" }}>Years</span>
              </div>
            </motion.div>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.45 }} className="hidden sm:block font-mono uppercase mt-6" style={{ fontSize: "clamp(6px,0.55vw,7px)", color: "rgba(26,18,8,0.28)", letterSpacing: "0.35em" }}>
            Hover to reveal · Click to explore
          </motion.p>
        </section>

        {/* Project grid */}
        <section style={{ padding: "clamp(32px,5vh,56px) clamp(24px,5vw,72px) clamp(64px,12vh,120px)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(16px,1.6vw,22px)]">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => !isMobile && setSelectedProject(project)}
              />
            ))}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {!isMobile && selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
