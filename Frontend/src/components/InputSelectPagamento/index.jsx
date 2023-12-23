import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';
import { formatterbrl } from '../../utils/formatterbrl';

export const InputSelectPagamento = ({ title, selectedValue, onValueChange, options, enable }) => {
    if (!enable)
        color = 'grey'
    else
        color = '';

    const inputStyles = {
        ...styles.textColor,
        color,
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>
                    {title} *
                </Text>
            </View>
            <View style={styles.input}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    enabled={enable != null ? enable : options.length === 0 ? false : true}
                >
                    <Picker.Item
                        label="Selecione"
                        enabled={false}
                        style={inputStyles}
                    />
                    {options.length === 0
                        ? (
                            <Picker.Item
                                label="Nenhum item disponível"
                                enabled={false}
                            />
                        )
                        :
                        (
                            options.map((item, index) => (
                                <Picker.Item
                                    key={index}
                                    label={item}
                                    value={item}
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
        fontSize: 15,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20
    }
})
