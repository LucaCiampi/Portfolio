"use client";

import educationData from 'json/education.json'

export default function Education() {
  return (
    <div>
      {educationData.map((education, index) => (
        <div key={index} className='mb-4'>
          <span>{education.date}</span>
          <h5>{education.schoolName}</h5>
          <div>{education.location}</div>
          <div>{education.description}</div>
          <div>{education.distinction}</div>
        </div>
      ))}
    </div>
  )
}
