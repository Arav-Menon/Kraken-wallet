import CtaSection from "./src/cta-section";
import FeaturesSection from "./src/features-section";
import Footer from "./src/footer";
import Header from "./src/header";
import HeroSection from "./src/hero-section";
import SecuritySection from "./src/security-section";

export default function Landing() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-background font-sans">
                <Header />
                <main className="flex-grow">
                    <HeroSection />
                    <FeaturesSection />
                    <SecuritySection />
                    <CtaSection />
                </main>
                <Footer />
            </div>
        </>
    )
}