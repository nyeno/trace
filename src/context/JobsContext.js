import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";
import { setDoc, doc, addDoc, updateDoc, arrayUnion, getDoc, onSnapshot } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";


const jobsContext = createContext()

export function JobsContextProvider({ children }) {
  const [hackerNews, setHackerNews] = useState([]);
  const [allAppliedJobs, setAllAppliedJobs] = useState([])
  const { user } = useUserAuth();
  const hackerNewsRef = collection(db, "jobs");

  const markAsApplied = async (job) => {
      const userDoc = doc(db, "users", user.uid, "appliedJobs", job.id);
      const jobRef = doc(db, "users", user.uid);
      const userRef = doc(db, "users", user.uid);
      const jobDoc = await getDoc(userRef);
      
        await setDoc(userDoc, {
              jobName: job.companyName,
              jobId: job.id,
              status: "Applied",
              jobRole: job.jobRole
        })
      //console.log(jobRef);
      
    //const jobDoc = await jobRef.getDoc();

      if (jobDoc.exists()) {
        const userData = jobDoc.data();
        const appliedJobs = userData.allAppliedJobs || [];

        if (!appliedJobs.includes(job.id)) {
         //const updatedAppliedJobs = [...appliedJobs, job.id];
          await updateDoc(jobRef, {
              allAppliedJobs: arrayUnion(job.id),
            });
          console.log("Job ID added to applied jobs array");
        } else {
          console.log("Job ID already exists in applied jobs array");
        }
      } else {
        console.log("User document not found");
      }
  
    console.log(allAppliedJobs)
    };
  const postJob = async (companyName, companyDescription, companyWebsite, jobRole, jobDescription, location,recruiterMail, salary, jobBoard) => {
        try {
        const docRef = await addDoc(hackerNewsRef, {
            companyDescription: companyDescription,
            jobRole: jobRole,
            companyName: companyName,
            companyWebsite: companyWebsite,
            jobDescription: jobDescription,
            location: location,
            recruiterMail: recruiterMail,
            salary: salary,
            jobBoard: jobBoard
        });
        return("Job posted successfully" );
        } catch (e) {
        return("Error adding job, please try again ", e);
        }
    };
  const getJobs = async () => {
    const data = await getDocs(hackerNewsRef);
    //const jobs = await getDocs(db, "users", user.uid, "appliedJobs");
    setHackerNews(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };


  const [allAppliedJobsSnapshot, allAppliedJobsLoading, allAppliedJobsError] =
      useDocument(doc(db, "users", `${user?.uid}`), {
        snapshotListenOptions: { includeMetadataChanges: true },
  });
  
useEffect(() => {
  if (allAppliedJobsSnapshot && allAppliedJobsSnapshot.exists()) {
    const userData = allAppliedJobsSnapshot.data();
    if (userData) {
      setAllAppliedJobs(userData.allAppliedJobs); // extract the array from the data object
    }
  }
   //console.log(allAppliedJobs, "beeb");
}, [allAppliedJobsSnapshot]);
  
  useEffect(() => {
    getJobs();
    //console.log(allAppliedJobs);
    const interval = setInterval(()=>{
     getJobs();
     },120000)
    return()=>clearInterval(interval)
  }, []);
  
     return (
       <jobsContext.Provider
         value={{ hackerNews, markAsApplied, postJob, allAppliedJobs }}
       >
         {children}
       </jobsContext.Provider>
    );
}

export function useJobs() {
  return useContext(jobsContext);
}