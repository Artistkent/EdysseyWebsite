// app/components/SneakPeek.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const previews = [
  {
    label: "Tutor Chat Interface",
    alt: "Mockup of AI tutor chat",
    placeholder: "[Chat UI]",
  },
  {
    label: "Learning Quest Example",
    alt: "Quest mission screen",
    placeholder: "[Quest Screen]",
  },
  {
    label: "RPG Profile with Badges",
    alt: "Gamified student profile",
    placeholder: "[RPG Profile]",
  },
  {
    label: "School Dashboard View",
    alt: "Institution dashboard mockup",
    placeholder: "[Dashboard]",
  },
];

export default function SneakPeek() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
          What You’ll Experience (Soon)
        </h2>

        <Swiper spaceBetween={20} slidesPerView={1.1} breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 4 },
        }}>
          {previews.map((item, index) => (
            <SwiperSlide key={index}>
            <div
              key={index}
              className=" bg-gray-100 p-4 rounded-xl text-center"
            >
              <div className="w-full h-40 bg-gray-300 text-gray-600 flex items-center justify-center rounded-lg text-sm italic">
                {item.placeholder}
              </div>
              <p className="mt-4 text-sm font-medium text-gray-800">{item.label}</p>
            </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
