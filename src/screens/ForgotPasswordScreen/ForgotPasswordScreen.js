import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/Custominput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify'; 

const ForgotPasswordScreen = () => {
    const {control, handleSubmit} = useForm();
    
    const navigation = useNavigation ();
    const [loading, setLoading] = useState(false);

    const onSendPressed = async data => {

        if (loading) {
            return;
        }

        setLoading(true);

        try {
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword');
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
       
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    
 
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>

                <CustomInput
                    name="username" 
                    control={control}
                    placeholder="Username" 
                    rules={{
                        required: 'Username is required'
                    }}
                />

                <CustomButton text={loading ? "Loading..." : "Send"} onPress={handleSubmit(onSendPressed)} />

                <CustomButton 
                    text="Back to Sign in" 
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

export default ForgotPasswordScreen;