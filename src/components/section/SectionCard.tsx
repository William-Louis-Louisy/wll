import { motion, useReducedMotion, Variants } from "framer-motion";

type SectionCardProps = {
  title: string;
  variants: Variants;
  children: React.ReactNode;
};

export default function SectionCard({
  title,
  variants,
  children,
}: SectionCardProps) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className="w-full rounded-2xl border border-foreground/5 px-5 py-4 3xl:p-8 bg-element/70"
      {...(!shouldReduce && {
        viewport: { amount: 0.3, once: true },
        variants,
        initial: "initial",
        whileInView: "inView",
      })}
    >
      <h3 className="font-semibold text-primary">{title}</h3>
      {children}
    </motion.div>
  );
}
