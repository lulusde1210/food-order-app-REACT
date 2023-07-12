import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://food-order-app-4b3eb-default-rtdb.firebaseio.com/meals.json'

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMeals = async () => {
        try {
            const response = await axios.get(BASE_URL);
            const allMeals = await response.data;
            const mealsList = [];
            for (const id in allMeals) {
                mealsList.push({
                    id: id,
                    name: allMeals[id].name,
                    description: allMeals[id].description,
                    price: allMeals[id].price,
                })
            }
            setMeals(mealsList)
        } catch (err) {
            setLoading(false);
            setError(true);
            console.log(err);
        }

        setLoading(false)

    }

    useEffect(() => {
        fetchMeals()
    }, [])

    return (
        <section className={classes.meals}>
            <Card>
                {loading && <p>LOADING...</p>}
                {error && <p>No meals found</p>}
                <ul>
                    {
                        meals.map((meal) =>
                            <MealItem
                                key={meal.id}
                                id={meal.id}
                                name={meal.name}
                                description={meal.description}
                                price={meal.price}
                            />)
                    }
                </ul>
            </Card>

        </section>
    )
};

export default AvailableMeals;