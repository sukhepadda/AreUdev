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
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="description" content="A webpage to check in how much time you will be a developer" />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <meta name="author" content="Jay" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Are U Dev?</title>

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />


        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

      </Head>
      <div className="container text-center">
        <h1 className="h2 text-primary my-3 m-2">Check how long it takes to become developer</h1>
        <div>
          <h2 className="h5 m-2 text-info" id="idealnumberofhourstitle">Ideal Recomendations</h2>
          <p className="lead text-white m-2" id="idealnumberofhoursstringptag">4 hours per week of tutoring and 12 hours per week of practice</p>
        </div>
        <div className='input-group'>
          <input className="m-2 form-control" type="number" min="0" id="inputNumbereveryweektutor" placeholder="everyweektutor hours" onChange={e => setTutorHour(e.target.value)} />
          <input className="m-2 form-control" type="number" min="0" id="inputNumbereveryweekpractice" placeholder="everyweekpractice hours" onChange={e => setPracticeHour(e.target.value)} />
        </div>
        <div className="">
          <button type="button" className="btn btn-primary m-2" onClick={loadreturnestimate}>
            Load Estimate
          </button>

          <button type="button" onClick={resetFunc} className="btn btn-danger m-2">
            Reset Values
          </button>

          <button type="button" onClick={apiTestFunc} className="btn btn-secondary m-2">
            Api Test
          </button>

        </div>

        {/* Output Window */}
        <h1 className="h5 text-success m-3" id="outputSentence"></h1>
      </div>
    </>
  )
}
