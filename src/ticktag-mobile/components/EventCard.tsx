import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import React from "react";

export default function EventCard({item, favorites, onEventClick, onFavoriteClick}: {item: any, favorites: any[], onEventClick: any, onFavoriteClick: any}) {

    const isFavorite = favorites.find((favorite:any) => favorite.id === item.id);
    const formatedDate = new Date(item.dataEvento).toLocaleDateString('pt-BR');

    return (
        <View style={styles.card}>
            <Image source={{ uri: `data:image/png;base64, ${item.capaEvento}`  }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nomeEvento}</Text>
                <Text style={styles.description}>Status: {item.statusEvento}</Text>
                <Text style={styles.description}>Lotação Máxima: {item.lotacaoMaxima}</Text>
                <Text style={styles.description}>Classificação Etária: {item.classificacaoIdade}</Text>
                <Text style={styles.date}>{formatedDate}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => onEventClick(item)}>
                        <Text style={styles.buttonText}>Mais detalhes</Text>
                    </TouchableOpacity>
                    <FontAwesome name="heart" size={24} color={isFavorite ? "red":"gray"} onPress={() => onFavoriteClick(item)} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5a5a5a',
        marginBottom: 16,
    },
    card: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: '#eeeded',
        padding: 16,
    },
    button: {
        backgroundColor: '#007be1',
        paddingVertical: 8,
        marginBottom: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardContent: {
        padding: 16,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        fontWeight: '600',
        color: '#5a5a5a',
        marginTop: 16,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 150,
    },
});

