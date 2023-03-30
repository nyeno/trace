import React from "react";
import { useTheme } from "../context/ThemeContext";


const Modal = ({ job, closeModal, props }) => {
  const {modalOpen} = useTheme()
  return (
    <div className="flex justify-center h-full bg-pink-100">
      <div
        className={`${
          modalOpen ? "left-56 screen" : "left-16 mscreen"
        } absolute bg-bluishWhite top-16 z-10 opacity-50 hscreen`}
        onClick={closeModal}
      />
      <div className="absolute bg-white mx-4 p-4 lg:w-4/6 top-16 mt-8 h-max rounded-2xl z-20">
        <div className="mb-7 rounded-md lg:shadow flex lg:flex-row flex-col items-center justify-between">
          <div className="flex items-center">
            <p className="hidden lg:block mb-8 lg:mb-0 text-4xl font-bolder bg-cornflower text-white px-12 py-10 rounded-l-md ">
              {job.companyName.split("")[0]}
            </p>
            <h1 className="text-2xl font-bold  ml-4">{job.companyName}</h1>
          </div>
          <a
            href={job.companyWebsite}
            className="lg:mr-4 mt-4 lg:mt-0 text-cornflower font-bold p-4 rounded bg-bluishWhite"
          >
            Company Site
          </a>
        </div>
        <div>
          <h2 className="text-xl font-bold">{job.jobRole}</h2>
          <p className="text-sm font-light text-blackishGray">
            <span className="mr-6">{job.location}</span>
            {job.salary}
          </p>
          <p className="my-6">{job.companyDescription}</p>
          <h3 className="mb-2 font-bold text-lg">Job Description</h3>
          <p className="">{job.jobDescription}</p>
          <p className="my-4 font-bold text-md">Contact: {job.recruiterMail}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
