import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "../services/api";

const Grid = styled.div`
  display: flex;
  width: 800px;
  gap: 10px;
  flex-wrap: wrap;
`;

const Mock = styled.img`
  height: 200px;
  width: 200px;
  background-color: black;
  object-fit: cover;
`;

export const SearchResults = () => {
  let params = useParams();
  const [photos, setPhotos] = useState([]);
  console.log("search for ", params.q);

  useEffect(() => {
    const getPhotos = async () => {
      const photosResponse = await api.get(
        `search/photos?query=${params.q}&client_id=TkeJv_IfuDDUxigAJw93c7Fa4dnJq1PGjdVEm7kvTs8`
      );
      setPhotos(photosResponse.data.results);
      console.log(photos)
    };
    
    getPhotos();
  }, [params.q]);

  return (
    <>
      <div>Search Results for {params.q}</div>
      <Grid>
        {photos.length && photos.map((e) => (
          <Mock src={e.urls.small} />
        ))}
      </Grid>
    </>
  );
};
