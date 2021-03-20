import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { config } from "../constants/config";
import api from "../services/api";
import { Image } from '../components';

const Wrapper = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const Grid = styled.div`
  display: flex;
  width: 700px;
  gap: 10px;
  flex-wrap: wrap;
`;

const Header = styled.h1`
  font-size: 32px;
  font-family: "Poppings", sans-serif;
  margin: 32px 0px;
  font-weight: 600;
`;

export const SearchResults = () => {
  let params = useParams();
  const [photos, setPhotos] = useState([]);
  console.log("search for ", params.q);

  useEffect(() => {
    const getPhotos = async () => {
      const photosResponse = await api.get(
        `search/photos?query=${params.q}&client_id=${config.access_key}`
      );
      setPhotos(photosResponse.data.results);
      console.log(photosResponse?.data?.results);
    };

    getPhotos();
  }, [params.q]);

  return (
    <Wrapper>
      <Header>Search Results for "{params.q}"</Header>
      <Grid>
        {photos.length && photos.map((e) => <Image src={e.urls.small} isLiked={e.liked_by_user} id={e.id} />)}
      </Grid>
    </Wrapper>
  );
};
