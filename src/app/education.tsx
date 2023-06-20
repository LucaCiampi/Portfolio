"use client";

const educationsData = [
  {
    date: "2022-2024",
    schoolName: "GOBELINS Annecy",
    location: "Annecy, France",
    description: "Mastère spécialisé Design et Management de l'innovation interactive, lead technique",
    distinction: "graduated"
  },
  {
    date: "2021-2022",
    schoolName: "GOBELINS Annecy",
    location: "Annecy, France",
    description: "Bachelor développeur interactif",
    distinction: "graduated"
  },
  {
    date: "2020-2021",
    schoolName: "Université Savoie Mont-Blanc",
    location: "Aix-les-bains, France",
    description: "Licence STS mention informatique",
    distinction: "graduated"
  },
  {
    date: "2019-2020",
    schoolName: "Queen's University",
    location: "Kingston, Canada",
    description: "Arts & science, computer science",
    distinction: "ORA exchange program"
  },
  {
    date: "2017-2019",
    schoolName: "Université Savoie Mont-Blanc",
    location: "Annecy, France",
    description: "DUT Informatique",
    distinction: "with honours"
  },
]

export default function Education() {
  return (
    <div>
      <h2>Éducation</h2>
      <div>
        {educationsData.map((education, index) => (
          <div key={index}>
            <span>{education.date}</span>
            <h5>{education.schoolName}</h5>
            <div>{education.location}</div>
            <div>{education.description}</div>
            <div>{education.distinction}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
