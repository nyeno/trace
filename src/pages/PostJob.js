import { React, useState } from 'react'
import { useJobs } from '../context/JobsContext';

export default function PostJob() {
    const [companyDescription, setCompanyDescription] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [location, setLocation] = useState("");
    const [recruiterMail, setRecruiterMail] = useState("");
    const [remote, setRemote] = useState("");
    const [salary, setSalary] = useState("");
    const [tag, setTag] = useState("");

    const {postJob} = useJobs()
        const handleSubmit = async (e) => {
          e.preventDefault();
          postJob(
            companyName,
            companyDescription,
            companyWebsite,
            jobDescription,
            location,
            recruiterMail,
            remote,
            salary,
            tag
          );
        };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Company Name</p>
          <input onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div>
          <p>Company Description</p>
          <input onChange={(e) => setCompanyDescription(e.target.value)} />
        </div>
        <div>
          <p>Job Description</p>
          <input onChange={(e) => setJobDescription(e.target.value)} />
        </div>
        <div>
          <p>Company Website</p>
          <input onChange={(e) => setCompanyWebsite(e.target.value)} />
        </div>
        <div>
          <p>Location</p>
          <input onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <p>Recruiter Mail</p>
          <input onChange={(e) => setRecruiterMail(e.target.value)} />
        </div>
        <div>
          <p>Remote</p>
          <input onChange={(e) => setRemote(e.target.value)} />
        </div>
        <div>
          <p>Salary</p>
          <input onChange={(e) => setSalary(e.target.value)} />
        </div>
        <div>
          <p>Tag</p>
          <input onChange={(e) => setTag(e.target.value)} />
        </div>
        <button type="submit">Post Job</button>
      </form>
    </>
  );
}
