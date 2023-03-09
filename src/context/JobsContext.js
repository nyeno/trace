import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import { setDoc, doc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";

const jobsContext = createContext()

export function JobsContextProvider({ children }) {
    const [hackerNews, setHackerNews] = useState([]);
    const { user } = useUserAuth();
    const hackerNewsRef = collection(db, "jobs");

  const markAsApplied = async (job) => {
    const userDoc = doc(db, "users", user.uid, "appliedJobs", job.id);
    await setDoc(userDoc, {
          jobName: job.companyName,
          jobId: job.id,
          status: "Applied",
    })
    await updateDoc(userDoc, {
      appliedJobsTracker: arrayUnion(job.id),
    });
    };
  const postJob = async (companyName, companyDescription, companyWebsite, jobDescription, location,recruiterMail, remote, salary, tag) => {
        try {
        const docRef = await addDoc(hackerNewsRef, {
            companyDescription: companyDescription,
            companyName: companyName,
            companyWebsite: companyWebsite,
            jobDescription: jobDescription,
            location: location,
            recruiterMail: recruiterMail,
            remote: remote,
            salary: salary,
            tag:tag
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (e) {
        console.error("Error adding document: ", e);
        }
    };
  const getJobs = async () => {
    const data = await getDocs(hackerNewsRef);
    setHackerNews(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    // console.log("My data:", hackerNews);
  };
  useEffect(() => {
  getJobs();
    const interval=setInterval(()=>{
     getJobs();
     },120000)
    return()=>clearInterval(interval)
  },[]);
     return (
       <jobsContext.Provider
         value={{ hackerNews, markAsApplied, postJob }}
       >
         {children}
       </jobsContext.Provider>
    );
}

export function useJobs() {
  return useContext(jobsContext);
}