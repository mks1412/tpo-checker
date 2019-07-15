import { CollectionReference, Query, Timestamp, DocumentData } from '@firebase/firestore-types'
import { firestore } from '@/lib/firebase'

export default class FirestorGateway {
  /**
   * @class FirestoreGateway
   */
  private _db = firestore
  private _collectionRef!: CollectionReference
  private _query!: Query

  /**
   * Constructor
   * @param collectionName The collection name
   */
  public constructor(collectionName: string = '') {
    if (collectionName) this.setCollection(collectionName)
  }

  /**
   * Set collection name
   * @param collectionName The collection name
   */
  public setCollection(collectionName: string): void {
    if (collectionName) {
      this._collectionRef = this._db.collection(collectionName)
    } else {
      console.log('Collection name cannot be empty.')
    }
  }

  /**
   * Get documents in a collection
   * @param conditions Array of conditions
   * @param orderBy Field name to order by
   * @param limit Number of documents to retrieve
   * @returns Array of Document objects
   */
  public async get(conditions?: Condition[], orderBy?: OrderBy[], limit?: number): Promise<Document[]> {
    const documents: Document[] = []

    this._query = this._collectionRef

    if (this._isCollectionSet) {
      this._setConditions(conditions)
      this._setSorting(orderBy)
      this._setLimit(limit)

      try {
        const snapshots = await this._query.get()
        snapshots.forEach((doc) => {
          documents.push({
            id: doc.id,
            data: doc.data()
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    return documents
  }

  /**
   * Get a document by ID
   * @param id The document ID
   * @returns A Document object or null
   */
  public async getById(id: string): Promise<Document | null> {
    let document: Document | null = null

    if (this._isCollectionSet) {
      try {
        const doc = await this._collectionRef.doc(id).get()
        if (doc.exists) {
          document = {
            id: doc.id,
            data: doc.data()!
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    return document
  }

  /**
   * Add a document
   * @param data The document object
   * @param id The document ID
   * @returns Void
   */
  public async add(data: Record<string, any>, id?: string): Promise<void> {
    if (this._isCollectionSet) {
      try {
        if (id) {
          await this._collectionRef.doc(id).set(data)
        } else {
          await this._collectionRef.add(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * Add multiple documents
   * @param dataArr Array of document objects
   * @returns ResultData object or null
   */
  public async batchAdd(dataArr: Record<string, any>[]): Promise<boolean> {
    let result = false

    if (this._isCollectionSet) {
      const batch = this._db.batch()

      dataArr.forEach((data) => {
        batch.set(this._collectionRef.doc(), data)
      })

      try {
        await batch.commit()
        result = true
      } catch (error) {
        console.log(error)
      }
    }

    return result
  }

  /**
   * Update a document
   * @param data The document object
   * @param id The document ID
   * @param isMerge If true, data will merge into existing document. Default is false.
   * @returns Void
   */
  public async update(data: Record<string, any>, id: string): Promise<void> {
    if (this._isCollectionSet) {
      try {
        await this._collectionRef.doc(id).update({
          ...data,
          updatedAt: new Date()
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * Delete a document
   * @param id The document ID
   * @returns Void
   */
  public async delete(id: string): Promise<void> {
    if (this._isCollectionSet) {
      try {
        await this._collectionRef.doc(id).delete()
      } catch (error) {
        console.log(error)
      }
    }
  }

  private get _isCollectionSet(): boolean {
    return !!this._collectionRef
  }

  private _setConditions(conditions?: Condition[]): void {
    if (conditions && conditions.length > 0) {
      conditions.forEach((condition) => {
        this._query = this._query.where(condition.field, condition.operator, condition.value)
      })
    }
  }

  private _setSorting(orderBy?: OrderBy[]): void {
    if (orderBy && orderBy.length > 0) {
      orderBy.forEach((order) => {
        this._query = this._query.orderBy(order.field, order.sort || 'asc')
      })
    }
  }

  private _setLimit(limit?: number): void {
    if (limit) {
      this._query = this._query.limit(limit)
    }
  }
}

// @Types
export interface Document {
  id: string
  data: DocumentData
}

export interface ResultData {
  document: Document
  writeTime?: Timestamp
}

export interface Condition {
  field: string
  operator: Operators
  value: any
}

export interface OrderBy {
  field: string
  sort: SortType
}

export enum Operators {
  LessThan = '>',
  LessThanOrEqual = '<=',
  Equal = '==',
  GreaterThan = '>',
  GreaterThanOrEqual = '>='
}

export enum SortType {
  Ascending = 'asc',
  Descending = 'desc'
}
