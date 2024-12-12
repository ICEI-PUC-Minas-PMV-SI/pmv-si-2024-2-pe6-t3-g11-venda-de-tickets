import React from 'react';

function FiltroEventos({ filtros, onChange, onApply, onClear }) {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        onChange({ ...filtros, [name]: value });
    };

    return (
        <div>
            <h5>Filtros de Evento</h5>

            <div className="mt-4 mb-3">
                <label htmlFor="nomeEvento" className="form-label">Nome do Evento</label>
                <input
                    type="text"
                    className="form-control"
                    id="nomeEvento"
                    name="nomeEvento"
                    value={filtros.nomeEvento}
                    onChange={handleInputChange}
                    placeholder="Digite o nome"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="dataEvento" className="form-label">Data do Evento</label>
                <input
                    type="date"
                    className="form-control"
                    id="dataEvento"
                    name="dataEvento"
                    value={filtros.dataEvento}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="classificacaoIdade" className="form-label">Classificação Idade</label>
                <select
                    className="form-select"
                    id="classificacaoIdade"
                    name="classificacaoIdade"
                    value={filtros.classificacaoIdade}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione</option>
                    <option value="0">Livre</option>
                    <option value="10">10+</option>
                    <option value="12">12+</option>
                    <option value="14">14+</option>
                    <option value="16">16+</option>
                    <option value="18">18+</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="lotacaoMaxima" className="form-label">Lotação Máxima</label>
                <input
                    type="number"
                    className="form-control"
                    id="lotacaoMaxima"
                    name="lotacaoMaxima"
                    value={filtros.lotacaoMaxima}
                    onChange={handleInputChange}
                    placeholder="Máx. de pessoas"
                />
            </div>


            <div className="mb-3">
                <label htmlFor="statusEvento" className="form-label">Status do Evento</label>
                <select
                    className="form-select"
                    id="statusEvento"
                    name="statusEvento"
                    value={filtros.statusEvento}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione</option>
                    <option value="ativo">Ativo</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="adiado">Adiado</option>
                </select>
            </div>

            <div className="row mb-5">
                <div className="col-6">
                    <button className="btn btn-light btn-sm w-100" onClick={onApply}>Aplicar Filtros</button>
                </div>
                <div className="col-6">
                    <button className="btn btn-light btn-sm w-100" onClick={onClear}>Limpar Filtros</button>
                </div>
            </div>


        </div>
    );
}

export default FiltroEventos;
