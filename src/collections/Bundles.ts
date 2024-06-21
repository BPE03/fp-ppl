import { CollectionConfig } from 'payload/types'

const Bundles: CollectionConfig = {
  slug: 'bundles',
  access:{
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
        name: 'BundleName',
        type: 'text',
        required: true,
    },
    {
        name: 'Value',
        type: 'number',
        required: true,
    },
    {
        name: 'Price',
        type: 'number',
        required: true,
    },
    {
        name: 'GameName',
        type: 'relationship',
        relationTo: 'games',
        required: true,
    },
  ],
}

export default Bundles
