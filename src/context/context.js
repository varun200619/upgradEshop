import { createContext } from 'react';

const BackendContext = createContext({ baseUrl: 'http://localhost:3001/' });

const SessionContext = createContext({
	username: '',
	email: '',
	setState: () => {},
});

export { BackendContext, SessionContext };
