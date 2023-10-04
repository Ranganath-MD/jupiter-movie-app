import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import axios from "../../utils/axios";
import { DeatilsCard } from "../Discover/Card";

export const Search = () => {
    const [searchResults, setSearchResults] = useState([])
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q");

    useEffect(() => {
        const getSearchResults = async () => {
            try {
                const results = await axios.get(`/search/movie?query=${query}`)
                setSearchResults(results.data?.results)
            }catch {
                console.log("Error Occured")
            }
        }

        getSearchResults()
    }, [])

    return (
        <MDBContainer>
            <p>Search Results for: <strong>{query}</strong></p>
            {
                searchResults?.map((item) => {
                    return <DeatilsCard result={item} type="movies" />
                })
            }
        </MDBContainer>
    )
}