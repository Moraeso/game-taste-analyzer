import React from 'react';
import Navigation from 'web/components/Navigation';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 0 40px;
`;

const WrapperWithSidebar = ({ children }: { children: any }) => {
  return (
    <Wrapper>
      <Navigation />
      {children}
    </Wrapper>
  );
};

export default WrapperWithSidebar;
