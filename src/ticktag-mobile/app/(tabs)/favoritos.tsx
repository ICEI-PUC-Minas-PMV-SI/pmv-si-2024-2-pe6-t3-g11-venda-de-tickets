import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, SafeAreaView, Text} from 'react-native';
import {useNavigation, useRouter} from 'expo-router';
import {ThemedText} from "@/components/ThemedText";
import EventCard from "@/components/EventCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoriteScreen() {
    const navigation = useNavigation();

    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // State to show loading indicator
    const [error, setError] = useState(null); // State to handle errors
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadFavorites();
        });
        return unsubscribe;
    }, [navigation]);


    const loadFavorites = async () => {
        const storedFavorites = await AsyncStorage.getItem('favoritos');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    };
    const removeFromFavorites = async (item: any) => {
        const storedFavorites = await AsyncStorage.getItem('favoritos');
        if(!storedFavorites) {
            await AsyncStorage.setItem('favoritos', JSON.stringify([]));
        }
        setFavorites(favorites.filter(favorite => favorite.id !== item.id));
        await AsyncStorage.setItem('favoritos', JSON.stringify(favorites.filter(favorite => favorite.id !== item.id)));
    };

    const renderEventCard = ({ item }) => {
        return (
            <EventCard
                item={item}
                favorites={favorites}
                onEventClick={() => router.push(`/event-details/${item.id}`)}
                onFavoriteClick={() => removeFromFavorites(item)}
            />
        )
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Colored top section */}
            <View style={{ height: 50, backgroundColor: '#007be1' }} />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <ThemedText style={styles.title}>Favoritos</ThemedText>
                </View>
                {favorites?.length > 0 ?
                    (
                        <FlatList
                            data={favorites}
                            renderItem={renderEventCard}
                            keyExtractor={(item) => item.id}
                            style={styles.eventList}
                        />
                    )
                    : (
                        <Text style={styles.noEvents}>Não há eventos nos favoritos</Text>
                    )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        padding: 16,
        backgroundColor: '#007be1',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    filterIcon: {
        color: '#ffffff',
    },
    noEvents: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5a5a5a',
        padding: 16,
        alignSelf: 'center',
    },
    resultsText: {
        padding: 16,
        fontSize: 16,
        color: '#5a5a5a',
    },
    eventList: {
        flex: 1,
        marginBottom: 45,
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
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5a5a5a',
    },
    eventAddress: {
        fontSize: 14,
        color: '#5a5a5a',
    },
    eventDate: {
        fontSize: 14,
        color: '#5a5a5a',
        marginTop: 4,
    },
    shareIcon: {
        position: 'absolute',
        bottom: 0,
        right: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
    cancelButton: {
        backgroundColor: '#CCC',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
});
