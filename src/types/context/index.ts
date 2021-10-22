export type RestaurantsContextState = {
    restaurants: string[];
    addRestaurants: (name: string) => void;
};