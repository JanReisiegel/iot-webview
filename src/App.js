import './App.css';
import {Router} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';
import Menu from './components/Menu';
import Content from './components/Content';
import Title from './components/Title';
import Device from './components/Device';
import Devices from './components/Devices';
import { Col, Row } from 'reactstrap';


const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Row>
          <Menu />
        </Row>
        <Row>
          <Col>
            <Devices />
          </Col>
          <Col>
            <Content>
              <Switch>
                <Route path="/" component={Title} />
                <Route path="/device/:id" component={Device} />
              </Switch>
            </Content>
          </Col>
        </Row>
      </Router>
    </div>
  );
}

export default App;
