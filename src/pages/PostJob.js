import { React, useState } from 'react'
import { useJobs } from '../context/JobsContext';
import Input from '../components/Input';


export default function PostJob() {
    const [companyDescription, setCompanyDescription] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [location, setLocation] = useState("");
    const [recruiterMail, setRecruiterMail] = useState("");
    const [salary, setSalary] = useState("");
    const [jobRole, setJobRole] = useState("")
    const [jobBoard, setJobBoard] = useState("");
    const [error, setError] = useState("");
  const { postJob } = useJobs()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const message = await postJob(
            companyName,
            companyDescription,
            companyWebsite,
            jobRole,
            jobDescription,
            location,
            recruiterMail,
            salary,
            jobBoard
      );
      await setError(message);
    }
    catch(e) {
      console.log(e)
    }

     setCompanyDescription("");
     setCompanyName("");
     setCompanyWebsite("");
     setJobBoard("");
     setJobDescription("");
     setJobRole("");
     setLocation("");
     setRecruiterMail("");
     setSalary("");
      
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 w-full h-full overflow-auto"
      >
        <Input
          label="Company Name"
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
          value= {companyName}
          required

        />
        <Input
          label="Job Role"
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="e.g Frontend Developer"
          type="text"
          value = {jobRole}
          required
        />
        <Input
          label="Job Board"
          onChange={(e) => setJobBoard(e.target.value)}
          value = {jobBoard}
          placeholder="What job board is the job sourced from"
        />
        <Input
          label="Company Description"
          onChange={(e) => setCompanyDescription(e.target.value)}
          placeholder="Enter the company description"
          type="textarea"
          value = {companyDescription}
          required
        />
        <Input
          label="Job Description"
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter the job description"
          value = {jobDescription}
          type="textarea"
          required
        />
        <Input
          label="Company Website"
          onChange={(e) => setCompanyWebsite(e.target.value)}
          placeholder="Enter the company website"
        />
        <Input
          label="Company Location"
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where is the company located?"
          value = {location}
          required
        />
        <Input
          label="Recruiter Mail"
          onChange={(e) => setRecruiterMail(e.target.value)}
          placeholder="Please enter email of recruiter to contact"
          value = {recruiterMail}
          required
        />
        <Input
          label="Salary Range"
          onChange={(e) => setSalary(e.target.value)}
          value = {salary}
          placeholder="Please the salary range with the appropraite currency symbol e.g $1000"
        />
        {error && <p className="text-orangish">{error}</p>}
        <button
          type="submit"
          className="bg-cornflower text-white px-5 py-2 rounded "
        >
          Post Job
        </button>
      </form>
    </>
  );
}
