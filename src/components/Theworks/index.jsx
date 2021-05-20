import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import work from 'data/work';

const Theworks = () => {

  const { workSlug } = useParams();
  const [currentWork, setCurrentWork] = useState(undefined)

  useEffect(() => {
    const foundWork = work.find((work) => work.slug === workSlug);
    setCurrentWork(foundWork);
  }, [workSlug])

  return (
    <div>
       {currentWork !== undefined ?
        <div>
          <h1>{currentWork.title}  - {currentWork.author} </h1>
         <p>{currentWork.description}</p>
       </div>
        : <p>error</p>}
    </div>
)}
    

export default Theworks;

