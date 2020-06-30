import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContatct {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContatct;
  from?: IMailContatct;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
