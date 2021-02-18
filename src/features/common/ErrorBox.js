import styled from "styled-components";

const ErrorBox = styled.div`
  background: #c51244 !important;
  padding: 10px !important;
  border-radius: 0 !important;
  position: relative;
  color: #fff;
  display: inline-block !important;
  box-shadow: 1px 1px 1px #aaaaaa;
  margin-top: 10px;
  &:before {
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #c51244;
    position: absolute;
    top: -10px;
  }
`;

export default ErrorBox;
