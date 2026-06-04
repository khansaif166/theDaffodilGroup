import { AboutHeroSection } from "./sections/AboutHeroSection";
import { LeadershipTeaserSection } from "./sections/LeadershipTeaserSection";
import { MissionVisionSection } from "./sections/MissionVisionSection";
import { OurApproachSection } from "./sections/OurApproachSection";
import { OurJourneySection } from "./sections/OurJourneySection";
import { WhoWeAreSection } from "./sections/WhoWeAreSection";

export function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <MissionVisionSection />
      <WhoWeAreSection />
      <OurJourneySection />
      <OurApproachSection />
      <LeadershipTeaserSection />
    </>
  );
}
