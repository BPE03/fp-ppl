import { CollectionConfig } from 'payload/types'

const Games: CollectionConfig = {
  slug: 'games',
  access:{
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
        name: 'GameName',
        type: 'text',
        required: true,
    },
  ],
}

export default Games
