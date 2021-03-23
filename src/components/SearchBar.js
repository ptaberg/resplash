import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "./Button";
import SearchIcon from "../assets/SearchIcon.png";
import { Icon } from "./Icon";

const Bar = styled.div`
  display: flex;
  width: 100%;
`;

const SearchField = styled.div`
  width: 100%;
  input:focus + div {
    display: block;
  }

  div:hover {
    display: block;
  }
`;

const SearchInput = styled.input`
  width: 545px;
  height: 32px;
  box-sizing: border-box;
  left: 403px;
  top: 9px;
  background: #eaeaea;
  border: none;
  border-radius: 50px;
  padding: 8px 17px;
  outline: 0;
  margin-right: 8px;
  @media screen and (max-width: 800px) {
    width: calc(100% - 8px);
  }
`;

const SAVED_QUERIES_STATE = "queries";

const saveQueryToStorage = (query) => {
  const existQueries =
    JSON.parse(localStorage.getItem(SAVED_QUERIES_STATE)) || [];

  if (!existQueries.includes(query)) {
    existQueries.push(query);
    localStorage.setItem(SAVED_QUERIES_STATE, JSON.stringify(existQueries));
  }
};

const SugWrapper = styled.div`
  position: absolute;
  display: none;
  background-color: #fff;
  width: 545px;
  z-index: 2;
  border: 1px solid #eaeaea;
  border-radius: 4px;

  @media screen and (max-width: 800px) {
    left: 0;
    top: 50px;
    width: 100vw;
  }
`;

const SugItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 8px 24px;
  box-sizing: border-box;

  &:hover {
    background-color: grey;
  }
`;

const Suggestions = ({ limit, onChoose, query }) => {
  const items = JSON.parse(localStorage.getItem(SAVED_QUERIES_STATE)) || [];
  const suggestions = query ? items.filter((e) => e.includes(query)) : [];

  return (
    <SugWrapper>
      {suggestions.slice(0, limit).map((e, i) => (
        <SugItem key={i} onClick={() => onChoose(e)}>
          {e}
        </SugItem>
      ))}
    </SugWrapper>
  );
};

export const SearchBar = () => {
  const [q, setQ] = useState("");
  const history = useHistory();

  return (
    <Bar>
      <SearchField>
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
        {!!q.length && (
          <Suggestions limit={5} onChoose={(c) => setQ(c)} query={q} />
        )}
      </SearchField>
      <Button
        type="primary"
        onClick={() => {
          saveQueryToStorage(q);
          history.push(`/search/${q}`);
        }}
      >
        <Icon src={SearchIcon} />
        <span>Search</span>
      </Button>
    </Bar>
  );
};
