import crypto from 'crypto';
import IGenerateUniqueIdProvider from '@modules/thebehero/ongs/providers/GenerateUniqueIdProvider/models/IGenerateUniqueIdProvider';

export default class CryptoGenerateUniqueIDProvider
  implements IGenerateUniqueIdProvider {
  public generateUniqueId(): string {
    return crypto.randomBytes(4).toString('hex');
  }
}
