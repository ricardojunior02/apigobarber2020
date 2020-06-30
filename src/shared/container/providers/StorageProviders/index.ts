import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DiskStoreProvider from './impementations/DiskStorageProvider';
import S3toreProvider from './impementations/S3StorageProvider';

const providers = {
  disk: DiskStoreProvider,
  s3: S3toreProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver]
);
