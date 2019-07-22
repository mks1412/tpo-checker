import FirestoreGatewey, { Condition, Operators } from '@/gateways/FirestoreGateway'
import { ItemAnalyticsType, ItemAnalyticsEntity } from '@/entities/ItemAnalytics'

export default class ItemsAnalyticsRepository<T extends ItemAnalyticsEntity> {
  private firestoreGateway: FirestoreGatewey
  private type: ItemAnalyticsType

  public constructor(userId: string, type: ItemAnalyticsType) {
    this.firestoreGateway = new FirestoreGatewey(`users/${userId}/item-analytics`)
    this.type = type
  }

  public async get(optionalCondition?: Condition): Promise<T | null> {
    const conditions: Condition[] = [
      {
        field: 'type',
        operator: Operators.Equal,
        value: this.type
      }
    ]
    if (optionalCondition) conditions.push(optionalCondition)
    const documents = await this.firestoreGateway.get<T>(conditions)
    return documents.length > 0 ? documents[0].data : null
  }
}
