import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native';
import { formatterbrl } from '../../utils/formatterbrl';

export const InputSelectItens = ({ title, selectedValue, onValueChange, options, venda, pedidoCompra }) => {

    // Ordenar os dados antes de renderizar
    const sortedOptions = [...options].sort((a, b) => {
        if (a.tipo === "Produto" && b.tipo === "Serviço") {
            return -1; // Coloca 'a' antes de 'b'
        } else if (a.tipo === "Serviço" && b.tipo === "Produto") {
            return 1; // Coloca 'a' depois de 'b'
        } else {
            return a.nome.localeCompare(b.nome); // Ordena por nome se os tipos forem iguais
        }
    });

    // Adicionar rótulos de separador de produto e serviço
    const optionsWithSeparators = [];
    let currentType = null;
    sortedOptions.forEach(item => {
        if (item.tipo !== currentType) {
            currentType = item.tipo;
            optionsWithSeparators.push({ id: `${currentType}-separator`, nome: `${currentType}s`, tipo: "Label" });
        }
        optionsWithSeparators.push(item);
    });

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
                    enabled={sortedOptions.length === 0 ? false : true}
                >
                    {optionsWithSeparators.length === 0
                        ? (
                            <Picker.Item
                                label="Nenhum item disponível"
                                enabled={false}
                                style={styles.labelPicker}
                            />
                        )
                        :
                        (
                            optionsWithSeparators.map((item, index) => (
                                <Picker.Item
                                    key={index}
                                    label={item.tipo === "Label" ? item.nome : `${item.nome} - ${ venda ? formatterbrl(item.valor_venda) : formatterbrl(item.valor_compra)}`}
                                    value={item}
                                    style={item.tipo === "Label" ? styles.labelSeparator : styles.labelPicker}
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
