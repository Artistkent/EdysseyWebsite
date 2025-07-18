'use client'
import Script from 'next/script'

import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Perks from './components/Perks';
import SneakPeek from './components/SneakPeek';
import WhyItMatters from './components/WhyItMatters';
import FAQ from './components/FAQ';
import WaitlistCTA from './components/WaitlistCTA';
import Footer from './components/Footer';

import { motion } from "motion/react"
import ParticlesBackground from './utilityComps/ParticlesBackground';
// import WaitlistForm from './components/WaitListForm';

export default function Home() {
  return (
<div className="relative w-full min-h-screen">
<Script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" />
<Script src="http://threejs.org/examples/js/libs/stats.min.js" />

<ParticlesBackground />
    <Navbar />
    <main>
      <motion.div initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>
      <Hero />
      </motion.div>

      {/* <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>
      <Benefits />
       </motion.div> */}

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>
      <HowItWorks />
       </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>
      <Perks />
       </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>     
      <SneakPeek />
       </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>
      <WhyItMatters />
       </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>     
      <FAQ />
       </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>      
     <WaitlistCTA />
     </motion.div>

      <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
  viewport={{ once: true }}
>
      <Footer />
       </motion.div>

    </main>
    </div>
  );
}
