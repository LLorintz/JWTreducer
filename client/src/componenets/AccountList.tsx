import { useEffect, useState } from "react"


const AccountList = () => {
const [accounts,setAccounts] =useState()

useEffect(()=>{
    getAllAcounts()
},[])

const getAllAcounts= async() =>{
    const username = localStorage.getItem('user')
    const token = localStorage.getItem("token")
    try {
        const response = await fetch(`http://localhost:3000/accounts/${username}`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <h1>AccountList</h1>
  )
}

export default AccountList