//Use for navigation between pages and render
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const HashRouter = ReactRouterDOM.HashRouter;
const BrowserRouter = ReactRouterDOM.BrowserRouter;
const NavLink = ReactRouterDOM.NavLink;
const Switch = ReactRouterDOM.Switch;

const e = React.createElement;
const audioDir = 'React-Bandlab-Test/audio/';
const urls = [`${audioDir}new-wave-kit.ogg`,`${audioDir}synth-organ.ogg`];

const Navigation = () => (
    <nav class='navbar'>
      <ul>
        <li><NavLink exact activeClassName="current" to='/posts'>Posts</NavLink></li>
        <li><NavLink exact activeClassName="current" to='/samples'>Samples</NavLink></li>
      </ul>
    </nav>
);

const Main = () => (
    <Switch>
      <Route exact path='/posts' component={Home}></Route>
      <Route exact path='/samples' component={Samples}></Route>
    </Switch>
  );

const Home = () => (
<div className='home'>
    <List />
</div>
);

const Samples = () => (
<div className='samples'>
    <AudioList list={urls} />
</div>
);

ReactDOM.render((
    <BrowserRouter>
        <Navigation />
        <Main />
    </BrowserRouter>
    ), document.getElementById('root'));
    