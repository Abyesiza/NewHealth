import {View, Text, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from './form'

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    return(
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text> Log in to HealthApp</Text>

                    <FormField title="Email" value = {form.email} handleChangeText = {(e) =>
                     setForm({ ...form,email: e} 
                    )} keyboardType="email-adress"
                    />

                    <FormField title="Password" value = {form.password} handleChangeText = {(e) =>
                     setForm({ ...form,password: e} 
                    )} 
                    />                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn