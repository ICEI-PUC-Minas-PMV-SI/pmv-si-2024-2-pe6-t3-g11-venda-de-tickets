import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Base64Image from '../base64-image'; // Se precisar de um componente para exibir imagens base64
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

// Definindo o tipo para o Evento
interface Evento {
    id: number;
    nomeEvento: string;
    dataEvento: string;
    capaEvento: string;
    endereco: {
        nomeEspaco: string;
    };
    classificacaoIdade: number;
}



function Home() {
    const [eventos, setEventos] = useState<Evento[]>([]);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/evento`);
                const data = await response.json();
                setEventos(data.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, []);

    useEffect(() => {
        console.log(eventos); // Log para ver os eventos carregados
    }, [eventos]);

    const eventoDoDia = eventos.filter(
        (event) =>
            new Date(event.dataEvento).toLocaleDateString("pt-BR") ===
            new Date().toLocaleDateString("pt-BR")
    );

    const proximosEventos = eventos.filter(
        (event) =>
            new Date(event.dataEvento).toLocaleDateString("pt-BR") !==
            new Date().toLocaleDateString("pt-BR")
    );

    const eventosLivres = eventos.filter((event) => event.classificacaoIdade === 0);

    const indiceAleatorio =
        eventoDoDia.length > 0 ? Math.floor(Math.random() * eventoDoDia.length) : -1;

    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.line}></View>
            {/* Evento Destaque */}
            <View style={styles.container}>
                {/* Destaque */}
                <View style={styles.highlightSection}>
                    <View style={styles.highlightContent}>
                        <View style={styles.titleAndMenu}>
                            <Text style={styles.title}>Destaque</Text>
                            {/* Menu sanduíche */}

                            <View style={styles.menuContainer}>
                                <TouchableOpacity
                                    style={styles.menuButton}
                                    onPress={() => setMenuVisible(!menuVisible)}>
                                    <Text style={styles.menuIcon}>☰</Text>
                                </TouchableOpacity>
                                {menuVisible && (
                                    <View style={styles.menu} >
                                        <TouchableOpacity style={styles.button} onPress={() => router.push('/create-event')}>
                                            <Text style={styles.buttonText}>Create Event</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => router.push('/event-details')}>
                                            <Text style={styles.buttonText}>View Event</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => router.push('/politica')}>
                                            <Text style={styles.buttonText}>Política</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => router.push('/contato')}>
                                            <Text style={styles.buttonText}>Contato</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => router.push('/cart-details')}>
                                            <Text style={styles.buttonText}>Carrinho</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>

                        {indiceAleatorio >= 0 ? (
                            <>
                                <Text style={styles.eventName}>
                                    {eventoDoDia[indiceAleatorio]?.nomeEvento || "Nenhum evento disponível"}
                                </Text>
                                <Text style={styles.date}>
                                    Dia: {new Date(eventoDoDia[indiceAleatorio]?.dataEvento).toLocaleDateString("pt-BR")}
                                </Text>
                                <Text style={styles.location}>
                                    Local: {eventoDoDia[indiceAleatorio]?.endereco?.nomeEspaco || "Local não disponível"}
                                </Text>
                                <Button
                                    title="Saiba mais"
                                    onPress={() => console.log(`Navegar para evento ${eventoDoDia[indiceAleatorio]?.id}`)}
                                />
                            </>
                        ) : (
                            <Text style={styles.noEventText}>Nenhum evento do dia disponível.</Text>
                        )}
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.eventImage}
                                source={{ uri: `data:image/jpg;base64,${eventoDoDia[indiceAleatorio]?.capaEvento}` }}
                                // source={require('./images.jpg')}
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* Eventos Hoje */}
            <View style={styles.eventSection}>
                <Text style={styles.subtitle}>Eventos hoje</Text>
                <ScrollView horizontal style={styles.eventsContainer}>
                    {eventoDoDia.length > 0 ? (
                        eventoDoDia.map((evento) => (
                            <View style={styles.eventCard} key={evento.id}>
                                <Image
                                    style={styles.eventImage}
                                    source={{ uri: `data:image/jpg;base64,${eventoDoDia[indiceAleatorio]?.capaEvento}` }}
                                />
                                <Text style={styles.eventName}>{evento.nomeEvento}</Text>
                                <Text style={styles.date}>
                                    {new Date(evento.dataEvento).toLocaleDateString("pt-BR")}
                                </Text>
                                <Text style={styles.location}>{evento.endereco?.nomeEspaco || "Local não disponível"}</Text>
                                <Button
                                    title="Saiba mais"
                                    onPress={() => console.log(`Navegar para evento ${evento.id}`)} // Navegação a ser implementada
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noEventText}>Nenhum evento disponível.</Text>
                    )}
                </ScrollView>
            </View>

            {/* Próximos Eventos */}
            <View style={styles.eventSection}>
                <Text style={styles.subtitle}>Próximos Eventos</Text>
                <ScrollView horizontal style={styles.eventsContainer}>
                    {proximosEventos.length > 0 ? (
                        proximosEventos.map((evento) => (
                            <View style={styles.eventCard} key={evento.id}>
                                <Image
                                    style={styles.eventImage}
                                    source={{ uri: `data:image/jpg;base64,${eventoDoDia[indiceAleatorio]?.capaEvento}` }}
                                />
                                <Text style={styles.eventName}>{evento.nomeEvento}</Text>
                                <Text style={styles.date}>
                                    {new Date(evento.dataEvento).toLocaleDateString("pt-BR")}
                                </Text>
                                <Text style={styles.location}>{evento.endereco?.nomeEspaco || "Local não disponível"}</Text>
                                <Button
                                    title="Saiba mais"
                                    onPress={() => console.log(`Navegar para evento ${evento.id}`)} // Navegação a ser implementada
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noEventText}>Nenhum evento disponível.</Text>
                    )}
                </ScrollView>
            </View>

            {/* Eventos para toda a família */}
            <View style={styles.eventSection}>
                <Text style={styles.subtitle}>Eventos para toda a família</Text>
                <ScrollView horizontal style={styles.eventsContainer}>
                    {eventosLivres.length > 0 ? (
                        eventosLivres.map((evento) => (
                            <View style={styles.eventCard} key={evento.id}>
                                <Image
                                    style={styles.eventImage}
                                    source={{ uri: `data:image/jpg;base64,${eventoDoDia[indiceAleatorio]?.capaEvento}` }}
                                />
                                <Text style={styles.eventName}>{evento.nomeEvento}</Text>
                                <Text style={styles.date}>
                                    {new Date(evento.dataEvento).toLocaleDateString("pt-BR")}
                                </Text>
                                <Text style={styles.location}>{evento.endereco?.nomeEspaco || "Local não disponível"}</Text>
                                <Button
                                    title="Saiba mais"
                                    onPress={() => console.log(`Navegar para evento ${evento.id}`)} // Navegação a ser implementada
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noEventText}>Nenhum evento disponível.</Text>
                    )}
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingBottom: 100,
    },
    highlightSection: {
        padding: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 20,
    },
    highlightContent: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    date: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
    location: {
        fontSize: 14,
        textAlign: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventSection: {
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    eventsContainer: {
        flexDirection: 'row',
    },
    noEventText: {
        fontSize: 14,
        textAlign: 'center',
        paddingBottom: 10,
    },
    eventCard: {
        marginRight: 15,
        width: 180,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 3,
    },
    eventImage: {
        width: '100%',
        height: 120,
        borderRadius: 5,
    },
    menuContainer: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        padding: 0,
    },
    menuIcon: {
        fontSize: 24,
    },
    menu: {
        position: 'absolute',
        top: 50,
        zIndex: 10,
    },
    button: {
        padding: 5,
        backgroundColor: 'gray',
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
    },

    titleAndMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0
    },

    line:{
        backgroundColor: 'gray',
        padding: 10
    },

});

export default Home;
