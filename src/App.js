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
import About from './components/About';
import DeviceMessages from './components/DeviceMessages';


const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Row>
          <Menu />
        </Row>
        <Row style={{marginTop: '5rem'}}>
          <Col xs="1" />
          <Col md="2">
            <Devices />
          </Col>
          <Col lg="8">
            <Content>
              <Switch>

                <Route path="/about" component={About} />
                <Route path="/device/:id" component={Device} />
                <Route path="/" component={Title} />
              </Switch>
            </Content>
          </Col>
          <Col xs="1" />
        </Row>
      </Router>
    </div>
  );
}

export default App;
