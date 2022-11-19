import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, Alert} from 'react-native';
import Logo from '../../../assets/images/Logo2.png';
import CustomInput from '../../components/Custominput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import{useForm, Controller} from 'react-hook-form';
import { Auth } from 'aws-amplify';


const SigninScreen = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation ();
    const [loading, setLoading] = useState(false);

    const {control, handleSubmit, formState:{errors}} = useForm();
    

    const onSignInPressed = async data => {
        if (loading) {
            return;
        }

        setLoading(true);

        try{
            const response = await Auth.signIn(data.username, data.password);
            console.log(response);
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
    };

    const onForgotpasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.3}]} 
                    resizeMode="contain" 
                />

                <CustomInput 
                    name="username"
                    placeholder="Username" 
                    control={control}
                    rules={{required: 'Username is required'}}
                />
                <CustomInput 
                    name="password"
                    placeholder="Password" 
                    control={control}
                    secureTextEntry={true}
                    rules={{
                        required: 'Password is required', 
                        minLength: {
                            value: 8, 
                            message: 'Password should be minimum 8 character long',
                        }
                    }}
                /> 

                <CustomButton 
                    text={loading ? "Loading..." : "Sign In"} 
                    onPress={handleSubmit(onSignInPressed)} 
                />

                <CustomButton 
                    text="Forgot password?" 
                    onPress={onForgotpasswordPressed} 
                    type="TERTIARY"
                />

                

                <CustomButton 
                    text="Don't have an account? Create one" 
                    onPress={onSignUpPressed} 
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxHeight: 300,
        maxHeight: 200,
    },
});

export default SigninScreen