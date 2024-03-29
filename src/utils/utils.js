import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode";

export const fetchMoreData = async (resource, setResource) => {
    // generic function for the 'next' prop in Infinite Scroll, 
    // this will fetch next page of data for products/reviews/etc.
    try {
        const { data } = await axiosReq.get(resource.next);
        setResource((prevResource) => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id)
                    ? acc
                    : [...acc, cur];
            }, prevResource.results),
        }));
    } catch (err) {
        // console.log(err)
    }
};  


export const subscribeHelper = (category, clickedCategory, subscribe_id) => {
    return category.id === clickedCategory ?   
        {...category, subscriptions_count: category.subscriptions_count + 1, subscribe_id}
        :
        category;
}

export const unsubscribeHelper = (category, clickedCategory) => {
    return category.id === clickedCategory ?   
    {...category, subscriptions_count: category.subscriptions_count - 1, subscribe_id: null}
    :
    category;
}

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};