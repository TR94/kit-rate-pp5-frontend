import {axiosReq, axiosRes} from "../api/axiosDefaults";
import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";


// creates context objects
export const CategoryDataContext = createContext();
export const SetCategoryDataContext = createContext();

// creates the custom hooks for the context objects
export const useCategoryData = () => useContext(CategoryDataContext);
export const useSetCategoryData = () => useContext(SetCategoryDataContext);

// export and define fuction 
export const CategoryDataProvider = ({ children }) => {
    const [categoryData, setCategoryData] = useState({
        pageCategory: { results: [] },
        popularCategories: { results: [] },
    });

    const currentUser = useCurrentUser();

    const handleSubscribe = async (clickedCategory) => {
        try {
            const {data} = await axiosRes.post('/subscriptions/', {
                subscribed: clickedCategory.id
            });

            setCategoryData((prevState) => ({
                ...prevState,
                pageCategory: {
                    results: prevState.pageCategory.results.map(category => 
                        subscribeHelper(category, clickedCategory, data.id)),
                },
                popularCategories: {
                    ...prevState.popularCategories,
                    results: prevState.popularCategories.results.map(category => 
                        subscribeHelper(category, clickedCategory, data.id)),
                },
            }));


        } catch (err) {
            // console.log(err)
        }
    }

    const handleUnsubscribe = async (clickedCategory) => {
        try {
            await axiosRes.delete(`/subscriptions/${clickedCategory.subscribed_id}`, {
                subscribed: clickedCategory.id
            });

            setCategoryData((prevState) => ({
                ...prevState,
                pageCategory: {
                    results: prevState.pageCategory.results.map(category => 
                        unsubscribeHelper(category, clickedCategory)),
                },
                popularCategories: {
                    ...prevState.popularCategories,
                    results: prevState.popularCategories.results.map(category => 
                        unsubscribeHelper(category, clickedCategory)),
                },
            }));


        } catch (err) {
            // console.log(err)
        }
    }

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/categories/?ordering=-subscriptions_count"
                );
                setCategoryData((prevState) => ({
                    ...prevState,
                    popularCategories: data,
                }));
            } catch (err) {
                // console.log(err)
            }
        }
        handleMount();
    }, [currentUser])

    // return contexts 
    // add to index.js
    return (
        <CategoryDataContext.Provider value={categoryData}>
            <SetCategoryDataContext.Provider value={{setCategoryData, handleSubscribe, handleUnsubscribe}}>
            {children}
            </SetCategoryDataContext.Provider>
        </CategoryDataContext.Provider>
    )

}