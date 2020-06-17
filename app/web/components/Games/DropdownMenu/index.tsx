import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { Colors } from 'shared/assets/color';

const Button = styled.div`
  width: 120px;
  background-color: ${Colors.gray5};
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const Contents = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ${Contents} {
      display: block;
    }
  }
`;

const Link = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const DropdownMenu = ({ items }: { items: any }) => {
  const [orderBy, setOrderBy] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const order = location.search.split('=')[1];
    if (order === 'total_rating') {
      setOrderBy('점수 순');
    } else if (order === 'popularity') {
      setOrderBy('인기 순');
    } else if (order === 'first_release_date') {
      setOrderBy('최신 발매 순');
    }
  }, [location]);
  return (
    <Wrapper>
      <Button>
        정렬:
        {' '}
        {orderBy}
      </Button>
      <Contents>
        {items.map((v) => <Link key={v.name} href={v.link}>{v.name}</Link>)}
      </Contents>
    </Wrapper>
  );
};

export default DropdownMenu;
