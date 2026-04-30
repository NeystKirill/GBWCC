import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const DATA_DIR = path.join(process.cwd(), 'data')

class LocalQuery {
  constructor(model, filter, isOne = false) {
    this.model = model
    this.filter = filter
    this.isOne = isOne
    this._sort = null
    this._limit = null
    this._skip = null
  }

  sort(opts) { this._sort = opts; return this }
  limit(n) { this._limit = n; return this }
  skip(n) { this._skip = n; return this }
  select() { return this }
  populate() { return this }

  async exec() {
    const all = await this.model._read()
    let matched = all.filter(item => this.model._match(item, this.filter))
    
    if (this._sort) {
      const key = Object.keys(this._sort)[0]
      const dir = this._sort[key] === 1 || this._sort[key] === 'asc' ? 1 : -1
      matched.sort((a, b) => {
        let va = a[key]
        let vb = b[key]
        if (va instanceof Date || vb instanceof Date) {
          va = new Date(va).getTime()
          vb = new Date(vb).getTime()
        }
        if (typeof va === 'string' && typeof vb === 'string') {
          va = va.toLowerCase()
          vb = vb.toLowerCase()
        }
        if (va > vb) return dir
        if (va < vb) return -dir
        return 0
      })
    }

    if (this._skip) matched = matched.slice(this._skip)
    if (this._limit) matched = matched.slice(0, this._limit)
    
    return this.isOne ? (matched[0] || null) : matched
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject)
  }

  catch(reject) {
    return this.exec().catch(reject)
  }
}

export class LocalModel {
  constructor(modelName) {
    this.modelName = modelName
    this.filePath = path.join(DATA_DIR, `${modelName.toLowerCase()}.json`)
  }

  async _read() {
    try {
      await fs.mkdir(DATA_DIR, { recursive: true })
      const data = await fs.readFile(this.filePath, 'utf-8')
      return JSON.parse(data)
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(this.filePath, '[]', 'utf-8')
        return []
      }
      throw err
    }
  }

  async _write(data) {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8')
  }

  _match(item, filter) {
    if (!filter || Object.keys(filter).length === 0) return true
    for (const key in filter) {
      if (key === '_id' || key === 'id') {
        if (item.id !== filter[key] && item._id !== filter[key]) return false
      } else if (typeof filter[key] === 'object' && filter[key] !== null) {
        if (filter[key].$gt) {
          if (!(new Date(item[key]) > new Date(filter[key].$gt))) return false
        }
      } else if (key === 'published' && filter[key] === true) {
        // Treat undefined as true for published flag (backward compatibility)
        if (item[key] !== true && item[key] !== undefined) return false
      } else {
        if (item[key] !== filter[key]) return false
      }
    }
    return true
  }

  find(filter = {}) {
    return new LocalQuery(this, filter, false)
  }

  findOne(filter = {}) {
    return new LocalQuery(this, filter, true)
  }

  async findById(id) {
    const all = await this._read()
    return all.find(item => item.id === id || item._id === id) || null
  }

  async create(data) {
    const all = await this._read()
    const id = crypto.randomUUID()
    const newItem = {
      _id: id,
      id: id,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    all.push(newItem)
    await this._write(all)
    return newItem
  }

  async findByIdAndUpdate(id, data, options = { new: true }) {
    const all = await this._read()
    const index = all.findIndex(item => item.id === id || item._id === id)
    if (index === -1) return null

    all[index] = { ...all[index], ...data, updated_at: new Date().toISOString() }
    await this._write(all)
    return options.new ? all[index] : all[index]
  }

  async findOneAndUpdate(filter, update, options = {}) {
    const all = await this._read()
    const index = all.findIndex(item => this._match(item, filter))
    
    if (index === -1) {
      if (options.upsert) {
        const id = crypto.randomUUID()
        let newData = { _id: id, id: id, ...filter }
        
        if (update.$inc) {
          for (let k in update.$inc) newData[k] = update.$inc[k]
        } else {
          newData = { ...newData, ...update }
        }
        
        newData.created_at = new Date().toISOString()
        newData.updated_at = new Date().toISOString()
        all.push(newData)
        await this._write(all)
        return newData
      }
      return null
    }

    if (update.$inc) {
      for (let k in update.$inc) {
        all[index][k] = (all[index][k] || 0) + update.$inc[k]
      }
    } else {
      all[index] = { ...all[index], ...update, updated_at: new Date().toISOString() }
    }
    
    await this._write(all)
    return options.new ? all[index] : all[index]
  }

  async findByIdAndDelete(id) {
    const all = await this._read()
    const filtered = all.filter(item => item.id !== id && item._id !== id)
    await this._write(filtered)
  }

  async deleteOne(filter) {
    const all = await this._read()
    const index = all.findIndex(item => this._match(item, filter))
    if (index !== -1) {
      all.splice(index, 1)
      await this._write(all)
    }
  }

  async countDocuments(filter = {}) {
    const all = await this._read()
    return all.filter(item => this._match(item, filter)).length
  }
}
