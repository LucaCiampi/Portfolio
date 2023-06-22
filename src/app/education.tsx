"use client";

import educationData from 'json/education.json'
import Wax from 'public/images/wax.svg';

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
          <div className="w-8 wax">
            <Wax />
          </div>
        </div>
      ))}
    </div>
  )
}
