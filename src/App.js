import axios from 'axios';
import Ruta from './components/Ruta';
import { AuthContextProvider } from './context/AuthContext';
import { ContactsContextProvider } from './context/ContactsContext';
import { UserContextProvider } from './context/UserContext';

axios.defaults.withCredentials = true; //allow cookies

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ContactsContextProvider>
          <Ruta />
        </ContactsContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
export default App;
