  import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fectchMeals = async () => {
      setIsLoading(true);
      // ..............Fetching data from fireBASE...........
      const response = await fetch(
        "https://foodorderapp-abb98-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      // ...................Error Handlng ...............
      if(!response.ok){
        throw new Error('There is problrm in fetching data!!')
      }
      const responseData = await response.json();
      let loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

     fectchMeals().catch ((error) => {
      setIsLoading(false);
      setError(error.message);
    })

    fectchMeals();
  }, []);

  if(isLoading){
    return <section className={styles.mealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if(error){
    return <section className={styles.mealsError}>
      <p>{error}</p>
    </section>
  }

  if(error){
    
  }
  return (
    <Card className={styles.meals}>
      <ul>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}
          />
        ))}
      </ul>
    </Card>
  );
}

export default AvailableMeals;
