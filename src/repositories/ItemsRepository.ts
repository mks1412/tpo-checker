import FirestoreGatewey, { Condition, Operators } from '@/gateways/FirestoreGateway'
import { ItemEntity, ItemDocument, ItemCategory } from '@/entities/Item'

export default class ItemsRepository {
  private firestoreGateway: FirestoreGatewey

  public constructor() {
    this.firestoreGateway = new FirestoreGatewey('items')
  }

  public async getById(id: string): Promise<ItemEntity> {
    const document = await this.firestoreGateway.getById<ItemDocument>(id)
    return { id: document.id, ...document.data }
  }

  public async getByCategory(category: ItemCategory): Promise<ItemEntity[]> {
    const condition: Condition = {
      field: 'category.slug',
      operator: Operators.Equal,
      value: category.slug
    }
    const documents = await this.firestoreGateway.get<ItemDocument>([condition])
    return documents.map((document) => ({ id: document.id, ...document.data }))
  }

  public async add(item: ItemEntity): Promise<void> {
    await this.firestoreGateway.add(item)
  }

  public async update(item: ItemEntity): Promise<void> {
    await this.firestoreGateway.update(item, item.id)
  }

  public async delete(id: string): Promise<void> {
    await this.firestoreGateway.delete(id)
  }
}
