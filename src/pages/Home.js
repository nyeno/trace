
import { useJobs } from "../context/JobsContext";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useUserAuth } from "../context/UserAuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.utils";

const Home = () => {
 const { user } = useUserAuth();
  const { hackerNews, markAsApplied } = useJobs()

  return (
    <>  
      <div>
        {hackerNews.map((job) => {
          return (
            <div key={job.id}>
              <p>{job.companyName}</p>
              <a
                href={`mailto:${job.recruiterMail}`}
              >
                {" "}
                Email {job.companyName}
              </a>
              <button onClick={() => markAsApplied(job)}>
                Mark as applied 
              </button>
            </div>
          );
          
        })}
      </div>
    </>
  );
};

export default Home;
