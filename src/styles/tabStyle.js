import styled from "@emotion/styled";

const NavLink = styled.div`
  margin: 7px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  color: ${(props) => (props.active ? "#dbaa00" : "#fff")};
`;

export default {
  NavLink,
};
