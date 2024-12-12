// Register.js
import React, { useState } from 'react';
import { register } from '../../services/apiService';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        email: '',
        telefone: '',
        cpf: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados de registro no front:", formData);
        try {
            await register(formData);
            alert('Registro bem-sucedido');
        } catch (error) {
            console.error(error);
            alert('Erro no registro');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Registro</h2>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required style={styles.input} />
                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} placeholder="Data de Nascimento" required style={styles.input} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required style={styles.input} />
                <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" required style={styles.input} />
                <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" required style={styles.input} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Senha" required style={styles.input} />
                <button type="submit" style={styles.button}>Registrar</button>
            </form>
        </div>
    );
};

export default Register;

// Estilos CSS em JS
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 175px)', // ajusta para evitar o header e footer
        padding: '20px',
        backgroundColor: '#f5f5f5',
    },
    form: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // para duas colunas
        gap: '10px',
        width: '100%',
        maxWidth: '600px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#fff',
    },
    title: {
        gridColumn: 'span 2', // título ocupa as duas colunas
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    button: {
        gridColumn: 'span 2', // botão ocupa as duas colunas
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};
