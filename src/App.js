import { FaFastBackward, FaFastForward, FaPlay } from "react-icons/fa";
import "./App.css";
import ZingTouch from "zingtouch";
import { useEffect, useRef, useState } from "react";
import { Games, Music, Settings, Coverflow, Artists, AllSongs, Albums } from "./components/index";
import { menuItems, musicItems } from "./utils";

function App() {
  // State hooks to manage active menu and submenu indexes and names
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState("Coverflow");
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  // Ref hook to create a new ZingTouch region and bind gestures to the body element
  const zt = useRef(new ZingTouch.Region(document.body)).current;
  // Effect hook to bind a tap gesture to the body element that updates the active index
  useEffect(() => {
    const gesture = new ZingTouch.Tap({ numInputs: 1 });
    zt.bind(document.body, gesture, () => setActiveIndex((activeIndex + 1) % menuItems.length));
  }, [activeIndex, zt]);
  // Effect hook to bind a tap gesture to the body element that updates the active submenu index
  useEffect(() => {
    const gesture = new ZingTouch.Tap({ numInputs: 1 });
    zt.bind(document.body, gesture, () => setActiveSubIndex((activeSubIndex + 1) % musicItems.length));
  }, [activeSubIndex, zt]);
  // Object to store the components associated with each menu item
  const Elements = { Music: <Music />, Games: <Games />, Settings: <Settings />, Coverflow: <Coverflow /> };
  // Object to store the components associated with each music submenu item
  const subElements = { "All Songs": <AllSongs />, Artists: <Artists />, Albums: <Albums /> };
  // Function to render the submenu or the main menu element based on the active menu and submenu
  const renderSubMenu = () => (activeMenu === "Music") ? subElements[activeSubMenu] : Elements[activeMenu]

  // Function to handle menu clicks and update the active menu and submenu state
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
  // Function to handle play button clicks and update the active menu and submenu state
  const handlePlayClick = () => {
    if (activeMenu === "Music") {
      setActiveSubIndex(0);
      setActiveSubMenu(musicItems[activeSubIndex])
    } else {
      setActiveIndex(0);
      setActiveMenu(menuItems[activeIndex])
    }
  }
  // The main component render function
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
