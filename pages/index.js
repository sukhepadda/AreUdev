import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import { useState } from "react"

export default function Home() {
  const [tutorHour, setTutorHour] = useState([])
  const [practiceHour, setPracticeHour] = useState([])

  const apiTestFunc = () => {
    fetch("/api/hello").then(function (response) {
      return response.json();
    }
    ).then(function (data) {

      console.log(data);
      document.getElementById("outputSentence").innerText = JSON.stringify(data)

    }).catch(function (error) {
      console.log(error);
    });
  }

  const resetFunc = () => {
    document.getElementById("inputNumbereveryweektutor").value = null
    document.getElementById("inputNumbereveryweekpractice").value = null
    document.getElementById("outputSentence").innerText = null
  }
  const loadreturnestimate = () => {
    let tutorValue = Number(tutorHour);
    let practiceValue = Number(practiceHour);
    (tutorValue < 0 || practiceValue < 0) ? alert("enter positive value") : fetch("/api/postreturnestimate", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tutorValue, practiceValue }),
    }
    ).then(function (response) {
      return response.json();
    }
    ).then(function (data) {

      console.log(data);
      document.getElementById("outputSentence").innerText = data.simplesummarysentence

    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="grid justify-center items-center text-center text-white">
      <h1 className="text-4xl font-semibold my-2">Check how long it takes to become developer</h1>
      <div>
        <h2 className="text-3xl my-2" id="idealnumberofhourstitle">Ideal Recomendations</h2>
        <p className="my-2 text-lg" id="idealnumberofhoursstringptag">4 hours per week of tutoring and 12 hours per week of practice</p>
      </div>
      <div>
        <input className=" m-2 px-2 py-1 rounded-sm bg-gray-500 text-white placeholder-gray-400 border-2 border-gray-600  bg-transparent focus:outline-none " type="number" min="0" id="inputNumbereveryweektutor" placeholder="everyweektutor hours" onChange={e => setTutorHour(e.target.value)} />
        <input className=" m-2 px-2 py-1 rounded-sm bg-gray-500 text-white placeholder-gray-400 border-2 border-gray-600  bg-transparent focus:outline-none " type="number" min="0" id="inputNumbereveryweekpractice" placeholder="everyweekpractice hours" onChange={e => setPracticeHour(e.target.value)} />
      </div>
      <div className=" flex justify-center items-center ">
        <button type="button" className="text-white bg-transparent border-2 w-40 border-gray-600 rounded-lg p-1 m-2 hover:bg-gray-700 " onClick={loadreturnestimate}>
          load return estimate
        </button>

        <button type="button" onClick={resetFunc} className="text-white bg-transparent border-2 w-40 border-gray-600 rounded-lg p-1 m-2 hover:bg-gray-700 ">
          reset input
        </button>

        <button type="button" onClick={apiTestFunc} className="text-white bg-transparent border-2 w-40 border-gray-600 rounded-lg p-1 m-2 hover:bg-gray-700 ">
          Api Test
        </button>

      </div>

      {/* Output Window */}
      <h1 className="block" id="outputSentence"></h1>
    </div>
  )
}
