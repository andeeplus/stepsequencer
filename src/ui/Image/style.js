import styled from 'styled-components';
import Box from 'src/ui/Box';

const Image = styled(Box)`
  background-image: url(${(props) => props.url});
  background-position: 50% 50%;
  background-color: ${(props) => props.bg || props.theme.colors.gray[3]};
  padding: ${(props) => props.theme.space[3]};
  background-origin: ${props => props.backgroundOrigin};
`;

Image.defaultProps = {
  width: 1,
  height: '500px',
  backgroundSize: 'cover',
  // backgroundRepeat: 'no-repeat',
  // backgroundOrigin: 'content-box'
};

export default Image;
