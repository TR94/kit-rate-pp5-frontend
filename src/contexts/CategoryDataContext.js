import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { subscribeHelper} from "../utils/utils";


// creates context objects
const CategoryDataContext = createContext();
const SetCategoryDataContext = createContext();

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

    // handle subscribe needs to take clickedCategory and convert to an ID with the first API request
    // then it can post to the subscriptions end point
    const handleSubscribe = async (clickedCategory) => {
        console.log(clickedCategory)
        // try {
        //     const {data : { results }} = await axiosReq.get(`/categories`)
        //     console.log(results)

        //     if (clickedCategory === category)
        //         return category.id

        // } catch (err) {
        //     console.log(err)
        // }
        
        try {
            const {data} = await axiosRes.post('/subscriptions/', {
                category: clickedCategory
            });
            console.log(data)

            // setCategoryData((prevState) => ({
            //     ...prevState,
            //     pageCategory: {
            //         results: prevState.pageCategory.results.map(category => 
            //             subscribeHelper(category, clickedCategory, data.id)),
            //     },
            //     popularCategories: {
            //         ...prevState.popularCategories,
            //         results: prevState.popularCategories.results.map(category => 
            //             subscribeHelper(category, clickedCategory, data.id)),
            //     },
            // }));
        } catch (err) {
            // console.log(err)
        }
    }

    const handleUnsubscribe = async (clickedCategory) => {
        try {
            await axiosRes.delete(`/subscriptions/${clickedCategory.category_detail.subscribed_id}`, {
                category: clickedCategory.id
            });

            // setCategoryData((prevState) => ({
            //     ...prevState,
            //     pageCategory: {
            //         results: prevState.pageCategory.results.map(category => 
            //             unsubscribeHelper(category, clickedCategory)),
            //     },
            //     popularCategories: {
            //         ...prevState.popularCategories,
            //         results: prevState.popularCategories.results.map(category => 
            //             unsubscribeHelper(category, clickedCategory)),
            //     },
            // }));


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

    return (
        <CategoryDataContext.Provider value={categoryData}>
            <SetCategoryDataContext.Provider value={{setCategoryData, handleSubscribe}}>
                {/* add handlesubscribe above {{setCategoryData, handleSubscribe}} */}
            {children}
            </SetCategoryDataContext.Provider>
        </CategoryDataContext.Provider>
    )

}