import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CreateEvent() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [eventData, setEventData] = useState<{
        nomeEvento: string;
        statusEvento: string;
        dataEvento: string;
        horaEvento: string;
        lotacaoMaxima: string;
        classificacaoIdade: string;
        endereco: any | null;
        tickets: Array<any>;
    }>({
        nomeEvento: '',
        statusEvento: '',
        dataEvento: '',
        horaEvento: '',
        lotacaoMaxima: '',
        classificacaoIdade: '',
        endereco: null,
        tickets: [],
    });

    useEffect(() => {
        if (typeof params.eventData === 'string') {
            try {
                const parsedData = JSON.parse(params.eventData);
                setEventData((prev) => ({ ...prev, ...parsedData }));
            } catch (error) {
                console.error("Error parsing event data from params:", error);
            }
        }
    }, [params]);

    const handleInputChange = (name: string, value: string) => {
        setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log('Evento salvo:', eventData);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Criar Evento</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Evento"
                value={eventData.nomeEvento}
                onChangeText={(text) => handleInputChange('nomeEvento', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Data do Evento (yyyy-MM-dd)"
                value={eventData.dataEvento}
                onChangeText={(text) => handleInputChange('dataEvento', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Hora do Evento (HH:mm)"
                value={eventData.horaEvento}
                onChangeText={(text) => handleInputChange('horaEvento', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Lotação Máxima"
                keyboardType="numeric"
                value={eventData.lotacaoMaxima}
                onChangeText={(text) => handleInputChange('lotacaoMaxima', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Classificação Etária"
                keyboardType="numeric"
                value={eventData.classificacaoIdade}
                onChangeText={(text) => handleInputChange('classificacaoIdade', text)}
            />

            {eventData.endereco && (
                <View style={styles.previewContainer}>
                    <Text style={styles.previewText}>
                        <Text style={styles.label}>Endereço:</Text> {eventData.endereco.tipoLogradouro}{' '}
                        {eventData.endereco.nomeLogradouro}, {eventData.endereco.numero},{' '}
                        {eventData.endereco.bairro}, {eventData.endereco.cidade} - {eventData.endereco.uf}
                    </Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() =>
                    router.push({
                        pathname: '/add-address',
                        params: { eventData: JSON.stringify(eventData) },
                    })
                }
            >
                <Text style={styles.secondaryButtonText}>Adicionar Endereço</Text>
            </TouchableOpacity>

            {eventData.tickets.length > 0 && (
                <View style={styles.previewContainer}>
                    {eventData.tickets.map((ticket, index) => (
                        <Text key={index} style={styles.previewText}>
                            <Text style={styles.label}>Ingresso {index + 1}:</Text> Lote {ticket.lote}, {ticket.qtdLote}{' '}
                            unidades, R${ticket.valorTicket}
                        </Text>
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() =>
                    router.push({
                        pathname: '/add-tickets',
                        params: { eventData: JSON.stringify(eventData) },
                    })
                }
            >
                <Text style={styles.secondaryButtonText}>Adicionar Ingressos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                <Text style={styles.submitButtonText}>Salvar Evento</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f8f9fa' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
    previewContainer: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 16 },
    previewText: { fontSize: 14, marginBottom: 8 },
    label: { fontWeight: 'bold' },
    secondaryButton: { backgroundColor: '#6c757d', borderRadius: 8, padding: 12, alignItems: 'center', marginBottom: 16 },
    secondaryButtonText: { color: '#fff', fontWeight: 'bold' },
    submitButton: { backgroundColor: '#007bff', borderRadius: 8, padding: 12, alignItems: 'center' },
    submitButtonText: { color: '#fff', fontWeight: 'bold' },
});
