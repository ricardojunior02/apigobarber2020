export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(fille: string): Promise<void>;
}
