import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { config } from "../constants/config";
import api from "../services/api";
import { Image } from "../components";

const Wrapper = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const Grid = styled.div`
  display: flex;
  width: 800px;
  flex-wrap: wrap;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.h1`
  font-size: 32px;
  font-family: "Poppings", sans-serif;
  margin: 32px 0px 32px 12px;
  font-weight: 600;

  @media screen and (max-width: 800px) {
    font-size: 14px;
    margin: 18px 0px 18px 8px;
  }
`;

export const SearchResults = () => {
  let params = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      const photosResponse = await api.get(
        `search/photos?query=${params.q}&client_id=${config.access_key}`
      );
      setPhotos(photosResponse.data.results);
    };

    getPhotos();
  }, [params.q]);

  return (
    <Wrapper>
      <Header>Search Results for "{params.q}"</Header>
      <Grid>
        {!!photos.length &&
          photos.map((e) => (
            <Image src={e.urls.small} isLiked={e.liked_by_user} id={e.id} />
          ))}
      </Grid>
    </Wrapper>
  );
};
