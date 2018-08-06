export const flat = [
  {
    id: 1,
    label: 'john',
    avatar: 'https://wiki.teamfortress.com/w/images/6/67/Scoutava.jpg'
  },
  {
    id: 2,
    label: 'johnny',
    avatar: 'https://wiki.teamfortress.com/w/images/f/f2/Soldierava.jpg'
  },
  {
    id: 3,
    label: 'joe',
    avatar: 'https://wiki.teamfortress.com/w/images/4/4b/Demomanava.jpg'
  },
  {
    id: 4,
    label: 'johnannes',
    avatar: 'https://wiki.teamfortress.com/w/images/5/5e/Heavyava.jpg'
  },
  {
    id: 5,
    label: 'mike',
    avatar: 'https://wiki.teamfortress.com/w/images/7/7f/Medicava.jpg'
  },
  {
    id: 6,
    label: 'steve',
    avatar: 'https://wiki.teamfortress.com/w/images/4/44/Sniperava.jpg'
  },
  {
    id: 7,
    label: 'peter',
    avatar: 'https://wiki.teamfortress.com/w/images/3/37/Spyava.jpg'
  }
]

export const group = [
  {
    label: 'J names',
    items: [
      {
        id: 1,
        label: 'john'
      },
      {
        id: 2,
        label: 'johnny'
      },
      {
        id: 3,
        label: 'joe'
      },
      {
        id: 4,
        label: 'johnannes'
      }
    ]
  },
  {
    label: 'Other names',
    items: [
      {
        id: 5,
        label: 'mike'
      },
      {
        id: 6,
        label: 'steve'
      },
      {
        id: 7,
        label: 'peter'
      }
    ]
  }
]

export const relational = [
  {
    id: -1,
    label: 'Aaron'
  },
  {
    id: 0,
    label: 'Jay (all J belong to me)'
  },
  {
    id: 1,
    label: 'john',
    parentId: 0
  },
  {
    id: 2,
    label: 'johnny',
    parentId: 0
  },
  {
    id: 3,
    label: 'joe',
    parentId: 0
  },
  {
    id: 4,
    label: 'johnannes',
    parentId: 0
  },
  {
    id: 5,
    label: 'mike'
  },
  {
    id: 6,
    label: 'steve'
  },
  {
    id: 7,
    label: 'peter'
  }
]
