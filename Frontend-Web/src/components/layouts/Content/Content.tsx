import React from "react";
import WelcomeSection from "./WelcomeSection";
import ChartsSection from "./ChartsSection";

const Content: React.FC = () => {
  return (
    <main className="w-full h-screen overflow-y-scroll snap-y snap-mandatory pb-20">
      <WelcomeSection />
      <ChartsSection />
    </main>
  );
};

export default Content;
