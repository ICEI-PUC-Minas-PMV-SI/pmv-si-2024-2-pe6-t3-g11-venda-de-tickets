import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AddTickets() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const existingEventData = typeof params.eventData === 'string' ? JSON.parse(params.eventData) : {};

    const [ticket, setTicket] = useState({
        lote: '',
        qtdLote: '',
        valorTicket: '',
        valorMeiaTicket: '',
        tipoTicket: '',
        statusTicket: 'disponível',
    });

    const handleInputChange = (name: string, value: string) => {
        setTicket((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveTicket = () => {
        const updatedEventData = {
            ...existingEventData,
            tickets: [...(existingEventData.tickets || []), ticket],
        };

        router.push({
            pathname: '/create-event',
            params: { eventData: JSON.stringify(updatedEventData) },
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Adicionar Ingressos</Text>

            <TextInput
                style={styles.input}
                placeholder="Lote"
                keyboardType="numeric"
                value={ticket.lote}
                onChangeText={(text) => handleInputChange('lote', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                keyboardType="numeric"
                value={ticket.qtdLote}
                onChangeText={(text) => handleInputChange('qtdLote', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor do Ticket"
                keyboardType="numeric"
                value={ticket.valorTicket}
                onChangeText={(text) => handleInputChange('valorTicket', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor Meia Entrada"
                keyboardType="numeric"
                value={ticket.valorMeiaTicket}
                onChangeText={(text) => handleInputChange('valorMeiaTicket', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de Ticket"
                value={ticket.tipoTicket}
                onChangeText={(text) => handleInputChange('tipoTicket', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Status do Ticket"
                value={ticket.statusTicket}
                editable={false} // Fixed to 'disponível'
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveTicket}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f8f9fa' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
    saveButton: { backgroundColor: '#28a745', borderRadius: 8, padding: 12, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
