"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SwarmController3D, {
  useSwarmState3D,
} from "@/components/v2/swarm/SwarmController3D";
import PointField3D from "@/components/v2/swarm/PointField3D";
import OpeningScene from "@/components/v2/scenes/OpeningScene";
import DiscoverScene from "@/components/v2/scenes/DiscoverScene";
import FocusScene from "@/components/v2/scenes/FocusScene";
import BlueprintScene from "@/components/v2/scenes/BlueprintScene";
import PhasesScene from "@/components/v2/scenes/PhasesScene";
import IntelligenceScene from "@/components/v2/scenes/IntelligenceScene";
import PathScene from "@/components/v2/scenes/PathScene";
import ClosingScene from "@/components/v2/scenes/ClosingScene";

function HomeV2Content() {
  const { stateIndex } = useSwarmState3D();

  return (
    <>
      <Header />
      <main id="main-content" className="relative flex-1">
        <div className="fixed inset-0 z-0">
          <PointField3D stateIndex={stateIndex} />
        </div>
        <div className="relative z-10">
          <OpeningScene />
          <DiscoverScene />
          <FocusScene />
          <BlueprintScene />
          <PhasesScene />
          <IntelligenceScene />
          <PathScene />
          <ClosingScene />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function HomeV2Page() {
  return (
    <SwarmController3D>
      <HomeV2Content />
    </SwarmController3D>
  );
}
