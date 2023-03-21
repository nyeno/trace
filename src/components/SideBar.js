import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import eyeOpen from '../assets/illustrations/modalOpen.svg'
import modalClosed from "../assets/illustrations/modalClosed.svg";
import allJobs from "../assets/illustrations/alljobs.svg";
import postJob from "../assets/illustrations/postjob.svg";
import myJobs from "../assets/illustrations/myjobs.svg";
import { useTheme } from '../context/ThemeContext';


export default function SideBar() {
 const {modalOpen, openModal, closeModal} = useTheme()
    const { user } = useUserAuth();
      const [activeLink, setActiveLink] = useState("");
      const handleLinkClick = (link) => {
        setActiveLink(link);
  };
  
  return (
    <div>
      {" "}
      {user && (
        <>
          <nav className={ `flex flex-col ${modalOpen ? "w-56" : "w-16"} top-16 left-0 fixed side shadow space-y-6 pt-6 pr-4`} >
            {modalOpen && (
              <button
                onClick={() => closeModal()}
                className={ `flex ${modalOpen ? "justify-end" : "justify-center"}`}
              >
                <img src={eyeOpen} className="w-6 h-6" />
              </button>
            )}
            {!modalOpen && (
              <button onClick={() => openModal()} className={ `flex ${modalOpen ? "justify-end" : "justify-center"}`}>
                <img src={modalClosed} className="w-6 h-6" />
              </button>
            )}
            <Link
              to="/home"
              className={`pl-4 parent flex items-center  hover:bg-icyBlue hover:text-white rounded-r-full py-2 ${
                activeLink === "/home" || window.location.pathname === "/home"
                  ? "bg-cornflower text-white font-bold"
                  : ""
              }`}
              onClick={() => handleLinkClick("/home")}
            >
              <span className="mr-2">
                <img
                  src={allJobs}
                  className={`w-5 h-5 hover:invert hover:brightness-0 ${
                    activeLink === "/home" ||
                    window.location.pathname === "/home"
                      ? "brightness-0 invert"
                      : " "
                  }`}
                  alt="All Jobs icon"
                />{" "}
              </span>
              {modalOpen && "All Jobs"}
            </Link>
            <Link
              to="/myJobs"
              className={`pl-4 parent flex items-center  hover:bg-icyBlue hover:text-white rounded-r-full py-2 ${
                activeLink === "/myJobs" ||
                window.location.pathname === "/myJobs"
                  ? "bg-cornflower text-white font-bold"
                  : ""
              }`}
              onClick={() => handleLinkClick("/myJobs")}
            >
              <span className="mr-2">
                <img
                  src={myJobs}
                  className={`w-5 h-5 hover:invert hover:brightness-0 ${
                    activeLink === "/myJobs" ||
                    window.location.pathname === "/myJobs"
                      ? "brightness-0 invert"
                      : " "
                  }`}
                  alt="My Jobs icon"
                />{" "}
              </span>
              {modalOpen && "My Jobs"}
            </Link>
            <Link
              to="/postJob"
              className={`pl-4 parent flex items-center  hover:bg-icyBlue hover:text-white rounded-r-full py-2 ${
                activeLink === "/postJob" ||
                window.location.pathname === "/postJob"
                  ? "bg-cornflower text-white font-bold"
                  : ""
              }`}
              onClick={() => handleLinkClick("/postJob")}
            >
              <span className="mr-2">
                <img
                  src={postJob}
                  className={`w-5 h-5 hover:invert hover:brightness-0 ${
                    activeLink === "/postJob" ||
                    window.location.pathname === "/postJob"
                      ? "brightness-0 invert"
                      : " "
                  }`}
                  alt="Post Job icon"
                />{" "}
              </span>
              {modalOpen && "Post Job"}
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}
