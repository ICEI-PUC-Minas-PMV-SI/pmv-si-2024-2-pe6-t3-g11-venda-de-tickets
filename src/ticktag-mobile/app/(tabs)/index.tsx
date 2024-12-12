import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import Home from '../home/home';
import LoginScreen from "@/app/login";

export default function HomeScreen() {
    const router = useRouter();

    return (
        // <View style={styles.container}>
        //     <TouchableOpacity style={styles.button} onPress={() => router.push('/create-event')}>
        //         <Text style={styles.buttonText}>Create Event</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.button} onPress={() => router.push('/event-details')}>
        //         <Text style={styles.buttonText}>View Event</Text>
        //     </TouchableOpacity>
        //     {/* Botões de navegação para Política e Contato */}
        //     <TouchableOpacity style={styles.button} onPress={() => router.push('/politica')}>
        //         <Text style={styles.buttonText}>Política</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity style={styles.button} onPress={() => router.push('/contato')}>
        //         <Text style={styles.buttonText}>Contato</Text>
        //     </TouchableOpacity>
        // </View>

        <LoginScreen></LoginScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        gap: 16,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase', // Garantindo que o texto seja maiúsculo
    },
});
