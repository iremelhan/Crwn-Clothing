import { withRouter } from "react-router-dom";

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  Title,
  Subtitle,
} from "./menu-item.styles";

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <ContentContainer>
        <Title className='title'>{title.toUpperCase()}</Title>
        <Subtitle className='subtitle'>SHOP</Subtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default withRouter(MenuItem);
