import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"

export default function Track()
{
    const loggedData = useContext(UserContext);

    const [foodItems,setFoodItems] = useState([]);

    const [food,setFood] = useState(null);

    useEffect(()=>{
        console.log(food);
    })

    function searchFood(event)
    {
        if(event.target.value.length!==0)
        {

            fetch(`http://localhost:8000/foods/${event.target.value}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${loggedData.loggedUser.token}` 
                }

            })
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
                if(data.message===undefined)
                {
                    setFoodItems(data);
                }
                else 
                {
                    setFoodItems([]);
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else
        {
            setFoodItems([]);
        }


    }




    return(
        <>
            
        <section className="container track-container">

        <div className="search">

                <input className="search-inp" onChange={searchFood} type="search" placeholder="Search food item"/>
        </div>

            {
                foodItems.length!==0?(
                    <div className="search-results">

                    {
                        foodItems.map((item)=>{

                            return(
                                <p className="item" onClick={()=>{
                                   setFood(item)
                                }} key={item._id}>{item.NameTr}</p>
                            )
                        })
                    }

                    </div>
                ):null
            }
        

            <div className="food">

                <h2>Name (100 kcal)</h2>
               

                <div className="nutrient">
                    <p className="n-title">Pro</p>
                    <p className="n-value">230g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Carbs</p>
                    <p className="n-value">230g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Fat</p>
                    <p className="n-value">230g</p>
                </div>

                <div className="nutrient">
                    <p className="n-title">Fiber</p>
                    <p className="n-value">230g</p>
                </div>

                <div>

                <input type="number" className="inp-quant" placeholder="Quantity in Grams" />
                <button className="btn-add">Add</button>

                </div>


            </div>

        </section>

        </>
    )
}