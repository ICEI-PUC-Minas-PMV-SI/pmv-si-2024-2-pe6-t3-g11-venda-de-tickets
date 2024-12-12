import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';

export default function EventDetails() {
    const router = useRouter();
    const { idEvento } = useSearchParams();
    const [eventData, setEventData] = useState<any>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/evento/id/${idEvento}`);
                const data = await response.json();
                setEventData(data.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setEventData(null);
            }
        };

        fetchEventDetails();
    }, [idEvento]);

    if (!eventData) {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.error}>Event details not available.</Text>
            </ScrollView>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>{eventData.nomeEvento}</Text>
            <Text style={styles.detail}>Status: {eventData.statusEvento}</Text>
            <Text style={styles.detail}>Data: {eventData.dataEvento}</Text>
            <Text style={styles.detail}>Hora: {eventData.horaEvento}</Text>
            <Text style={styles.detail}>Lotação Máxima: {eventData.lotacaoMaxima}</Text>
            <Text style={styles.detail}>Classificação Etária: {eventData.classificacaoIdade}</Text>
            {eventData.endereco && (
                <Text style={styles.detail}>
                    Endereço: {eventData.endereco.tipoLogradouro} {eventData.endereco.nomeLogradouro},{' '}
                    {eventData.endereco.numero}, {eventData.endereco.bairro}, {eventData.endereco.cidade} -{' '}
                    {eventData.endereco.uf}
                </Text>
            )}
            <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    detail: {
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
});
