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
    } catch (err) { }
};  


export const subscribeHelper = (category) => {
    return category.id ?   
        {...category, subscriptions_count: category.subscriptions_count + 1}
        :
        category;
}

export const unsubscribeHelper = (category) => {
    return category.id ?   
    {...category, subscriptions_count: category.subscriptions_count - 1}
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