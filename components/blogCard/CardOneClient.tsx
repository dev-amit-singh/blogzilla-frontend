"use client";

import { motion } from "framer-motion";
import { useScrollDirection } from "../scrollAnimation/useScrollDirection";
import { getFadeVariant } from "../scrollAnimation/directionalVariants";
import CardOne from "./CardOne";

export default function CardOneClient() {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);

  return (
    <motion.div
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <CardOne
        image="/blogImg/blog-2.jpg"
        categories={[
          { label: "Travel" },
          { label: "Food" },
        ]}
        title="Want fluffy Japanese pancakes but can’t fly to Tokyo?"
        date="27 August"
        readTime="12 mins read"
        views="23K views"
        onCameraClick={() => alert("Camera clicked")}
      />
    </motion.div>
  );
}
