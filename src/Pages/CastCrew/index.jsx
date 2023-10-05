import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from '../../utils/axios'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardTitle, MDBCardText} from "mdb-react-ui-kit";
import Avatar from "../../assets/avatar.png"

export const FullCastCrew = () => {
    const [cast, setCast] = useState([])
    const [load, setLoad] = useState(true)
    const params = useParams()

    useEffect(() => {
        const getCredits = async () => {
            try {
            const credits = await axios.get(`/movie/${params.id}/credits`)
            setCast(credits.data.cast)
            }catch(error) {
                console.log(error)
            }finally {
                setLoad(false)
            }
        }

        getCredits()
    }, [])

    return (
        <MDBContainer>
            <MDBRow>
                    {!load && cast?.map(cast => {
                        return (
                            <MDBCol size="6" sm="4" md="3" lg="2" key={cast.id}>
                                <MDBCard className="cast-card">
                                    <MDBCardImage
                                        onError={(e) => { e.target.onerror = null; e.target.src = Avatar }}
                                        src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                                        className="cast-img"
                                    />
                                    <MDBCardTitle className="cast-name">{cast.name}</MDBCardTitle>
                                    <MDBCardText className="cast-character">{cast.character}</MDBCardText>
                                </MDBCard>
                            </MDBCol>
                        )
                    })}
            </MDBRow>
        </MDBContainer>
    )
}
