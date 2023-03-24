import React, {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../context/UserAuthContext';
import plugin from '../assets/illustrations/plugin.svg'
import achieve from "../assets/illustrations/achieve.svg";

export default function Landing() {
  const { user } = useUserAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate("/home")
    }
  })
  return (
    <main>
      <section className="py-6 lg:py-16 lg:px-32 px-8 text-center">
        <h1 className="lg:text-6xl text-3xl font-bold mb-8">
          Track Your Career Journey with Ease: Apply, Follow Up, Land Your Dream
          Job
        </h1>
        <p className="text-xl lg:px-32 mb-10">
          Take control of your job search and stay on top of your game with one
          app. Land your dream job with ease, track your progress and never miss
          an opportunity with Trace!
        </p>
        <Link
          to="/signup"
          className="bg-cornflower text-white px-5 py-2 rounded text-xl"
        >
          Get Started for Free
        </Link>
      </section>
      <section className="flex items-center my-8 justify-between w-full">
        <div className="flex flex-col items-center mx-12">
          <h2 className="lg:text-5xl text-3xl font-bold mb-8">
            Land your dream role
          </h2>
          <p className="text-2xl text-center">
            Discover a wide range of jobs sourced from different job boards so
            you never feel like you are missing out
          </p>
        </div>
        <div className="hidden bg-cornflower lg:flex justify-end rounded-l-md">
          <img src={achieve} alt="" className=" rounded-md" />
        </div>
      </section>
      <section className="flex flex-row-reverse items-center my-8 justify-between">
        <div className="hidden bg-cornflower lg:flexjustify-start rounded-r-md w-full">
          <img src={plugin} alt="" className="rounded-md " />
        </div>
        <div className="flex flex-col items-center mx-16">
          <h2 className="lg:text-5xl text-3xl font-bold mb-8">
            Track your Applications
          </h2>
          <p className="text-2xl text-center">
            No more messy spreadsheets. Trace keeps track of every detail about
            your job opportunities, regardless of where you found them
          </p>
        </div>
        <div className="hidden bg-cornflower lg:flex justify-start rounded-r-md">
          <img src={plugin} alt="" className=" rounded-md" />
        </div>
      </section>
    </main>
  );
}
