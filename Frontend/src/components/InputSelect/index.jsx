import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';

export const InputSelect = ({ title, selectedValue, onValueChange, options }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>
                    {title}
                </Text>
            </View>
            <View style={styles.input}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                >
                    {options.map((item, index) => (
                        options.length === 0
                            ? (

                                <Picker.Item
                                    label="Nenhum produto disponível"
                                    enabled={false}
                                />

                            )
                            : (

                                <Picker.Item
                                    key={index}
                                    label={item.produto_nome}
                                    value={item.produto_nome}
                                />
                            )
                    ))}
                </Picker >
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    text: {
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
    }
})
