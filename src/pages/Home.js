import { React, useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const [hackerNews, setHackerNews] = useState([])
  const hackerNewsRef = collection(db, 'jobs', 'hackerNewsJobs', 'reactJobs')

  useEffect(() => {
    const getJobs = async() => {
      const data = await getDocs(hackerNewsRef)
      setHackerNews(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
      console.log("My data:" , hackerNews)
    }

    getJobs()
  }, [])
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <button variant="primary" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div>
        {hackerNews.map((user) => {
          return (
            <div key={user.id}>
              <p>{user.companyName}</p>
              <a
                href={`mailto:${user.recruiterMail}`}
              >
                {" "}
                Email {user.companyName}
              </a>
            </div>
          );
          
        })}
      </div>
    </>
  );
};

export default Home;
