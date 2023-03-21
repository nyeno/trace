import { createContext, useContext, useState, useEffect } from "react";


const themeContext = createContext();

export function ThemeContextProvider({ children }) {

const [modalOpen, setModalOpen] = useState(false)

function useViewport() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width, height };
}

    const { width } = useViewport()
    const breakpoint = 640;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(width < breakpoint);
        setModalOpen(!(width < breakpoint))
      }, [width]);

const openModal = () => {
    setModalOpen(true)
    console.log("modal is open")
}

const closeModal = () => {
    setModalOpen(false);
    console.log("modal is closed")
};

  return (
    <themeContext.Provider value={{modalOpen, openModal, closeModal, isMobile }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  return useContext(themeContext);
}
