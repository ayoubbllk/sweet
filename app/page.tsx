"use client"

import { HeroSection } from "@/components/hero-section"
import { InnovationSection } from "@/components/innovation-section"
import { ProductsSection } from "@/components/products-section"
import { EcommerceSection } from "@/components/ecommerce-section"
import { RecipesSection } from "@/components/recipes-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BioBot } from "@/components/bio-bot"
import { CartProvider } from "@/components/cart-context"
import { InteractiveParticles } from "@/components/interactive-particles"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingElements } from "@/components/floating-elements"
import { SoundProvider, SoundToggle } from "@/components/sound-effects"
import { LoadingScreen } from "@/components/loading-screen"
import { TouchRipple, PullToRefreshIndicator } from "@/components/mobile-touch-effects"
import { MobileBottomNav, MobilePageIndicator } from "@/components/mobile-navigation"
import { SteviaJourneySection } from "@/components/stevia-journey-section" // Import the new journey section

export default function Home() {
  // Updated sections list to include the new journey section
  const sections = ["hero", "innovation", "produits", "boutique", "recettes", "stevia-journey", "contact"] 

  return (
    <SoundProvider>
      <CartProvider>
        {/* Loading screen animation */}
        <LoadingScreen />

        {/* Custom cursor - desktop only */}
        

        <TouchRipple />
        <PullToRefreshIndicator />

        {/* Interactive particle system - works on both */}
        <InteractiveParticles />

        {/* Floating background elements */}
        <FloatingElements />

        {/* Scroll progress indicator */}
        <ScrollProgress />

        <MobilePageIndicator sections={sections} />

        {/* Sound toggle button */}
        <SoundToggle />

        <main className="relative min-h-screen bg-[#ffffff] overflow-hidden pb-20 md:pb-0">
          <Navigation />
          <HeroSection />
          <InnovationSection />
          <ProductsSection />
          <EcommerceSection />
          <RecipesSection />
          
          {/* The new immersive narrative section */}
          <SteviaJourneySection /> 
          
          <ContactSection />
          <Footer />
          <BioBot />

          <MobileBottomNav />
        </main>
      </CartProvider>
    </SoundProvider>
  )
}