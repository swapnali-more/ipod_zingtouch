import { FaFastBackward, FaFastForward, FaPlay } from "react-icons/fa";
import "./App.css";
import ZingTouch from "zingtouch";
import { useEffect, useRef, useState } from "react";
import { Games, Music, Settings, Coverflow, Artists, AllSongs, Albums } from "./components/index";
import { menuItems, musicItems } from "./utils";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState("Coverflow");
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const zt = useRef(new ZingTouch.Region(document.body)).current;

  useEffect(() => {
    const gesture = new ZingTouch.Tap({ numInputs: 1 });
    zt.bind(document.body, gesture, () => setActiveIndex((activeIndex + 1) % menuItems.length));
  }, [activeIndex, zt]);

  useEffect(() => {
    const gesture = new ZingTouch.Tap({ numInputs: 1 });
    zt.bind(document.body, gesture, () => setActiveSubIndex((activeSubIndex + 1) % musicItems.length));
  }, [activeSubIndex, zt]);

  const Elements = { Music: <Music />, Games: <Games />, Settings: <Settings />, Coverflow: <Coverflow /> };
  const subElements = { "All Songs": <AllSongs />, Artists: <Artists />, Albums: <Albums /> };

  const renderSubMenu = () => (activeMenu === "Music") ? subElements[activeSubMenu] : Elements[activeMenu]

  const handleMenuClick = (menu) => {
    if (menu === "Music" && (activeSubMenu === "All Songs" || activeSubMenu === "Artists" || activeSubMenu === "Albums")) {
      setActiveSubMenu("");
      setActiveSubIndex(0);
    } else if (menu === "Music" && (activeSubMenu !== "All Songs" || activeSubMenu !== "Artists" || activeSubMenu !== "Albums")) {
      setActiveMenu("Coverflow");
      setActiveIndex(0);
    } else {
      setActiveMenu("Coverflow");
      setActiveIndex(0);
    }
  };

  const handlePlayClick = () => {
    if (activeMenu === "Music") {
      setActiveSubIndex(0);
      setActiveSubMenu(musicItems[activeSubIndex])
    } else {
      setActiveIndex(0);
      setActiveMenu(menuItems[activeIndex])
    }
  }

  return (
    <div className="App">
      <div className="ipod">
        <div className="screen">
          {activeMenu === "Coverflow" && (
            <div className="ipod-menu">
              <h3>Ipod</h3>
              <ul>{menuItems.map((item, index) => <li key={index} className={activeIndex === index ? "active" : ""}>{item}</li>)}</ul>
            </div>
          )}
          {activeMenu === "Music" && activeSubMenu === "" && (
            <>
              <div className="ipod-menu">
                <h3>Music</h3>
                <ul>{musicItems.map((item, index) => <li key={index} className={activeSubIndex === index ? "active" : ""}>{item}</li>)}</ul>
              </div>
              <Music />
            </>
          )}
          {renderSubMenu()}
        </div>
        <div className="wheel">
          <div className="navigate">
            <div className="menu-btn" onClick={() => handleMenuClick(activeMenu === "Music" ? "Music" : "Coverflow")}>MENU</div>
            <div className="forward"><FaFastForward /></div>
            <div className="backward"><FaFastBackward /></div>
            <div className="play-pause"><FaPlay /></div>
            <div className="play" onClick={handlePlayClick}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
