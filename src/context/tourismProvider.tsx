import React, { createContext, useState, useContext } from "react";
import { TourismsContextState, TourismContextState, SearchContextState, SearchBusContextState } from "../types/context";
const contextDefaultValues: TourismsContextState = {
    search: {
        keyword: '',
        category: '',
        city: '',
    },
    searchbus: {
        city: '',
        route: ''
    },
    loading: false,
    scenicspots: {
        name: '',
        listing: []
    },
    activities: {
        name: '',
        listing: []
    },
    restaurants: {
        name: '',
        listing: []
    },
    hotels: {
        name: '',
        listing: []
    },
    addScenicspots: () => {},
    addActivities: () => {},
    addRestaurants: () => {},
    addHotels: () => {},
    addLoading: () => {},
    addSearch: () => {},
    addSearchBus: () => {},
};
  
export const TourismContext = createContext<TourismsContextState>(
    contextDefaultValues
);
  
export function useTourisms() {
    return useContext(TourismContext);
}

const TourismsProvider = ({ children }: { children: React.ReactNode }) => {
    const [scenicspots, setScenicspots] = useState<TourismContextState>(contextDefaultValues.scenicspots);
    const [activities, setActivities] = useState<TourismContextState>(contextDefaultValues.activities);
    const [restaurants, setRestaurants] = useState<TourismContextState>(contextDefaultValues.restaurants);
    const [hotels, setHotels] = useState<TourismContextState>(contextDefaultValues.hotels);
    const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading);
    const [search, setSearch] = useState<SearchContextState>(contextDefaultValues.search)
    const [searchbus, setSearchBus] = useState<SearchBusContextState>(contextDefaultValues.searchbus)
    const addScenicspots = (newName: string, newScenicspots:[]) => setScenicspots({name: newName, listing: newScenicspots});
    const addActivities = (newName: string, newActivities:[]) => setActivities({name: newName, listing: newActivities});
    const addRestaurants = (newName: string, newRestaurants:[]) => setRestaurants({name: newName, listing: newRestaurants});
    const addHotels = (newName: string, newHotels:[]) => setHotels({name: newName, listing: newHotels});
    const addLoading = (newLoading: boolean) => setLoading(newLoading);
    const addSearch = (newSearch: SearchContextState) => setSearch({
        keyword: newSearch.keyword,
        city: newSearch.city,
        category: newSearch.category,
    });
    const addSearchBus = (newSearch: SearchBusContextState) => setSearchBus({
        city: newSearch.city,
        route: newSearch.route,
    });
    return (
        <TourismContext.Provider
            value={{
                search,
                searchbus,
                loading,
                scenicspots,
                activities,
                restaurants,
                hotels,
                addScenicspots,
                addActivities,
                addRestaurants,
                addHotels,
                addLoading,
                addSearch,
                addSearchBus,
            }}
        >
            {children}
        </TourismContext.Provider>
    );
};

export default TourismsProvider;