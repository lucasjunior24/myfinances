import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    background: ${({ theme }) => theme.colors.primary };
`;

export const Title = styled.Text`
    font-size: 24px;
    color: purple;
    font-weight: bold;
`;