import { FullHeightParallaxPanel } from "./FullHeightPanel";
import { MapPanel } from "./MapPanel";
import * as imgs from "./imgs";
import { useEffect, useState } from "react";
import "./App.css";
import panels from "./PhotoPanels";
import project_joy from "./audio/project_joy.mp3";

const TOTAL_NUMBER_OF_IMAGES = Object.keys(imgs).length;
console.log("app loaded");

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
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1000, minWidth: 500 }}>
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
                <h1>10월 7일 12시</h1>
                <h1>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://naver.me/xgax5pOQ"
                    style={{ textDecoration: "none" }}
                  >
                    시그니처파티플레이스 부천점
                  </a>
                </h1>
                <h1>강헨리의 첫번째 생일에 초대합니다</h1>
                <h4>
                  아래 플레이 버튼(▶️)을 누르시고 화면을 밑으로 스크롤해보세요
                </h4>
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
          .sort((o1, o2) => o1.date - o2.date || o1.image - o2.image)
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
                    backgroundColor: "rgb(0,0,0,0.4)",
                    borderRadius:
                      panel.horizontalAlign == null ||
                      panel.horizontalAlign === "start"
                        ? "0 0 5px 0"
                        : "0 0 0 5px",
                    lineHeight: "10px",
                  }}
                >
                  <h3>
                    {panel.description != null
                      ? panel.description
                      : `D+${daysBetweenBirthday(panel.date)}`}
                  </h3>
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "white", textShadow }}>
                    {panel.children}
                  </div>
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
            <div style={{ textAlign: "center", color: "white", textShadow }}>
              <h3>
                <div>관심어린 애정으로 지켜보며 아껴주시는 분들을 </div>
                <div>모시고 작은 잔치를 하려 합니다</div>
                <div><br/></div>
                <div>돌잔치에 오셔서 즐거운 시간 함께 하시고</div>
                <div>많은 격려와 사랑 전해주세요</div>
              </h3>
              <h2>꼭 오셔서 축하해 주세요!</h2>
            </div>
          </div>
        </FullHeightParallaxPanel>

        <MapPanel />
        {Object.keys(imgs).map((key) => (
          <img
            key={key}
            src={imgs[key]}
            style={{ display: "none" }}
            alt={key}
          />
        ))}
      </div>
    </div>
  );
}

const daysBetweenBirthday = (date) => {
  const timeDifferenceMs = date.getTime() - new Date("2022-10-11").getTime();
  return timeDifferenceMs / (1000 * 60 * 60 * 24);
};

export default App;
