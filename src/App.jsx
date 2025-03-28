import React from 'react';
import './App.css'
import VideoPlayer from './VideoPlayer';

function App() {
  return (
    <div className='w-full flex justify-center flex-col items-center mt-5'>
      <h1 className='m-5 text-2xl font-bold text-rose-500 underline'>Video Player</h1>
      <VideoPlayer />
    </div>
  )
}

export default App
