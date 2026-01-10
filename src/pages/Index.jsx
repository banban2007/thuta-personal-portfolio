import React from 'react'
import Preloader from '../components/Preloader'
import { useSelector } from 'react-redux'
import Hero from '../components/Hero'
import Identity from './Identity'
import Process from './Process'
import Work from './Work'
import Transition from '../components/Transition'
import Stack from './Stack'

const Index = () => {
  const isFinished = useSelector((state) => state.loader.isfinished)
  return (
    <Transition>
    <main className=' relative min-h-screen bg-white'>
      <div className={isFinished ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
        <Hero />
      </div>
      <Identity/>
      <Work/>
      <Process/>
      <Stack/>
    </main>
    </Transition>
  )
}

export default Index