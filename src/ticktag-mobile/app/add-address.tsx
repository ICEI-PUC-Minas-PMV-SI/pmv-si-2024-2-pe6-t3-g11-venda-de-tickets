import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AddAddress() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const existingEventData = typeof params.eventData === 'string' ? JSON.parse(params.eventData) : {};

    const [addressData, setAddressData] = useState<{
        tipoLogradouro: string;
        nomeLogradouro: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        uf: string;
        nomeEspaco: string;
    }>(existingEventData.endereco || {
        tipoLogradouro: '',
        nomeLogradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        nomeEspaco: '',
    });

    const handleInputChange = (name: string, value: string) => {
        setAddressData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveAddress = () => {
        const updatedEventData = {
            ...existingEventData,
            endereco: addressData,
        };

        router.push({
            pathname: '/create-event',
            params: { eventData: JSON.stringify(updatedEventData) },
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Adicionar Endereço</Text>
            <TextInput
                style={styles.input}
                placeholder="Tipo de Logradouro"
                value={addressData.tipoLogradouro}
                onChangeText={(text) => handleInputChange('tipoLogradouro', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome do Logradouro"
                value={addressData.nomeLogradouro}
                onChangeText={(text) => handleInputChange('nomeLogradouro', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Número"
                keyboardType="numeric"
                value={addressData.numero}
                onChangeText={(text) => handleInputChange('numero', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Complemento"
                value={addressData.complemento}
                onChangeText={(text) => handleInputChange('complemento', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Bairro"
                value={addressData.bairro}
                onChangeText={(text) => handleInputChange('bairro', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Cidade"
                value={addressData.cidade}
                onChangeText={(text) => handleInputChange('cidade', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="UF (Estado)"
                value={addressData.uf}
                onChangeText={(text) => handleInputChange('uf', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome do Espaço"
                value={addressData.nomeEspaco}
                onChangeText={(text) => handleInputChange('nomeEspaco', text)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f8f9fa' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
    saveButton: { backgroundColor: '#007bff', borderRadius: 8, padding: 12, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
