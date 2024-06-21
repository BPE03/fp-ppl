import { CollectionConfig } from 'payload/types'

const Tranactions: CollectionConfig = {
  slug: 'transactions',
  access:{
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
        name: 'Date',
        type: 'date',
        required: true,
    },
    {
        name: 'TotalPrice',
        type: 'number',
        required: true,
    },
    {
        name: 'GameName',
        type: 'relationship',
        relationTo: 'games',
        required: true,
    },
    {
        name: 'InGameName',
        type: 'text',
        required: true,
    },
    {
        name: 'BundleName',
        type: 'relationship',
        relationTo: 'bundles',
        required: true,
    },
    {
        name: 'UserName',
        type: 'relationship',
        relationTo: 'users',
        required: true,
    },
    {
        name: 'PaymentMethod',
        type: 'text',
        required: true,
    },
  ],
}

export default Tranactions
