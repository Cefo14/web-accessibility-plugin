import MenuRoot from './Menu';
import MenuHeader from './MenuHeader';
import MenuBody from './MenuBody';

const Menu = MenuRoot as typeof MenuRoot & {
  Header: typeof MenuHeader;
  Body: typeof MenuBody;
};

Menu.Header = MenuHeader;
Menu.Body = MenuBody;

export default Menu;
