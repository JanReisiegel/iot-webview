import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import {TraceSpinner} from 'react-spinners-kit';
import { API, GroupToken } from '../configuration/API';
import { Alert, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const Device = () => {
    const {id} = useParams();
    const [deviceData, setDeviceData] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(false);
    const [device, setDevice] = useState([]);
    const fetchData = () => {
        setIsloading(true);
        setError(false);
        axios.get(API + "device/" + id,{
            headers: {
            "Authorization": `Bearer ${GroupToken}`
            }
        })
        .then(response=>{
            setDevice(response.data)
            console.log(device);
        })
        axios.get(API + "messages?device_id=" + id + "&sort_field=created_at&sort_order=desc", {
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
        console.log(deviceData)
    }, [id]);
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
            <p>ahoj</p>
        )
    }
    else {
        return (
            <Alert color="info">Žádné zprávy.</Alert>
        )
    }
}
export default Device;