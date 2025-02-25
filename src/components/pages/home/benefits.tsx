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
    <section className="relative w-full rounded-br-2xl bg-gradient-to-br from-background via-muted/10 to-muted/40 shadow-lg shadow-primary/5">
      {/* <div className="absolute top-1/2 z-0 w-full -translate-y-1/2">
        <Particles />
      </div> */}
      <div className="relative z-10 mx-auto max-w-screen-lg py-8">
        <h2 className="select-none px-2 py-4 text-center font-sans">
          Our Commitment to the{" "}
          <span className="text-zinc-800 dark:text-zinc-200">Team</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          {benefits.map((benefit, i) => (
            <BenefitCard key={`${i}-${benefit.title}`} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface BenefitCardProps {
  icon: JSX.Element | React.ReactNode;
  iconClassName?: string;
  titleClassName?: string;
  title: string;
  description?: string;
}
const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  iconClassName,
  titleClassName,
  title,
  description,
}) => {
  return (
    <div
      className={cn(
        "box-border rounded-lg border-2 border-transparent bg-background p-6 shadow-lg dark:border-muted",
        description ? "h-60" : "h-32",
      )}
    >
      <div
        className={cn(
          "box-border flex h-16 w-16 items-center justify-center rounded-t border border-white/50 bg-gradient-to-bl pb-3 dark:border-black/50",
          iconClassName,
        )}
      >
        {icon}
      </div>
      <div className="relative -top-5 flex flex-col gap-4 bg-background/50 p-1 backdrop-blur">
        <h3
          className={cn("font-mono text-sm dark:text-primary", titleClassName)}
        >
          {title}
        </h3>
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
    titleClassName: "text-orange-950 dark:text-orange-50",
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
    titleClassName: "text-red-950 dark:text-red-50",
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
    titleClassName: "text-purple-950 dark:text-purple-50",
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
    titleClassName: "text-green-950 dark:text-green-50",
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
    titleClassName: "text-yellow-950 dark:text-yellow-50",
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
    titleClassName: "text-blue-950 dark:text-blue-50",
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
    titleClassName: "text-stone-950 dark:text-stone-50",
    title: "Relocation Support",
    description: "Moving? We've got you covered. We'll help you get settled and ready to go in our Virginia office.",
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
    titleClassName: "text-slate-950 dark:text-slate-50",
    title: "401K + Match",
    description:
      "We help you save for the future. We offer a 401K plan with a company match.",
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
    titleClassName: "text-zinc-950 dark:text-zinc-50",
    title: "Workspace Stipend",
    description: "New desk? Extra monitors? A new Macbook Pro with an M4 Pro chip? Enough said."
  },
];

export default Benefits;
