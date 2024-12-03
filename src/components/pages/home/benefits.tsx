import {
  Dumbbell,
  GraduationCap,
  HandCoins,
  HeartPulse,
  MapPinHouse,
  MessageCircleHeart,
  MonitorCog,
  ScrollText,
  TentTree,
} from "lucide-react";

import Particles from "~/components/ui/particles";
import { cn } from "~/lib/utils";

const Benefits: React.FC = () => {
  return (
    <section className="relative w-full bg-muted/10">
      <div className="absolute top-1/2 z-0 w-full -translate-y-1/2">
        <Particles />
      </div>
      <div className="relative z-10 mx-auto max-w-screen-lg py-8">
        <h2 className="select-none px-2 py-4 text-center font-sans">
          Our Commitment to the <span className="text-blue-500">Team</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <BenefitCard key={i} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface BenefitCardProps {
  icon: JSX.Element | React.ReactNode;
  iconClassName?: string;
  title: string;
  description?: string;
}
const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  iconClassName,
  title,
  description,
}) => {
  return (
    <div
      className={cn(
        "box-border rounded-lg bg-background p-6 shadow-lg dark:border-2 dark:border-muted",
        description ? "h-80 md:h-60" : "h-44 md:h-32",
      )}
    >
      <div
        className={cn(
          "box-border flex h-16 w-16 items-center justify-center rounded-t border-2 border-white/50 bg-gradient-to-bl pb-3 dark:border-black/50",
          iconClassName,
        )}
      >
        {icon}
      </div>
      <div className="relative -top-5 flex flex-col gap-4 bg-background/50 p-1 backdrop-blur">
        <h3 className="font-mono text-sm">{title}</h3>
        <p className="font-sans text-sm">{description}</p>
      </div>
    </div>
  );
};

const benefits: BenefitCardProps[] = [
  {
    icon: (
      <GraduationCap
        className="text-orange-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName:
      "from-orange-500 to-orange-300 dark:from-orange-700 dark:to-orange-500",
    title: "Learn and Grow",
    description:
      "We invest in your growth. Books, courses, conferences, and most importantly, the bleeding edge of technology.",
  },
  {
    icon: (
      <HeartPulse
        className="text-red-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName: "from-red-500 to-red-300 dark:from-red-700 dark:to-red-500",
    title: "Benefits",
    description:
      "The works. Flexible health, dental, & vision insurance for you and your family.",
  },
  {
    icon: (
      <Dumbbell
        className="text-purple-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName:
      "from-purple-500 to-purple-300 dark:from-purple-700 dark:to-purple-500",
    title: "Wellness",
    description:
      "Enjoy stipends for gym memberships, massages, and more for your well-being.",
  },
  {
    icon: (
      <TentTree
        className="text-green-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName:
      "from-green-500 to-green-300 dark:from-green-700 dark:to-green-500",
    title: "Balance",
    description:
      "Take time off when you need it. No questions asked. We recommend at least 3 weeks per year.",
  },
  {
    icon: (
      <ScrollText
        className="text-yellow-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName:
      "from-yellow-500 to-yellow-300 dark:from-yellow-700 dark:to-yellow-500",
    title: "Ownership",
    description:
      "Our team is our company. Every team member gets a stake in our success. Ask us about our equity program.",
  },
  {
    icon: (
      <MessageCircleHeart
        className="text-blue-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName:
      "from-blue-500 to-blue-300 dark:from-blue-700 dark:to-blue-500",
    title: "Values Driven",
    description:
      "We are a mission-driven company. We don't cut corners, and we care about our impact.",
  },
  {
    icon: (
      <MapPinHouse
        className="text-stone-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName:
      "from-stone-500 to-stone-300 dark:from-stone-700 dark:to-stone-500",
    title: "Relocation Support",
  },
  {
    icon: (
      <HandCoins
        className="text-slate-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName:
      "from-slate-500 to-slate-300 dark:from-slate-700 dark:to-slate-500",
    title: "401K + Match",
  },
  {
    icon: (
      <MonitorCog
        className="text-zinc-50"
        size={32}
        opacity={0.4}
        strokeWidth={1.5}
      />
    ),
    iconClassName:
      "from-zinc-500 to-zinc-300 dark:from-zinc-700 dark:to-zinc-500",
    title: "Workspace Stipend",
  },
];

export default Benefits;
