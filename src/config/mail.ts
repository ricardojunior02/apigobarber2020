interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: { email: 'ricardojunior199502@gmail.com', name: 'Ricardo Junior' },
  },
} as IMailConfig;
