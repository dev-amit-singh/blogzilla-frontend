'use client'

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useScrollDirection } from '../scrollAnimation/useScrollDirection';
import { getFadeVariant } from '../scrollAnimation/directionalVariants';
import 'swiper/css';
import CarouselCard from './CarouselCard';

const Carousel = () => {
  const scrollDirection = useScrollDirection();
  const fadeVariant = getFadeVariant(scrollDirection);
  return (
    <motion.div className="relative"
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}>
      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        className="mySwiper"
      >
        {[1, 2, 3, 4].map((_, i) => (
          <SwiperSlide key={i}>
            <CarouselCard
              image="/blogImg/blog-1.jpg"
              category="Travel"
              title="Give Your Space a Parisian - Inspired Makeover"
              date="27 August"
              views="23k"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Bottom Right Corner Arrows (CONNECTED TO SWIPER) */}
      <div className="absolute bottom-6 right-8 z-30 flex gap-2">
        <button className="custom-prev rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/30">
          <ChevronLeft size={20} />
        </button>

        <button className="custom-next rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/30">
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div >
  );
};

export default Carousel;
