import React from "react";


const Modal = ({job, closeModal, props}) => {
  return (
    <div className="flex justify-center h-full bg-pink-100">
      <div
        className="absolute bg-bluishWhite top-16 left-56 z-10 opacity-50 screen hscreen"
        onClick={closeModal}
      />
      <div className="absolute bg-white m-auto p-4 lg:w-4/6 top-16 mt-4 h-max rounded-2xl z-20">
        <div className="mb-7 rounded-md shadow flex lg:flex-row flex-col items-center justify-between">
          <div className="flex items-center">
            <p className="hidden md:block mb-8 md:mb-0 text-4xl font-bolder bg-cornflower text-white px-12 py-10 rounded-l-md ">
              {job.companyName.split("")[0]}
            </p>
            <h1 className="text-2xl font-bold  ml-4">{job.companyName}</h1>
          </div>
          <a
            href={job.companyWebsite}
            className="mr-4 text-cornflower font-bold p-4 rounded bg-bluishWhite"
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
