import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/Custominput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import {Auth} from 'aws-amplify'; 

const ConfirmEmailScreen = () => {
    const route = useRoute();
    const {control, handleSubmit, watch} = useForm({
        defaultValues: {username: route?.params?.username},
    });
    
    const username = watch('username');

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const onConfirmPressed = async data => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
          await Auth.confirmSignUp(data.username, data.code);
          navigation.navigate('SignIn');
        } catch (e) {
          Alert.alert('Oops', e.message);
        }

        setLoading(false);
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    const onResendPressed = async () => {
        try {
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Code was resent to your email');
          } catch (e) {
            Alert.alert('Oops', e.message);
          }
    };

    
 
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your Email</Text>

                <CustomInput
                    name="username"
                    control={control} 
                    placeholder="Username" 
                    rules={{
                        required: 'Username code is required',
                    }}
                />

                <CustomInput
                    name="code"
                    control={control} 
                    placeholder="Enter your confirmation code" 
                    rules={{
                        required: 'Confirmation code is required',
                    }}
                />

                <CustomButton text={loading ? "Loading..." : "Confirm"} onPress={handleSubmit(onConfirmPressed)} />

                <CustomButton 
                    text="Resend code" 
                    onPress={onResendPressed} 
                    type="SECONDARY"
                />

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

export default ConfirmEmailScreen;