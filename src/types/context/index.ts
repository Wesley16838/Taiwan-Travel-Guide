export type TourismsContextState = {
    search: SearchContextState ,
    searchbus: SearchBusContextState,
    loading: boolean,
    scenicspots: TourismContextState;
    activities: TourismContextState;
    restaurants: TourismContextState;
    hotels: TourismContextState;
    addScenicspots: (name: string, listing:[]) => void;
    addActivities: (name: string, listing:[]) => void;
    addRestaurants: (name: string, listing:[]) => void;
    addHotels: (name: string, listing:[]) => void;
    addLoading: (loading: boolean) => void;
    addSearch: (search: SearchContextState) => void;
    addSearchBus: (search: SearchBusContextState) => void;
}

export type TourismContextState = {
    name: string;
    listing: any[];
};

export type SearchContextState = {
    keyword: string;
    category: string;
    city: string;
};

export type SearchBusContextState = {
    city: string;
    route: string;
};