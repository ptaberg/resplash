import styled from "styled-components";
import { SearchBar } from "./SearchBar";
import { UserLog } from "./UserLog";

const NavWrapper = styled.div`
  background-color: #fff;
  height: 50px;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
`;

export const Navbar = ({ navigation }) => {
  return (
    <NavWrapper>
      <SearchBar />
      <UserLog />
    </NavWrapper>
  );
};
