import IGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/models/IGenerateUniqueIdProvider';

export default class FakeGenerateUniqueIdProvider
  implements IGenerateUniqueIdProvider {
  public generateUniqueId(): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 8; i += 1)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
