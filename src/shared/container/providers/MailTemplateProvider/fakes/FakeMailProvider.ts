import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMAilProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Fake Mail';
  }
}
