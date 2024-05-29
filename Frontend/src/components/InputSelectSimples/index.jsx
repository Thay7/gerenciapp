import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';
import { formatterbrl } from '../../utils/formatterbrl';

export const InputSelectSimples = ({ title, selectedValue, onValueChange, options, editable }) => {
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
                    enabled={editable}
                >
                    <Picker.Item
                        label="Selecione"
                        enabled={false}
                        style={{color: 'gray'}}
                    />
                    {options.length === 0
                        ? (
                            <Picker.Item
                                label="Nenhum item disponível"
                                enabled={false}
                                style={styles.labelPicker}
                            />
                        )
                        :
                        (
                            options.map((item, index) => (
                                <Picker.Item
                                    key={index}
                                    label={item.nome_fantasia != null ? item.nome_fantasia : item}
                                    value={item}
                                    style={!editable ? {color: 'gray'} : {}}
                                />
                            ))
                        )
                    }
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
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
    },
    labelSeparator: {
        color: '#4040ff'
    }
})
