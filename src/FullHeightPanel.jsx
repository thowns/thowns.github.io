import { ParallaxBanner } from "react-scroll-parallax";

export const FullHeightPanel = ({
  children,
  backgroundColor,
  backgroundImage,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        backgroundImage,
        backgroundSize: "cover",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export const FullHeightParallaxPanel = ({ children, image }) => {
  return (
    <ParallaxBanner
      layers={[{ image, speed: -15 }]}
      style={{ height: "100vh" }}
    >
      {children}
    </ParallaxBanner>
  );
};
