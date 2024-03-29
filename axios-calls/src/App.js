import React from "react";
import {useEffect, useState} from 'react'
import axios from 'axios'
import './style.css'


function App() {

const [nameList, setNameList] = useState([]); //Create an empty array for nameList

const[word,setWord] = useState("");

const[search,setSearch] = useState("") // Create an empty string for the search filter
  
//Fetching the API with axios is a very simple call
  useEffect(()=> {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=500")
    .then((response) => {setNameList(response.data.results)})  //taking the response and setting nameList
  },[]) 
  
  //This function allows search only to be updated once handleClick is being called by the button. 
const handleClick = () => {
setSearch(word)
}


  return (
    <div>
      <h1 >API CALLS AND TEXT FILTERING</h1>

    <input type="text" placeholder="Search for a pokemon" onChange={((e) => setWord(e.target.value))} /*>>onChange={(e)=>setSearch(e.target.value)}*//>
    <button onClick={handleClick}>Search</button>
    {nameList.filter((item)=>{
      if(search === ""){
        return item
      }else if(item.name.toLowerCase().includes(search.toLowerCase())){
        return item
      }
    })
          //Mapping the nameList which is referred to here as item gotten from nameList.map((item) => {return({item.property})})
    .map((item) => {
      return(
        <div className="container" key={item.id} ><p>{item.name}</p></div>
      )
    })}
     


    </div>
  );
}

export default App;
