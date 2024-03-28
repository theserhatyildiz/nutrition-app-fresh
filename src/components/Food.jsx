import { useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Food(props)
{

    const [eatenQuantity,setEatenQuantity] = useState(100);
    const [food,setFood] = useState({});
    const [foodInitial,setFoodInitial] = useState({});
    let loggedData = useContext(UserContext);




    useEffect(()=>{
        setFood(props.food);
        setFoodInitial(props.food);
    },[props.food])

  console.log(loggedData);

    function calculateMacros(event)
    {

            if(event.target.value.length!==0)
            {
            
            let quantity = Number(event.target.value);
            setEatenQuantity(quantity);

            let copyFood = {...food};

            copyFood.Protein = (foodInitial.Protein*quantity)/100;
            copyFood.Carbohydrate = (foodInitial.Carbohydrate*quantity)/100;
            copyFood.Fat = (foodInitial.Fat*quantity)/100;
            copyFood.Fiber = (foodInitial.Fiber*quantity)/100;
            copyFood.Calorie = (foodInitial.Calorie*quantity)/100;

            setFood(copyFood);
        }
    }

    function trackFoodItem()
    {
        let trackedItem = {
            userId:loggedData.loggedUser.userid,
            foodId:food._id,
            details:{
                Protein:food.Protein,
                Carbohydrate:food.Carbohydrate,
                Fat:food.Fat,
                Fiber:food.Fiber,
                Calorie:food.Calorie
            },
            quantity:eatenQuantity
        }

        console.log(trackedItem)

        fetch("http://localhost:8000/track",{
            method:"POST",
            body:JSON.stringify(trackedItem),
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    return(

            <div className="food">

            <h2>{food.NameTr} - {eatenQuantity}g: {food.Calorie} kcal</h2>

            <div className="nutrient">
                <p className="n-title">Pro</p>
                <p className="n-value">{food.Protein}g</p>
            </div>

            <div className="nutrient">
                <p className="n-title">Carbs</p>
                <p className="n-value">{food.Carbohydrate}g</p>
            </div>

            <div className="nutrient">
                <p className="n-title">Fat</p>
                <p className="n-value">{food.Fat}g</p>
            </div>

            <div className="nutrient">
                <p className="n-title">Fiber</p>
                <p className="n-value">{food.Fiber}g</p>
            </div>

            <div className="track-control">

            <input type="number" onChange={calculateMacros} className="inp-quant" placeholder="Quantity in Grams" />

            <button className="btn-add" onClick={trackFoodItem}>Add</button>


            </div>


        </div>
    )
}