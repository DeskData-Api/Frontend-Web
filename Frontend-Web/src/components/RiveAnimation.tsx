import { useRive } from "@rive-app/react-canvas";

interface RiveProps {
  animationFile: string;
  stateMachine: string;
}

const RiveAnimation = ({ animationFile, stateMachine }: RiveProps) => {
  const { RiveComponent } = useRive({
    src: animationFile,
    stateMachines: stateMachine,
    autoplay: true,
  });

  return <RiveComponent className="w-80 h-80" />;
};

export default RiveAnimation;
