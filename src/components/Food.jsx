import { useEffect, useState } from "react"

export default function Food(props)
{

    const [quantity,setQuantity] = useState(100);
    const [food,setFood] = useState({});
    const [foodInitial,setFoodInitial] = useState({});



    useEffect(()=>{
        setFood(props.food);
        setFoodInitial(props.food);
    },[props.food])

    function handleInput(event)
    {
        setQuantity(Number(event.target.value));
    }

    function calculateMacros(event)
    {
        
        {

            let copyFood = {...food};

            copyFood.Protein = (foodInitial.Protein*quantity)/100;
            copyFood.Carbohydrate = (foodInitial.Carbohydrate*quantity)/100;
            copyFood.Fat = (foodInitial.Fat*quantity)/100;
            copyFood.Fiber = (foodInitial.Fiber*quantity)/100;
            copyFood.Calorie = (foodInitial.Calorie*quantity)/100;

            setFood(copyFood);

        }
        
    }

    return(

            <div className="food">

            <h2>{food.NameTr} - {quantity}g: {food.Calorie} kcal</h2>

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

            <div>

            <input type="number" onChange={handleInput} className="inp-quant" placeholder="Quantity in Grams" />

            <button onClick={calculateMacros}>Calculate</button>

            <button className="btn-add">Add</button>


            </div>


        </div>
    )
}