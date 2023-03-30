import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.utils";
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection, getDocs } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import { setDoc, doc, addDoc, updateDoc, arrayUnion, where, deleteDoc } from "firebase/firestore";

const traceContext = createContext();

export function TraceContextProvider({ children }) {
    const {user} = useUserAuth()
    const [columns, setColumns] = useState({
      
    applied: { name: "Applied", items: [] },
    interview1: { name: "Interview 1", items: [] },
    interview2: { name: "Interview 2", items: [] },
    finalInterview: { name: "Final Interview", items: [] },
    offerReview: { name: "Offer Review", items: [] },
    rejected: { name: "Rejected", items: [] },
    accepted: { name: "Accepted", items: [] },
  });

  const [value, loading, error] = useCollection(
    collection(db, "users", `${user?.uid}`, "appliedJobs"),
    where("status", "in", [
      "Applied",
      "interview 1",
      "Interview 2",
      "Final Interview",
      "Offer Review",
      "Rejected",
      "Accepted",
    ])
  );

  useEffect(() => {
    if (value) {
      const jobs = value.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const newColumns = {
        ...columns,
        applied: { name: "Applied", items: jobs.filter((job) => job.status === "Applied") },
        interview1: { name: "Interview 1", items: jobs.filter((job) => job.status === "Interview 1") },
        interview2: { name: "Interview 2", items: jobs.filter((job) => job.status === "Interview 2") },
        finalInterview: { name: "Final Interview", items: jobs.filter((job) => job.status === "Final Interview") },
        offerReview: { name: "Offer Review", items: jobs.filter((job) => job.status === "Offer Review") },
        rejected: { name: "Rejected", items: jobs.filter((job) => job.status === "Rejected") },
        accepted: { name: "Accepted", items: jobs.filter((job) => job.status === "Accepted") },
      };
      setColumns(newColumns);
      }
      //  console.log(columns)
  }, [value]);

const onDragEnd = async (result) => {
  const { source, destination, draggableId } = result;

  // Check if the draggable item was dropped outside of any droppable column
  if (!destination) {
    return;
  }

  // Check if the draggable item was dropped in a different column than the source
  if (source.droppableId !== destination.droppableId) {
    // Update the status of the job in the database
    //const jobId = parseInt(draggableId);
    const newStatus = destination.droppableId;

    await updateDoc(doc(db, "users", user.uid, "appliedJobs", draggableId), {
      status: columns[newStatus].name,
    });

    // Update the state of columns
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destinationItems = [...destinationColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);

    const newColumns = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationItems,
      },
    };

    setColumns(newColumns);
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    const newColumns = {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    };

    setColumns(newColumns);
  }
};

const handleDelete = async (job, columnId) => {
  const newColumns = { ...columns };
  newColumns[columnId].items = newColumns[columnId].items.filter(
    (item) => item.id !== job.id
  );
  setColumns(newColumns);
  console.log(job)
  await deleteDoc(doc(db, "users", user.uid, "appliedJobs", job.id));
};


  return (
    <traceContext.Provider value={{ columns, setColumns, onDragEnd, handleDelete}}>
      {children}
    </traceContext.Provider>
  );
}

export function useTrace() {
  return useContext(traceContext);
}


