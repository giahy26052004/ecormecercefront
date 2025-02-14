import Link from "next/link";
import { ButtonStyle } from "./button";
import styled from "styled-components";
const StyledLink = styled(Link)`
  ${ButtonStyle}
`;
function ButtonLink(props) {
  return <StyledLink {...props} />;
}

export default ButtonLink;
