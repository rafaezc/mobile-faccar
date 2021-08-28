import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import Index from './pages/Index';
import Medicos from './pages/Medicos';
import Usuario from './pages/Usuario';
import Clinicas from './pages/Clinicas';
import Especialidades from './pages/Especialidades';
import Notas from './pages/Notas';
import Faltas from './pages/Faltas';

const Routes = createAppContainer(
    createSwitchNavigator({
        Index,
        Login,
        Medicos,
        Usuario,
        Clinicas,
        Especialidades,
        Notas,
        Faltas
    })
);

export default Routes;