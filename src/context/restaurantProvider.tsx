import React, { createContext, useState, FC } from "react";
import { RestaurantsContextState } from "../types/context";
const contextDefaultValues: RestaurantsContextState = {
    restaurants: [],
    addRestaurants: () => {}
};
  
export const RestaurantsContext = createContext<RestaurantsContextState>(
    contextDefaultValues
);
  
const RestaurantsProvider: React.ReactNode = ({ children }: { children: React.ReactNode }) => {
    const [restaurants, setRestaurants] = useState<string[]>(contextDefaultValues.restaurants);
    const addRestaurants = (newRestaurants: string) => setRestaurants((restaurants) => [...restaurants, newRestaurants]);
    return (
        <RestaurantsContext.Provider
            value={{
                restaurants,
                addRestaurants
            }}
        >
            {children}
        </RestaurantsContext.Provider>
    );
};

export default RestaurantsProvider;