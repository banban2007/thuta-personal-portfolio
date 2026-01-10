import React from 'react'
import Preloader from '../components/Preloader'
import { useSelector } from 'react-redux'
import Hero from '../components/Hero'
import Identity from './Identity'
import Work from './Work'
import Transition from '../components/Transition'

const Index = () => {
  const isFinished = useSelector((state) => state.loader.isfinished)
  return (
    <Transition>


    <main className=' relative min-h-screen bg-white'>
      {/* <Preloader /> */}

      <div className={isFinished ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
        <Hero />
      </div>

      <Identity/>

      <Work/>
    </main>
    </Transition>
  )
}

export default Index