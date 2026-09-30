import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
export default function InputPills() {
    const [text, setText] = useState("");
    const [items, setItems] = useState<string[]>([]);

    const addItems = () => {
        setItems([...items, text.trim()]);
        setText("");
    }

    return(

        <View>
            <View style={s.root}>     
                <TextInput style={s.input} placeholder="Skriv något" onChangeText={setText} onSubmitEditing={addItems} returnKeyType="done" />  
                
                    <Button title="Spara" onPress={addItems}></Button>
                
                
            </View>
            <View>
                {items.map((item, index) => (
                    <View key={index} style={s.pill}>
                        <Text>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    root: {
        display:"flex",
        alignItems:"center"
    },
    input: {
        backgroundColor:"#E7E2EF",
        width:"90%",
        borderRadius:14
    },
    pill: {
        borderRadius: 30,
        backgroundColor: "#AAA0C8"
    }
})