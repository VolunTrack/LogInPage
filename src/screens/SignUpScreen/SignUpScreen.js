import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/Custominput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify'; 

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = () => {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch('password');
    const navigation = useNavigation ();
    const [loading, setLoading] = useState(false);
    

    const onRegisterPressed = async data => {
        if (loading) {
            return;
        }

        setLoading(true);

        const {username, password, email, name} = data;
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {email, name, preferred_username: username},
            });
            navigation.navigate('ConfirmEmail', {username});
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    const onTermOfUserPressed = () => {
        console.warn('onTermOfUserPressed');
    };

    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed');
    };
 
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}> Create an account </Text>

                <CustomInput 
                    name="name"
                    control={control}
                    placeholder="Name" 
                    rules={{
                        required: 'Name is required', 
                        minLength: {
                            value: 3, 
                            message: 'Name should be least 3 characters long'
                        },
                        maxLength: {
                            value: 24, 
                            message: 'Name should be max 24 character long'
                        },
                    }}
                />

                <CustomInput 
                    name="username"
                    control={control}
                    placeholder="Username" 
                    rules={{
                        required: 'Username is required', 
                        minLength: {
                            value: 3, 
                            message: 'Username should be least 3 characters long'
                        },
                        maxLength: {
                            value: 24, 
                            message: 'Username should be max 24 character long'
                        },
                    }}
                />

                <CustomInput
                    name="email"
                    control={control}
                    placeholder="Email" 
                    rules={{pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
                />

                <CustomInput 
                    name="password"
                    control={control}
                    placeholder="Password" 
                    secureTextEntry={true}
                    rules={{
                        required: 'Password is required', 
                        minLength: {
                            value: 8, 
                            message: 'Password should be least 8 characters long'
                        },
                        maxLength: {
                            value: 24, 
                            message: 'Password should be max 24 character long'
                        },
                    }}
                />

                <CustomInput
                    name="password-repeat"
                    control={control} 
                    placeholder="Repeat Password" 
                    secureTextEntry={true}
                    rules={{
                        validate: value => 
                            value === pwd || 'Password do not match',
                    }}
                />

                <CustomButton text={loading ? "Loading..." : "Register"} onPress={handleSubmit(onRegisterPressed)} />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our
                    <Text style={styles.link} onPress={onTermOfUserPressed}> Terms of Use</Text> and
                    <Text style={styles.link} onPress={onPrivacyPressed}> Privacy Policy</Text>
                </Text>

                

                <CustomButton 
                    text="Have an account? Sign in" 
                    onPress={onSignInPressed} 
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
    
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text:{
        color: 'gray',
        marginVertical: 10,
    },

    link:{
        color: '#FDB075',
    },

});

export default SignUpScreen