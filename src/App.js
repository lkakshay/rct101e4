import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonComponent from "./components/ButtonComponent";
import "./styles.css";
import CityRow from "./components/CityRow";

export default function App() {
  const [data, setData] = useState([{}]);
  const [order,setOrder]=useState("ASC")
  const [page,setPage]=useState(1)
  const [totalpage,setTotalpage]=useState(0)
  const [loading,setloading]=useState(false)
  const[button,setbutton]=useState(true)
  
 const handlePage=(x)=>{
 
if(x==="Sort by Ascending Population"){
    
  setOrder("ASC")
  setbutton(true)
 }
 if(x==="Sort by Descending Population"){
  setOrder("DESC")
  setbutton(false)
}

 if(x==="PREV" && page-1>0){
   setPage(page-1)
 }

 if(x==="NEXT" && page+1<=totalpage){
 
   setPage(page+1)
 }
}


  useEffect(()=>{
    setloading(true)
   axios.get(`https://json-server-mocker-masai.herokuapp.com/cities?_sort=population&_order=${order}&_page=${page}&_limit=10`).then((res)=>{
      setData(res.data)
      setloading(false)
   })
   axios.get(`https://json-server-mocker-masai.herokuapp.com/cities`).then((res)=>{
    console.log(res)
      setTotalpage(Math.ceil(res.data.length/10))
   })
  },[page,order])
  return (
    <div className="App">
      {loading?<div id="loading-container"></div>:<></>}
      <table>
        <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            CITY NAME
          </th>
          <th>
            COUNTRY NAME
          </th>
          <th>
            POPULATION
          </th>
          </tr>
        </thead>
       <tbody>
       {
          data?.map((e)=>(
            <CityRow key={e.id} data={e} />
          ))
        }
       </tbody>
      </table>

      <div>
        <ButtonComponent  id="SORT_BUTTON" handlePage={handlePage} title={button?"Sort by Descending Population":"Sort by Ascending Population"} />
        {page>1?<ButtonComponent handlePage={handlePage}title="PREV" id="PREV" />:<></>}
       {totalpage>page? <ButtonComponent handlePage={handlePage} id="NEXT" title="NEXT" />:<></>}
      </div>
    </div>
  );
}
