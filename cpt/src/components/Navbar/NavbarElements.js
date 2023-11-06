import { Button } from '@mui/material';
import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavSearch = styled.div`
display: flex;
align-items: center;
gap: 0px;
`;


export const Nav = styled.nav`
background: #000000;
height: 50px;
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 20;
position: sticky;
top: 0;
/* Third Nav */
/* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
color: #E5E4E2;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 10px;
height: 100%;
cursor: pointer;
&.active {
	color: #000000;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #FFFFFF;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 0px;
/* Third Nav */
/* justify-content: flex-end;
width: 100vw; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #4dabf5;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 0px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #4dabf5;
	color: #808080;
	opacity: 0.7;
}
`;

export const NavBtnLinkDisable = styled(Link)`
border-radius: 4px;
background: #E5E4E2;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: not-allowed;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 0px;
`;

export const NavBtnLinkFile = styled(Link)`
border-radius: 4px;
background: #4dabf5;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 0px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #4dabf5;
	color: #808080;
	opacity: 0.7;
}
`;