import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { subscribeHelper, unsubscribeHelper} from "../utils/utils";


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

    const handleSubscribe = async (category, owner) => {   
        const cat = categoryData?.popularCategories?.results?.find((v)=> v.category === category)   
        try {
            const {data} = await axiosRes.post('/subscriptions/', {
                owner: owner.username,
                category: cat.id
            });

            setCategoryData((prevState) => ({
                ...prevState,
                pageCategory: {
                    results: prevState.pageCategory.results.map(category => 
                        subscribeHelper(category, data.id)),
                },
                popularCategories: {
                    ...prevState.popularCategories,
                    results: prevState.popularCategories.results.map(category => 
                        subscribeHelper(category, data.id)),
                },
            }));
        } catch (err) {
            console.log(err)
        };
    };

    const handleUnsubscribe = async (category, subscriptions) => {
        console.log("category: " + category.id)
        // console.log(subscriptions.results)
        
        // const {sub} = subscriptions.results
        // console.log({sub})
            
        // // need function to take subscriptions and check for category.id and return subscription.id

        // const sub_id = subscriptions?.results?.find((value) => value.category === category)
            
        try {
            await axiosRes.delete(`/subscriptions/${category.id}/`)

            setCategoryData((prevState) => ({
                ...prevState,
                pageCategory: {
                    results: prevState.pageCategory.results.map(category => 
                        unsubscribeHelper(category, subscriptions.id)),
                },
                popularCategories: {
                    ...prevState.popularCategories,
                    results: prevState.popularCategories.results.map(category => 
                        unsubscribeHelper(category, subscriptions.id)),
                },
            }));


        } catch (err) {
            console.log(err)
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
            <SetCategoryDataContext.Provider value={{setCategoryData, handleSubscribe, handleUnsubscribe}}>
                {/* add handlesubscribe above {{setCategoryData, handleSubscribe}} */}
            {children}
            </SetCategoryDataContext.Provider>
        </CategoryDataContext.Provider>
    )

}