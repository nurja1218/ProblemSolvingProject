import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Page4m3w from 'pages/Page4m3w';
import Page4m4w from 'pages/Page4m4w';
import Main from 'pages/Main';
import './App.css';
import Page5m2w from 'pages/Page5m2w';

function App() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/4m3w" component={Page4m3w} />
                <Route exact path="/4m4w" component={Page4m4w} />
                <Route exact path="/5m2w" component={Page5m2w} />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
