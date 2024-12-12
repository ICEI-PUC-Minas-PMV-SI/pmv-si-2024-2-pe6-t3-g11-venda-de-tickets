import React from 'react';

function NotificacaoErro({ mensagem }) {
    return <div className="alert alert-danger text-center">{mensagem}</div>;
}

export default NotificacaoErro;
