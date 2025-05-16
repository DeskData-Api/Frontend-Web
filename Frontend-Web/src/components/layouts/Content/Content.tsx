import React from "react";
import WelcomeSection from "./WelcomeSection";
import ChartsSection from "./ChartsSection";

const Content: React.FC = () => {
  return (
    <main className="w-full min-h-screen ">
      <ChartsSection />
    </main>
  );
};

export default Content;
