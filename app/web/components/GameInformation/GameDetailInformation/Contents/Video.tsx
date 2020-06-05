import React from 'react';
import styled from 'styled-components';
import { useGameInformationContext } from 'web/components/GameInformation/Context';
import { Colors } from 'shared/assets/color';
import EmptySpace from 'web/components/shared/EmptySpace';

const Wrapper = styled.div`
  margin: 0 20px;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
`;

const Youtube = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${Colors.gray9};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 20px auto;
  background-color: ${Colors.gray2};
`;

const Video = () => {
  const game = useGameInformationContext();
  if (!game) return null;
  if (!game.video) return null;

  return (
    <Wrapper>
      <Text>
        동영상
      </Text>
      <EmptySpace marginTop="10px" />
      <VideoWrapper>
        <Youtube src={game.video.replace('/watch?v=', '/embed/')} />
      </VideoWrapper>
      <Line />
    </Wrapper>
  );
}

export default Video;
