import { FullHeightParallaxPanel } from "./FullHeightPanel";
import { MapPanel } from "./MapPanel";
import * as imgs from "./imgs";
import { useEffect, useState } from "react";
import "./App.css";
import panels from "./PhotoPanels";
import project_joy from "./audio/project_joy.mp3";

const TOTAL_NUMBER_OF_IMAGES = Object.keys(imgs).length;
console.log('app loaded');

function App() {
  const [loadedImgCnt, setLoadedImgCnt] = useState(0);
  useEffect(() => {
    const checkImagesLoaded = setInterval(() => {
      const loadedImages = [...document.getElementsByTagName("img")]
        .filter((img) => img.complete)
        .map((img) => img.src)
        .filter((src) => src.includes("static/media")).length;

      setLoadedImgCnt(loadedImages);
      if (loadedImages === TOTAL_NUMBER_OF_IMAGES) {
        console.log(
          `Finished loading ${loadedImages}/${TOTAL_NUMBER_OF_IMAGES} images`
        );
        document.body.style.overflow = "auto";
        clearInterval(checkImagesLoaded);
      } else {
        document.body.style.overflow = "hidden";
        console.log(`Loaded ${loadedImages}/${TOTAL_NUMBER_OF_IMAGES} images`);
      }
    }, 100);
  }, []);

  const percentage = Math.round((loadedImgCnt / TOTAL_NUMBER_OF_IMAGES) * 100);

  const shouldShowOverlay = loadedImgCnt < TOTAL_NUMBER_OF_IMAGES;
  const textShadow = "1px 1px 10px rgb(0,0,0)";

  return (
    <div>
      <div
        id="overlay"
        style={{
          visibility: shouldShowOverlay ? "visible" : "hidden",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div>헨리를 로딩중입니다</div>
          <div>잠시만 기다려주세요</div>
          <div
            style={{
              marginTop: 20,
              width: `${percentage}%`,
              height: 10,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          ></div>
          <div style={{ paddingTop: 10 }}>{percentage}%</div>
        </div>
      </div>
      <div
        style={{
          opacity: shouldShowOverlay ? "0" : "1",
          transition: "all 3s",
          visibility: shouldShowOverlay ? "hidden" : "visible",
        }}
      >
        <FullHeightParallaxPanel image={imgs.gif_main}>
          <div
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "row wrap",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "80%",
                color: "white",
                textShadow: "1px 1px 10px rgb(0,0,0)",
              }}
            >
              <h1>안녕하세요 헨리입니다</h1>
              <h2>제 첫번째 생일에 초대합니다</h2>
              <audio
                style={{ paddingTop: 20 }}
                src={project_joy}
                controls
                autoPlay
                loop
              />
            </div>
          </div>
        </FullHeightParallaxPanel>
      </div>
      {panels
        .sort((o1, o2) => o1.date - o2.date)
        .map((panel) => (
          <FullHeightParallaxPanel image={panel.image} key={panel.image}>
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: `center`,
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "rgb(0,0,0,0.3)",
                  borderRadius:
                    panel.horizontalAlign == null ||
                    panel.horizontalAlign === "start"
                      ? "0 0 5px 0"
                      : "0 0 0 5px",
                  lineHeight: "10px",
                }}
              >
                <h3>D+{daysBetweenBirthday(panel.date)}</h3>
              </div>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ color: 'white', textShadow }}>{panel.children}</div>
              </div>
            </div>
          </FullHeightParallaxPanel>
        ))}

      <FullHeightParallaxPanel image={imgs.hat}>
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "row wrap",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 style={{ color: "white", textShadow }}>
              꼭 오셔서 축하해주세요!
            </h1>
          </div>
        </div>
      </FullHeightParallaxPanel>

      <MapPanel />
      {Object.keys(imgs).map((key) => (
        <img key={key} src={imgs[key]} style={{ display: "none" }} alt={key} />
      ))}
    </div>
  );
}

const daysBetweenBirthday = (date) => {
  const timeDifferenceMs = date.getTime() - new Date("2022-10-11").getTime();
  return timeDifferenceMs / (1000 * 60 * 60 * 24);
};

export default App;
