// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login as loginService } from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true); // Novo estado de carregamento
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);

                // Verifica se o token expirou
                if (decodedToken.exp * 1000 > Date.now()) {
                    setUser({ token: storedToken });
                    setToken(storedToken);
                } else {
                    logout();
                }
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
                logout();
            }
        }
        setLoading(false); // Define o carregamento como falso após a verificação inicial
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginService(email, password);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
            setUser(data);
            navigate('/'); // Redireciona para a página inicial após o login
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Falha no login');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Exibe o carregamento enquanto o estado está sendo atualizado
    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
