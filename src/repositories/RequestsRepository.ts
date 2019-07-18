import FirestoreGatewey, { OrderBy, SortType } from '@/gateways/FirestoreGateway'
import { RequestEntity, RequestParams, RequestDocument } from '@/entities/Request'

export default class RequestsRepository {
  private firestoreGateway: FirestoreGatewey

  public constructor(userId: string) {
    this.firestoreGateway = new FirestoreGatewey(`users/${userId}/requests`)
  }

  public async load(): Promise<RequestEntity[]> {
    const orderBy: OrderBy = {
      field: 'updatedAt',
      sort: SortType.Descending
    }
    const documents = await this.firestoreGateway.get<RequestDocument>([], [orderBy])
    return documents.map((document) => ({ id: document.id, ...document.data }))
  }

  public async add(item: RequestParams): Promise<void> {
    await this.firestoreGateway.add(item)
  }

  public async delete(id: string): Promise<void> {
    await this.firestoreGateway.delete(id)
  }
}
