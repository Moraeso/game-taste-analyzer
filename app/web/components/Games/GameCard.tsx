import React from 'react';
import styled, { css } from 'styled-components';
import { Game } from 'shared/model/game';
import { Colors } from 'shared/assets/color';
import { API_URL } from 'shared/constants';
import { SimpleGame } from 'shared/model/game';

const ImgWrapper = styled.div(({
  show,
}: {
  show: boolean;
}) => css`
  display: ${!show && 'none'};
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  overflow: hidden;
  border-radius: 7px 7px 0 0;
`);

const Img = styled.img`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 7px 7px 0 0;
`;

const Content = styled.div`
  position: relative;
  margin: 15px 15px;
`;

const Line = styled.div`
  width: auto;
  height: 1px;
  margin: 5px auto;
  background-color: ${Colors.gray2};
`;

const SubContent = styled.div`
  display: none;
`;

const UL = styled.ul`
  padding-inline-start: 5px;
  font-size: 14px;
`;

const DL = styled.dl`
  margin: 10px 0;
`;

const DT = styled.dt`
  clear:left;
  float:left;
  display:block;
  width: 60px;
  color: ${Colors.gray5}
`;

const DD = styled.dd`
  width: auto;
  margin-left: 60px;
  color: ${Colors.gray7};
`;

const Text = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-right: 30px;
  transition: all .2s ease-out;
  color: ${Colors.gray9};
`;

const Link = styled.a`
  text-decoration: none;
  &:hover {
    cursor: pointer;
    ${Text} {
      color: ${Colors.gray5}
    }
  }
`;

const Score = styled.div(({
  color,
  show,
}: {
  show: boolean;
  color: string;
}) => css`
  display: ${!show && 'none'};
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 5px;
  border: 1px solid ${color};
  width: 30px;
  padding: 1px 0;
  text-align: center;
  font-size: 15px;
  color: ${color};
`);

const Wrapper = styled.div`
  display: block;
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
  border-radius: 7px;
  box-sizing: border-box;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  background-color: ${Colors.white};
  transition: 0.15s ease-in;
  &:hover {
    transform: scale(1.03);
    ${SubContent} {
      display: initial;
    }
  }
`;

const GameCard = ({ g }: { g: SimpleGame }) => {
  let scoreColor = Colors.green;
  if (Math.round(g.metacritic) === 0) {
    scoreColor = Colors.gray7;
  } else if (g.metacritic < 50) {
    scoreColor = Colors.red;
  } else if (g.metacritic < 85) {
    scoreColor = Colors.mango;
  }

  return (
    <Wrapper>
      <ImgWrapper show={!!(g.backgroundImage)}>
        <Img src={g.backgroundImage} alt={`${g.name}-thumbnail`} />
      </ImgWrapper>
      <Content>
        <Link href={`${API_URL}/game/${g.id}`}>
          <Text>{g.name}</Text>
          <Score show={!!(g.metacritic)} color={scoreColor}>{g.metacritic}</Score>
        </Link>
        <SubContent>
          <UL>
            <DL>
              <DT>출시일</DT>
              <DD>{!(g.tba) ? g.released : '출시 예정'}</DD>
            </DL>
            <Line />
            <DL>
              <DT>장르</DT>
              <DD>{(g.genres.map((v) => v.name))}</DD>
            </DL>
          </UL>
        </SubContent>
      </Content>
    </Wrapper>
  );
};

export default GameCard;
