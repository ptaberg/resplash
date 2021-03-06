import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { useAuth } from "../hooks";
import api from "../services/api";

const Img = styled.img`
  height: 100%;
  background-color: black;
  object-fit: cover;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  width: 33.3%;
  height: 260px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 0.8;
`;

export const Image = ({ src, isLiked, id }) => {
  const { state } = useAuth();
  const [liked, setLike] = useState(isLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = () => {
    const handlePhotoLike = async () => {
      setLoading(true);
      const like = await api[!liked ? "post" : "delete"](`/photos/${id}/like`);
      setLoading(false);
      setLike(like.data.photo.liked_by_user);
    };

    handlePhotoLike();
  };

  return (
    <Wrapper>
      <Img src={src} />

      {!!state.isLogged && (
        <ButtonWrapper>
          <Button type="secondary" onClick={handleLike} disabled={false}>
            {loading ? "..." : liked ? "Unlike" : "Like"}
          </Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};
