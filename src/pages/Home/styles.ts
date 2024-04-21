import styled from "styled-components/native";

import { colors } from "@/global/styles/theme";

export const Container = styled.View`
  margin: 0 auto;
  padding: 20px;
  background-color: ${colors.dark};
  color: ${colors.light};
  margin: 0px;
  justify-content: center;
`;

export const MainContainer = styled.View`
  margin-top: 20px;
`;

export const CardContainer = styled.View`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${colors.black};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  justify-content: center;
`;

export const CardImage = styled.Image`
  width: 80%;
  height: 100px;
  margin: auto;
  margin-top: 10px;
  background-color: aliceblue;
  padding: 15px;
  border-radius: 10px;
`;

export const CardTitle = styled.Text`
  font-size: 20px;
`;

export const CardDescription = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: justify;
`;

export const CardLevel = styled.Text`
  font-size: 16px;
  color: #777;
`;

export const InputField = styled.TextInput`
  font-size: 16px;
  border: 1px solid black;
  outline: none;
  padding: 3px;
  border-radius: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
`;

export const SaveButton = styled.TouchableOpacity`
  background: none;
  border: none;
  display: flex;
`;

export const ContainerEdicao = styled.View`
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-direction: column;
`;
