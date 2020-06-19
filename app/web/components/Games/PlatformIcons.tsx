import React from 'react';
import styled from 'styled-components';
import androidIcon from 'web/assets/png/platform/icon-android.png';
import atariIcon from 'web/assets/png/platform/icon-atari.png';
import commodoreAmigaIcon from 'web/assets/png/platform/icon-commodore-amiga.png';
import iosIcon from 'web/assets/png/platform/icon-ios.png';
import linuxIcon from 'web/assets/png/platform/icon-linux.png';
import macIcon from 'web/assets/png/platform/icon-mac.png';
import nintendoIcon from 'web/assets/png/platform/icon-nintendo.png';
import playstationIcon from 'web/assets/png/platform/icon-playstation.png';
import segaIcon from 'web/assets/png/platform/icon-sega.png';
import webIcon from 'web/assets/png/platform/icon-web.png';
import pcIcon from 'web/assets/png/platform/icon-pc.png';
import xboxIcon from 'web/assets/png/platform/icon-xbox.png';
import _3doIcon from 'web/assets/png/platform/icon-3do.png';
import neogeoIcon from 'web/assets/png/platform/icon-neogeo.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: 24px;
`;

const Img = styled.img`
  width: auto;
  height: 100%;
  margin-right: 3px;
`;

const ICONS = [
  {
    id: 1,
    icon: pcIcon,
  },
  {
    id: 2,
    icon: playstationIcon,
  },
  {
    id: 3,
    icon: xboxIcon,
  },
  {
    id: 4,
    icon: iosIcon,
  },
  {
    id: 5,
    icon: androidIcon,
  },
  {
    id: 6,
    icon: macIcon,
  },
  {
    id: 7,
    icon: linuxIcon,
  },
  {
    id: 8,
    icon: nintendoIcon,
  },
  {
    id: 9,
    icon: atariIcon,
  },
  {
    id: 10,
    icon: commodoreAmigaIcon,
  },
  {
    id: 11,
    icon: segaIcon,
  },
  {
    id: 12,
    icon: _3doIcon,
  },
  {
    id: 13,
    icon: neogeoIcon,
  },
  {
    id: 14,
    icon: webIcon,
  },
];

const findIcon = (id) => {
  const ret = ICONS.find((v) => v.id === id);
  return ret.icon;
};

const PlatformIcons = (platforms) => {
  return (
    <Wrapper>
      {platforms.platforms.map((v) => <Img key={v.id} src={findIcon(v.id)} alt={`${v.name}-icon`} />)}
    </Wrapper>
  );
};

export default PlatformIcons;
