import {ID,Query} from 'appwrite';
import authService from './auth'
class Model {
    constructor() {
        this.database = authService.databases;
        this.attributes=[]
        this.collection = '';
        this.query = [];
        this.relations = {};
        this.permission=[]
        this.value={};
        this.attributes.forEach((attr)=>{
            this[attr]=null
        })
    }

    static init(database) {
        const model = new this();
        model.database=authService.databases
        // console.log(model.database);
        
        // model.database = database;
        // model.collection = this.name.toLowerCase() + 's';
        // console.log(model.collection);
        return model;
    }

    async Save(id) {
        const data={}
        this.attributes.forEach((attr)=>{
            if (this[attr]) {
                data[attr]=this[attr];
            }
        })
        if(id){
            const res=await this.database.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                this.collection,
                id,
                data,
                this.permission.length !== 0 ? this.permission : null
            );
            Object.assign(this,res)
            Object.assign(this.value,res)
            return this
        }else{
            const res= await this.database.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                this.collection,
                ID.unique(),
                data,
                this.permission.length !== 0 ? this.permission : null
            );
            Object.assign(this,res)
            Object.assign(this.value,res)
            return this
        }

    }
    async AllLatest() {
        let allItems = [];
        let total = 0;
        let offset = 0;
        const limit = 100; // Adjust the limit as needed
    
        do {
            const response = await this.database.listDocuments(import.meta.env.VITE_DATABASE_ID,
                this.collection);
    
            allItems = allItems.concat(response.documents);
            total = response.total;
            offset += limit;
        } while (offset < total);
    
        return allItems;
    }

    where(field, operator, value) {
        this.query.push(['where', field, operator, value]);
        return this;
    }

    orWhere(field, operator, value) {
        this.query.push(['orWhere', field, operator, value]);
        return this;
    }

    orderBy(field, direction = 'asc') {
        this.query.push(['orderBy', field, direction]);
        return this;
    }

    limit(limit) {
        this.query.push(['limit', limit]);
        return this;
    }

    offset(offset) {
        this.query.push(['offset', offset]);
        return this;
    }

    with(relation) {
        this.relations[relation] = true;
        return this;
    }

    async get() {
        let queries = [];
        this.query.forEach(q => {
            switch(q[0]) {
                case 'where':
                    queries.push(Query.equal(q[1], q[3]));
                    break;
                case 'orWhere':
                    queries.push(Query.equal(q[1], q[3]));
                    break;
                case 'orderBy':
                    queries.push(Query.orderBy(q[1], q[2]));
                    break;
            }
        });

        const documents = await this.database.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            this.collection,
            queries
        );

        if (Object.keys(this.relations).length > 0) {
            return this.loadRelations(documents);
        }

        return documents;
    }

    async find(id) {
        // return this.collection
        const res= await this.database.getDocument(
            import.meta.env.VITE_DATABASE_ID,
            this.collection,
            id
        );
        Object.assign(this,res)
        Object.assign(this.value,res)
        return this
    }

    async create(data, id) {
        if(id){
            return await this.database.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                this.collection,
                id,
                data,
                this.permission.length !== 0 ? this.permission : null
            );
        }else{
            return await this.database.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                this.collection,
                ID.unique(),
                data,
                this.permission.length !== 0 ? this.permission : null
            );
        }
    }

    async update(id, data) {
        if(this.$id){
            const res= await this.database.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                this.collection,
                this.$id,
                data
            );
            Object.assign(this,res)
            Object.assign(this.value,res)
            return this
        }else{
            const res= await this.database.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                this.collection,
                id,
                data
            );
            Object.assign(this,res)
            Object.assign(this.value,res)
            return this
        }
    }

    async delete(id) {
        return await this.database.deleteDocument(
            import.meta.env.VITE_DATABASE_ID,
            this.collection,
            id
        );
    }

    async loadRelations(documents) {
        for (let doc of documents.documents) {
            for (let relation in this.relations) {
                if (doc[relation + '_id']) {
                    const relatedDoc = await this.database.getDocument(
                        import.meta.env.VITE_DATABASE_ID,
                        relation + 's',
                        doc[relation + '_id']
                    );
                    doc[relation] = relatedDoc;
                }
            }
        }
        return documents;
    }
}
export default Model;