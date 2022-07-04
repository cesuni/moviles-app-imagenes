import React, { useState } from "react";
import { Text, View } from "react-native";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Fragment } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Card } from "@rneui/base";


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);
    const [ocultar, setOcultar] = useState(false);
    const [e, setE] = useState(false);
    const auth = getAuth();
    const navigation = useNavigation();

    const loggearse = function () {
        console.log(password);
        console.log(email);
        console.log("Inicio Sesion");
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log("Signed in");
            const user = userCredential.user;
            console.log(userCredential);
            setE(false);
            //navigation.navigate('Subir');
            //Si el usuario esta logueado mandar a llamar el state
            if(user){
                setLogged(true);
                setOcultar(true);
            }
            setE(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setE(true);
            setOcultar(false);
        });
        
    }



    const cerrarSesion = function() {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('El usuario cerro sesion correctamente.');
            setLogged(false);
            setE(false);
          }).catch((error) => {
            // An error happened.
            setE(true);
          });
    }
    return (
        <Card containerStyle={{flex: 1, padding:24, flex: 1, justifyContent: 'center', borderColor: 'black', backgroundColor: '#C3DADA'}}>
            <Card.Title>Inicio Sesion</Card.Title>
            <Card.Divider />
                <View style={{ flex: 1, padding:24, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {logged ? <Text type="title">Bienvenido!</Text>: <Text></Text>}

                    {ocultar ? null : <Text>Correo</Text> }
                    {ocultar ? null : <Input  onChange={(e) => setEmail(e.nativeEvent.target.value)} type={Text}></Input>}
                    <br></br>

                    <br></br>
                    {ocultar ? null : <Text>Contraseña</Text>}
                    {ocultar ? null : <Input onChange={(e) => setPassword(e.nativeEvent.target.value)} type='password'></Input>}
                    <br></br>
                    
                    {logged ? <Button color="red" title="Cerrar Sesion" onPress={() => cerrarSesion()}></Button>  : <Button title="Iniciar Sesion" type="outline" onPress={() => loggearse()}></Button>}
                    {e ?<Text>Hubo un error!</Text> : <Text></Text>}
                </View>
        </Card>
    )
}
