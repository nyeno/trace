import React from 'react'
import apply from '../assets/apply.jpg'
import track from '../assets/track.jpg'

export default function Landing() {
  return (
    <main>
        <section>
            <h1>
                Track Your Career Journey with Ease: 
                Apply, Follow Up, Land Your Dream Job
            </h1>
            <p>
                Take control of your job serach and stay on top of your game with one app.
                Land your dream job with ease, track your progress and never miss an opportunity with Trace!
            </p>
            <button>Get Started for Free</button>
        </section>
        <section>
            <div>
                <h2>Organize your Search</h2>
                <p>Discover a wide range of jobs sourced from different job boards so you never feel like you are missing out</p>
            </div>
            <div>
                <img src={apply} alt=''/>
            </div>
        </section>
        <section>
            <div>
                <img src={track} alt=''/>
            </div>
            <div>
                <h2>Track your Applications</h2>
                <p>No more messy spreadsheets. Trace keeps track of every detail about your job opportunities, regardless of where you found them</p>
            </div>
        </section>
    </main>
  )
}
