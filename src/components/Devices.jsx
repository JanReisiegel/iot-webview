import axios from 'axios';
import { useEffect, useState} from 'react';
import { API, GroupId, GroupToken } from '../configuration/API';
import {TraceSpinner} from 'react-spinners-kit';
import {Alert, Card, Nav, NavItem, } from "reactstrap";
import {Link, NavLink} from "react-router-dom";

const Devices = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [devices, setDevices] = useState([]);
    const fetchData = () => {
        setIsLoading(true);
        setError(false);
        axios.get(API + "devices?group_id=" + GroupId, {
            headers: {
                "Authorization" : `Bearer ${GroupToken}`
            }
        })
        .then(response=>{
            setDevices(response.data);
            setError(false);
        })
        .catch(error=>{
            setError(true);
        })
        .then(()=>{
            setIsLoading(false);
        });
    }
    useEffect(()=>{
        fetchData();
    }, []);

    if (isLoading){
        return <TraceSpinner frontColor="#0012c7" />
    }
    else if (error){
        return <Alert color="danger" >Vyskytla se chyba</Alert>
    }
    else if (devices){
        return(
            <Card>
                <h4>Zařízení</h4>
                <Nav vertical color="primary">
                    {
                        devices.map((item) => (
                            <NavItem>
                                <NavLink tag={Link} to={"/device" + item.id}>
                                    {item.name}
                                </NavLink>
                            </NavItem>
                        ))
                    }
                </Nav>
            </Card>
        );
    }
    else{
        return <TraceSpinner frontColor="#0012c7" />
    }
}

export default Devices;