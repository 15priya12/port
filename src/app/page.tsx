import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Games from '@/components/Games';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Games />
      <Contact />
    </main>
  );
}
