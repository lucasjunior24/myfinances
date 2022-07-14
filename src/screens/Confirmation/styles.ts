
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.primary};

    padding-top: 96px;
`;

export const Content = styled.View`
    justify-content: center;
    align-items: center;

    padding-bottom: 120px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.shape};

    margin-top: 20px;
`;


export const Message = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.text_detail};
    text-align: center;
    line-height: ${RFValue(25)}px;
    
    margin-top: 10px;
    margin-bottom: 6px;
`;
