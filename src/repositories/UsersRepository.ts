import FirestoreGatewey from '@/gateways/FirestoreGateway'
import { UserProfileEntity, UserDocument, UserParams } from '@/entities/User'

export default class UsersRepository {
  private firestoreGateway: FirestoreGatewey

  public constructor() {
    this.firestoreGateway = new FirestoreGatewey('users')
  }

  public async getProfileById(id: string): Promise<UserProfileEntity> {
    const document = await this.firestoreGateway.getById<UserDocument>(id)
    delete document.data.createdAt
    delete document.data.updatedAt
    return { id: document.id, ...document.data }
  }

  public async setProfile(id: string, profile: UserParams): Promise<void> {
    await this.firestoreGateway.add(profile, id)
  }
}
