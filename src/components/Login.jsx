import { useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom"
export default function Login()
{

    const loggedData = useContext(UserContext);

    const navigate = useNavigate();

    const [userCreds,setUserCreds] = useState({
        email:"",
        password:""
    })

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy msg"
    })

    function handleInput(event)
    {
        setUserCreds((prevState)=>{

            return{...prevState,[event.target.name]:event.target.value};

        })
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        console.log(userCreds);

        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(userCreds),
            headers:{
                "Content-Type":"application/json"
            }

        })
        .then((response)=>{
            
            if(response.status===404)
            {
                setMessage({type:"error", text:"Username or Email Doesn't exist"});
            }
            else if (response.status===403) 
            {
                setMessage({type:"error", text:"Invalid Password"});
            }
            
            setTimeout(()=>{

                setMessage({type:"invisible-msg", text:"Dummy msg"})

            },5000)

            return response.json();

        })
        .then((data)=>{
            
            if(data.token!==undefined)
            {
                localStorage.setItem("app-user",JSON.stringify(data));

                loggedData.setLoggedUser(data);

                navigate("/track");
            }


        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(

        <section className="container">

            <form className="form" onSubmit={handleSubmit}>

                <h1>Login to Fitness</h1>

                <input className="inp" type="email" required placeholder="Enter Email" name="email" onChange={handleInput} value={userCreds.email}/>

                <input className="inp" type="password" minLength={8} placeholder="Enter Password" name="password"onChange={handleInput}value={userCreds.password}/>

                <button className="btn">Login</button>

                <p>Don't have an account? <Link to="/register">Register now</Link></p>

                <p className={message.type}>{message.text}</p>

            </form>

        </section>
        
    )
}


