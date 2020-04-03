import styled from 'styled-components';

export const ButtonContainer = styled.button `
  text-transform:capitalize;
  font-size:1.4rem;
  background:transparent;
  border:0.3rem solid var(--ligthBlue);
  cursor:pointer;
  padding: 0.5rem,0.5rem;
  transition: all 0.5s ease-in-out;
  &:hover{
    color:#fff;
    background:black;

  }
`
