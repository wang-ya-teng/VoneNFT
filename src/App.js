import './App.scss';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import store from 'Store/index';
import NavBar from 'Components/NavBar';
import IconLoading from 'Components/IconLoading';
import StatusActivity from 'Components/StatusActivity';
import Notification from 'Components/Notification';
import { setAvailableSellOrder } from 'Store/actions';
import CreateERC721 from 'Views/Create/ERC721';

const Create = lazy(() => import('Views/Create'));
const Market = lazy(() => import('Views/Market'));
const Profile = lazy(() => import('Views/Profile'));
const EditProfile = lazy(() => import('Views/Profile/edit'));
const Login = lazy(() => import('Views/Login'));
const Collection = lazy(() => import('Views/Collection'));
const CreateCollection = lazy(() => import('Views/Collection/create'));
const CollectionStandard = lazy(() => import('Views/Collection/standard'));
const EditCollection = lazy(() => import('Views/Collection/edit'));
const CollectionDetail = lazy(() => import('Views/Collection/detail'));
const DetailNFT = lazy(() => import('Views/DetailNFT'));

function App() {
  useEffect(() => {
    async function fetchDataInit() {
      // const selectedMode = localStorage.getItem('theme')
      // if (selectedMode !== null) 
      document.querySelector("html").setAttribute('data-theme', 'light');
      await store.dispatch(setAvailableSellOrder());
    }
    fetchDataInit();
  }, []);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <HashRouter>
        <div className='page content'>
          <Notification />
          <StatusActivity />
          <NavBar />
          <Suspense
            fallback={
              <div className='center background-mode' style={{ height: '90vh' }}>
                <IconLoading />
              </div>
            }
          >
            <div style={{ height: '100%', background: '#fff' }}>
              <Switch>
                <Route exact path='/' component={Market} />
                <Route exact path='/market' component={Market} />
                <Route exact path='/profile/index/:chainID/:address' component={Profile} />
                <Route exact path='/profile/edit' component={EditProfile} />
                <Route exact path='/create' component={Create} />
                <Route exact path='/create/erc721' component={CreateERC721} />
                <Route exact path='/token/:chainID/:addressToken/:id/:sellID' component={DetailNFT} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/collection/index/:address' component={Collection} />
                <Route exact path='/collection/standard' component={CollectionStandard} />
                <Route exact path='/collection/create/:standard' component={CreateCollection} />
                <Route exact path='/collection/edit/:collectionAddress' component={EditCollection} />
                <Route exact path='/collection/detail/:collectionAddress/:address' component={CollectionDetail} />
              </Switch>
            </div>
          </Suspense>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
