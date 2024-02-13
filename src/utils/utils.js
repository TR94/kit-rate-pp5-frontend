import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
    // generic function for the 'next' prop in Infinite Scroll, 
    // this will fetch next page of data for products/reviews/etc.
    try {
        const { data } = await axiosReq.get(resource.next);
        console.log(data)
        console.log(resource.next)
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