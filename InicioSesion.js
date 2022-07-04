import React, { useState } from "react";
import { Text, View } from 'react-native';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import Login from './Login';
import { Input, Button, Card  } from "@rneui/base"


export default function InicioSesion(){
    const [usuario, setusuario] = useState("");
    const [password, setpassword] = useState("");
    const [er, setEr] = useState(false);
    const [exito, setExito] = useState(false);
    const auth = getAuth();
    const navigation = useNavigation();

    const registrar = function () {
        console.log(password);
        console.log(usuario);
        console.log("Registar");
        createUserWithEmailAndPassword(auth, usuario, password)
        .then(userCredential => {
            console.log(userCredential);
            const user = userCredential.user;
            if(user){
                console.log('Usuario creado');
                setExito(true);
                navigation.navigate('Login')
            }
        }).catch ( e => {
            console.log(e);
            setEr(true);
        })
        ;
    }
    return (
        <Card containerStyle={{flex: 1, padding:24, flex: 1, justifyContent: 'center', backgroundColor: '#C3DADA', borderColor: 'black'}}>
            <Card.Title>Registrarse</Card.Title>
                <Card.Divider />
                    <View style={{ flex: 1, padding:24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {exito ? <Text>Usuario creado correctamente</Text> : <Text>Correo</Text>}
                        {exito ? <Text></Text> : <Input  onChange={(e) => setusuario(e.nativeEvent.target.value)}  type={Text}></Input> }
                        <br></br>
                        <br></br>
                        {exito ? <Text></Text> : <Text>Contraseña</Text>}
                        {exito ? <Text></Text> : <Input onChange={(e) => setpassword(e.nativeEvent.target.value)} type={Text}></Input>}
                        <br></br>
                        {exito ? null : <Button title="OK" type="outline" onPress={() => registrar()}></Button>}
                        {er ? <Text>Hubo un error!</Text> : <Text></Text>}
                    </View>
        </Card>
    )
}