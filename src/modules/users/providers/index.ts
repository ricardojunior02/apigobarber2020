import { container } from 'tsyringe';

import IHashedProvider from './HashProvider/models/IHashProvider';
import BCyptHashProvider from './HashProvider/implementations/BCryotHashProvider';

container.registerSingleton<IHashedProvider>('HashProvider', BCyptHashProvider);
