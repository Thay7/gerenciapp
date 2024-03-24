import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';
import { formatterbrl } from '../../utils/formatterbrl';

export const InputSelectProductsEstoque = ({ title, selectedValue, onValueChange, options }) => {
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
                    enabled={options.length === 0 ? false : true}
                >
                    <Picker.Item
                        label="Selecione o item"
                        enabled={false}
                        style={{color: '#ccc'}}
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
                                    label={`${item.nome} - Valor compra: ${formatterbrl(item.valor_compra)}`}
                                    value={item}
                                    style={styles.labelPicker}
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20
    },
    labelSeparator: {
        color: '#4040ff'
    }
})
