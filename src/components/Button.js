import styled from 'styled-components';

export const ButtonContainer = styled.button `
  text-transform:capitalize;
  font-size:1.4rem;
  background:transparent;
  border:0.2rem light var(--mainDark);
  border-radius:3px;
  padding-left:13px;
  padding-right:13px;
  margin-left
  cursor:${props=>(props.disabled?'default':'pointer')};
  padding: 0.5rem,0.5rem;
  transition: all 0.5s ease-in-out;
  &:hover{
    color: ${props=>(props.disabled?'black':'#fff')};
    background:${props=>(props.disabled?'#fff':'black')};

  }
`
