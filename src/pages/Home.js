
import { useJobs } from "../context/JobsContext";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useUserAuth } from "../context/UserAuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.utils";
import Modal from "../components/Modal";

const Home = () => {
 const { user } = useUserAuth();
  const { hackerNews, markAsApplied, allAppliedJobs } = useJobs()
  const [modalOpen, setModalOpen] = useState(false);

  const [activeJob, setActiveJob] = useState({})

  function onOpenModal(job) {
  setModalOpen(true);
  setActiveJob(job)
}
  function closeModal() {
  setModalOpen(false)
}
  return (
    <>
      <div className="relative grid lg:grid-cols-3 grid-cols-1 gap-4 m-8">
        {hackerNews.map((job) => {
          return (
            <div
              key={job.id}
              className="flex flex-col space-y-2 shadow px-4 pt-5 pb-3 rounded-md"
            >
              <p className="text-lg font-bold">{job.jobRole}</p>
              <p className="">{job.companyName}</p>
              <a href={job.companyWebsite} className="underline text-pinkish">
                {job.companyWebsite}
              </a>
              <p className="font-light text-sm ">{job.location}</p>
              <button
                className="text-sm text-blackishGray font-light text-left"
                onClick={() => onOpenModal(job)}
              >
                More details ...
              </button>
              {!allAppliedJobs.includes(job.id) ? (
                <button
                  onClick={() => {
                    markAsApplied(job);
                  }}
                  className="bg-cornflower text-white p-2 rounded-lg"
                >
                  Mark as applied
                </button>
              ) : (
                <p className="bg-icyBlue text-white p-2 rounded-lg text-center">
                  Application Sent
                </p>
              )}
            </div>
          );
        })}
      </div>
      {modalOpen && <Modal job={activeJob} closeModal={closeModal} />}
    </>
  );
};

export default Home;
