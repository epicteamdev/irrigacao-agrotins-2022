import styled from "styled-components";

export const Container = styled.div`
    width: 95%;
    heitgh: auto;
    margin-left: 2.5%;
    display: flex;
    flex direction: row wrap;
    align-items: space between;
    padding: 10px; 
    margin-top: 20px;
`;

export const ChartContainer = styled.div`
  width: 100%;
  diplay: flex;
  background-color: white;
  padding: 20px;
  border-radius: 0px 0px 5px 5px;
`;

export const Header = styled.div`
  width: 100%;
  height: 130px;
  background-color: #738DCF;
  display: flex;
  flex-direction: row;
  box-shadow: 5px 5px 5px 5px black;
`;

export const LogList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: "auto";
  width: 100%;
`;

export const Footer = styled.div`
    width: 40%;
    position: relative;s
    justify-content: center;
    alignItems-center;
    margin-left: 30%;
`;

export const LogContainer = styled.div`
    height: 30vh;
    overflow-y: scroll;
`;
