import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import {TraceSpinner} from 'react-spinners-kit';
import { API, GroupToken } from '../configuration/API';
import { Alert, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const Device = () => {
    const {id, mid} = useParams();
    const [deviceData, setDeviceData] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(null);
    const fetchData = () => {
        setIsloading(true);
        setError(false);
        axios.get(API + "messages?device_id=" + id + "&limit=1&offset=0&sort_field=created_at&sort_order=desc", {
            headers: {
                "Authorization": `Bearer ${GroupToken}`
            }
        })
        .then(response =>{
            if (response.data){
                setDeviceData(response.data);
                
            }
            else{
                setDeviceData(null);
                //console.log(deviceData);
                setError(false);
            }
            
        })
        .catch(error=>{
            setError(true);
        })
        .then(()=>{
            setIsloading(false);
        })
    }
    useEffect(()=>{
        fetchData();
        //console.log(deviceData)
    }, [id, mid]);
    console.log(deviceData);
    if (isLoading){
        return <TraceSpinner frontColor="#0012c7" />
    }
    else if (error){
        if(error.response){
            return (
                <Alert color="danger" >Program skončil s chybou: ({error.response.status}).</Alert>
            )
        }
        else{
            return (
                <Alert color="danger">Žádná zpráva nenalezena.</Alert>
            )
        }
    }
    else if (deviceData) {
        return (
            deviceData.map((item)=>(
                    <Card >
                    <CardTitle tag="h2">
                        {item.name}
                    </CardTitle>
                    <CardTitle tag="p">{item.created_at}</CardTitle>
                    <CardBody>

                        <CardText>Teplota 1: {item.data.sensor.hygrometer.temperature}</CardText>
                        <CardText>Vlhkost 1: {item.data.sensor.hygrometer.humidity}</CardText>
                        <CardTitle tag="h3">MachineProbe</CardTitle>
                        <CardText>Teplota 2: {(item.data.sensor.external.machine_probe)[0].hygrometer.temperature}</CardText>
                        <CardText>Vlhkost 2: {(item.data.sensor.external.machine_probe)[0].hygrometer.humidity}</CardText>
                        <CardText>Světelnost: {(item.data.sensor.external.machine_probe)[0].lux_meter.illuminance}</CardText>
                    </CardBody>
                </Card>
            ))
            
        )
    }
    else {
        return (
            <Alert color="info">Žádné zprávy.</Alert>
        )
    }
}
export default Device;