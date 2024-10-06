import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'


const FormField = ({title, value, handleChangeText, ...props }) => {
const [showPassword, setShowPassword] = useState(false)
    return(

            <View>
                <Text>{title}</Text>
                <View>
                    <TextInput value={value} onChangeText={handleChangeText} secureTextEntry = {title === "Password" && !showPassword} />
                    {
                     title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    </TouchableOpacity>
                     )
                     }
                </View>
            </View>


    )
}

export default FormField