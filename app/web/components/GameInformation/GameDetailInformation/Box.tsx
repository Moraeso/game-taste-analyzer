import { Colors } from 'shared/assets/color';
import styled from 'styled-components';
import { MOBILE_WIDTH } from 'web/constants';

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 22px 24px;
  border: 1px solid ${Colors.gray3};
  border-radius: 3px;
  background: ${Colors.gray0};
  box-sizing: border-box;
  
  @media (max-width: ${MOBILE_WIDTH}) {
    border: none;
    border-radius: 0;
  }
`;

export default Box;
