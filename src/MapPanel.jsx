import { FullHeightPanel } from "./FullHeightPanel";
import { useEffect, useRef } from "react";

export const MapPanel = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const naver = window.naver;
    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.467778, 126.824074), //지도의 초기 중심 좌표
      zoom: 15, //지도의 초기 줌 레벨
      minZoom: 8, //지도의 최소 줌 레벨
      scrollWheel: false,
      zoomControl: true, //줌 컨트롤의 표시 여부
      zoomControlOptions: {
        //줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.467778, 126.824074),
      map,
    });

    const contentString = [
      '<div class="iw_inner" style="padding:5px; margin: 5px; text-align: center; ">',
      '   <p style="foint-size: 2rem; margin: 0;">시그니처파티플레이스</p>',
      '   <p style="font-size: 0.8rem; margin: 0;">경기 부천시 양지로 205</p>',
      "</div>",
    ].join("");

    const infowindow = new naver.maps.InfoWindow({
      content: contentString,
      maxWidth: 200,
      height: 50,
      disableAnchor: true,
      textAlign: "center",
      margin: "auto",

      pixelOffset: new naver.maps.Point(0, -5),
    });

    naver.maps.Event.addListener(marker, "click", function (e) {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });

    infowindow.open(map, marker);
  }, []);

  return (
    <FullHeightPanel backgroundColor="rgb(20, 16, 54)">
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <h2 style={{ color: "#ffffff" }}>10월 16일 오후 1시</h2>
        <h2 style={{ color: "#ffffff" }}>시그니처파티플레이스 부천점</h2>
        <h4
          style={{
            color: "#ffffff",
            display: "flex",
            justifyContent: "center",
            gap: 5,
            paddingBottom: 15,
          }}
        >
          <a target="_blank" rel="noreferrer" href="https://naver.me/xgax5pOQ">
            네이버지도
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://place.map.kakao.com/325727711"
          >
            카카오맵
          </a>
          <a href="tel:0507-1389-6763">전화번호</a>
        </h4>
        <div
          ref={mapRef}
          style={{
            borderRadius: 12,
            width: "80%",
            height: 250,
            margin: "auto",
          }}
        ></div>
      </div>
    </FullHeightPanel>
  );
};
