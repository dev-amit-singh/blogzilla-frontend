import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./carousel.module.css";

type CarouselArrowProps = {
  direction: "left" | "right";
};

export default function CarouselArrow({ direction }: CarouselArrowProps) {
  return (
    <div
      className={`${styles.arrowWrapper} ${
        direction === "left" ? styles.left : ""
      }`}
    >
      <span className={styles.iconSlide}>
        {direction === "left" ? (
          <ChevronLeft size={26} />
        ) : (
          <ChevronRight size={26} />
        )}
      </span>

      <span className={`${styles.iconSlide} ${styles.delay1}`}>
        {direction === "left" ? (
          <ChevronLeft size={26} />
        ) : (
          <ChevronRight size={26} />
        )}
      </span>

      <span className={`${styles.iconSlide} ${styles.delay2}`}>
        {direction === "left" ? (
          <ChevronLeft size={26} />
        ) : (
          <ChevronRight size={26} />
        )}
      </span>
    </div>
  );
}
