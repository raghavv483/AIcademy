import React from 'react'

const Hero = () => {
  return (
    <div>
      <section className="bg-white lg:grid  lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="text-center py-16 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Unlock your learning<br />
              with <span className="text-violet-500">customized</span> AI courses
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              AIcademy generates personalized course content for every learner.<br />
              Choose your topics, set your pace, and let AI guide your educational journey.
            </p>
            <a href="/dashboard" className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-8 rounded shadow-md transition-colors duration-200">
              Generate Your Course
            </a>
          </div>


        </div>
      </section>
    </div>
  )
}

export default Hero