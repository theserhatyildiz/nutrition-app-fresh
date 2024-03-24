import { useState } from "react"
import { Link } from "react-router-dom"
export default function Register()
{

    const [userDetails,setUserDetails] = useState({
        name:"",
        email:"",
        password:"",
        age:"",
    })

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })

    function handleInput(event)
    {
        setUserDetails((prevState)=>{

            return {...prevState,[event.target.name]:event.target.value}
        }) 
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        console.log(userDetails);

        fetch("http://localhost:8000/register",{
            method:"Post",
            body:JSON.stringify(userDetails),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            
            setMessage({type:"success",text:data.message});

            setUserDetails({
                name:"",
                email:"",
                password:"",
                age:"",
            })

            setTimeout(()=>{
                setMessage({type:"invisible-msg",text:"Dummy msg"});
            },5000)

        })
        .catch((err)=>{
            console.log(err);
        })

    }

    return(

        <section className="container">

            <form className="form" onSubmit={handleSubmit}>

                <h1>Start Your Fitness</h1>
                
                <input className="inp" type="text" required placeholder="Enter Name" name="name" onChange={handleInput} value={userDetails.name} />

                <input className="inp" type="email" required placeholder="Enter Email" name="email" onChange={handleInput} value={userDetails.email}/>

                <input className="inp" type="password" required minLength={8} placeholder="Enter Password" name="password" onChange={handleInput} value={userDetails.password}/>

                <input className="inp" type="number" max={100} min={12} required placeholder="Enter Age" name="age" onChange={handleInput} value={userDetails.age}/>

                <button className="btn">Register</button>

                <p>Already Registered? <Link to="/login">Login</Link></p>

                <p className={message.type}>{message.text}</p>

            </form>


        </section>
        
    )
}


