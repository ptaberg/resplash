import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Bar = styled.div`
  display: flex;
`;

const SearchField = styled.div`
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
`;

const SearchButton = styled.button`
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  height: 32px;
  padding: 8px 17px;
  border-radius: 50px;
  background-color: #4375f5;
  border: none;
  color: white;
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
  margin: 8px;
`;

const SugItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 8px;

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
      <SearchButton
        onClick={() => {
          saveQueryToStorage(q);
          history.push(`/search/${q}`);
        }}
      >
        Search
      </SearchButton>
    </Bar>
  );
};
