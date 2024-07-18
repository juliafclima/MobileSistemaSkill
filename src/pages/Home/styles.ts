import styled from "styled-components/native";

import { colors } from "../../global/styles/theme";

export const Container = styled.View`
  margin: 0 auto;
  padding: 20px;
  background-color: ${colors.dark};
  color: ${colors.light};
  margin: 0px;
  justify-content: center;
  padding-top: 4px;
`;

export const MainContainer = styled.View`
  margin-top: 20px;
`;

export const Subtitulo = styled.Text`
  text-align: center;
  color: ${colors.light};
  font-size: 16px;
  font-weight: bold;
  margin-top: 40px;
`;

export const CardContainer = styled.View`
  border: 1px solid ${colors.gray[500]};
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${colors.dark};
  width: 100%;
  justify-content: center;
`;

export const ContainerLixeira = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CardImage = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${colors.light};
  padding: 100px;
  resize-mode: contain;
`;

export const CardTitle = styled.Text`
  font-size: 20px;
  color: ${colors.light};
  margin-top: 20px;
`;

export const CardDescription = styled.Text`
  font-size: 14px;
  color: ${colors.gray[500]};
  text-align: justify;
`;

export const CardLevel = styled.Text`
  font-size: 16px;
  color: ${colors.gray[500]};
`;

export const SaveButton = styled.TouchableOpacity`
  border: none;
  display: flex;
`;

export const ContainerEdicao = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Titulo = styled.Text`
  text-align: center;
  color: ${colors.light};
  font-size: 31px;
  letter-spacing: 3px;
  word-spacing: 3.2px;
  margin-top: 20px;
`;

export const ContainerFiltros = styled.View`
  flex-direction: column;
`;

export const ContainerPaginacao = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;

export const FooterEspaco = styled.View`
  height: 50px;
`;

export const FooterParagrafo = styled.Text`
  margin-top: 100px;
  margin: auto;
  font-size: 12px;
  color: ${colors.light};
`;

export const Botao = styled.TouchableOpacity`
  font-size: 1em;
  padding: 0.5em;
  border: 1px solid ${colors.gray[500]};
  border-radius: 5px;
  width: 80px;
  font-size: 14px;
  align-items: center;
`;
