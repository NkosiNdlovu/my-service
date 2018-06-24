import { HomePage } from './home/home';
import { ListMasterPage } from './list-master/list-master';
import { SearchPage } from './search/search';
import { UserViewPage } from './user-view/user-view';
import { RequestServicePage } from './request-service/request-service';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = HomePage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage =  HomePage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = ListMasterPage;
export const Tab2Root = SearchPage;
export const Tab3Root = UserViewPage;
