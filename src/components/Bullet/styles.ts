import styled from "styled-components/native";

interface Props {
  active: boolean;
}

export const Container = styled.View<Props>`
    background-color: ${({ theme, active}) => 
        active ? theme.colors.title : theme.colors.shape};
    width: 6px;
    height: 6px;

    margin-left: 8px;
    border-radius: 3px;
`;