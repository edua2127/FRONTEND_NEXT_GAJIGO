import type { NextPage } from 'next'
import NavBar from '@/layout/NavBar'
import React from 'react'
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
const CadastroEvents: NextPage = () => {
    const dateType = new Date(Date.now())
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [dateDeInicio, setDateDeInicio] = React.useState(dateType)
    const [dateDeFim, setDateDeFim] = React.useState(dateType)
    const [modoDeAtendimento, setModoDeAtendimento] = React.useState('')
    const [local, setLocal] = React.useState('')
    const [statusDoEvento, setStatusDoEvento] = React.useState('')

    function cadastroEvento() {
        const data = {
            name,
            description,
            dateDeInicio,
            dateDeFim,
            modoDeAtendimento,
            local,
            statusDoEvento
        }
        console.log(data)
    }

    return (
        <NavBar>
            <div className="container">
                <h3>Cadastro de Eventos</h3>
                <div>
                    <TextField 
                    id="name" 
                    name='name' 
                    label="Nome do Evento" 
                    variant="outlined" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} />
                    
                    <TextField 
                    id="description" 
                    name='description' 
                    label="Descrição do Evento" 
                    variant="outlined" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} />

                    <TextField 
                    id="dateDeInicio" 
                    name='dateDeInicio' 
                    label="Data de Inicio" 
                    type="date" 
                    variant="outlined" 
                    value={dateDeInicio} onChange={(e) => setDateDeInicio(new Date(e.target.value))} />

                    <TextField 
                    id="dateDeFim" 
                    name='dateDeFim' 
                    label="Data de Fim" 
                    type="date" 
                    variant="outlined" 
                    value={dateDeFim} 
                    onChange={(e) => setDateDeFim(new Date(e.target.value))} />

                    <TextField 
                    id="local" 
                    name='local' 
                    label="Local" 
                    variant="outlined" 
                    value={local} 
                    onChange={(e) => setLocal(e.target.value)} />

                    <Select 
                    id="modoDeAtendimento" 
                    name='modoDeAtendimento' 
                    label="Modo de Atendimento" 
                    variant="outlined" 
                    value={modoDeAtendimento} 
                    onChange={(e: SelectChangeEvent) => setModoDeAtendimento(e.target.value)}>
                        <option value="Offline">Presencial</option>
                        <option value="Online">Online</option>
                        <option value="Mixed">Hibrido</option>
                    </Select>

                    <Select
                    id="statusDoEvento"
                    name='statusDoEvento'
                    label="Status do Evento"
                    variant="outlined"
                    value={statusDoEvento}
                    onChange={(e: SelectChangeEvent) => setStatusDoEvento(e.target.value)}>
                        <option value="EventCanceled">Cancelado</option>
                        <option value="EventMovedOnline">Mudou para Online</option>
                        <option value="EventPostponed">Adiado</option>
                        <option value="EventRescheduled">Remarcado</option>
                        <option value="EventScheduled">Agendado</option>
                    </Select>
                    <Button variant="outlined" onClick={cadastroEvento}>Cadastrar</Button>
                </div>
            </div>
        </NavBar>
    )
}

export default CadastroEvents