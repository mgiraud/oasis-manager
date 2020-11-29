const data = {
  '@context': '/api/contexts/Page',
  '@id': '/api/pages',
  '@type': 'hydra:Collection',
  'hydra:member': [
    {
      '@id': '/api/pages/test',
      '@type': 'Page',
      url: 'test',
      title: 'test',
      content: '<h3>ET salut toi non de gue !</h3><p></p><p>we</p><p>fwe</p><p>f</p><p>ewf</p><p>ewf</p><p>ew</p><p>few</p><p>few</p><p>f</p><p>ewf</p><p>ewfewfewfewfewfewfewfewf</p><p>ewf</p><p>we</p><p>f</p><p>ewf</p><ol><li><p>ewfew</p></li><li><p>wwef</p></li><li><p>wef</p></li><li><p>we</p></li><li><p>wef</p></li><li><p>wef</p></li></ol><p></p>',
      createdAt: '2020-11-20T08:13:26+00:00',
      createdBy: '/api/members/4',
      isPublished: true,
      category: {
        '@id': '/api/page_categories/1',
        '@type': 'PageCategory',
        name: 'ze category is the best',
        showInMenu: true,
        slug: 'category'
      },
      showInMenu: false
    },
    {
      '@id': '/api/pages/toui',
      '@type': 'Page',
      url: 'toui',
      title: 'toui',
      content: 'toui',
      createdAt: '2020-11-20T19:55:16+00:00',
      createdBy: '/api/members/4',
      isPublished: true,
      category: null,
      showInMenu: true
    },
    {
      '@id': '/api/pages/test1',
      '@type': 'Page',
      url: 'test1',
      title: 'test11',
      content: 'test1',
      createdAt: '2020-11-20T08:13:26+00:00',
      createdBy: '/api/members/4',
      isPublished: true,
      category: {
        '@id': '/api/page_categories/1',
        '@type': 'PageCategory',
        name: 'ze category is the best',
        showInMenu: true,
        slug: 'category'
      },
      showInMenu: true
    }
  ],
  'hydra:totalItems': 3,
  'hydra:search': {
    '@type': 'hydra:IriTemplate',
    'hydra:template': '/api/pages{?url,title,createdBy.nickname,createdBy.nickname[],showInMenu,showInMenu[],isPublished,isPublished[],category,category[],createdAt[before],createdAt[strictly_before],createdAt[after],createdAt[strictly_after]}',
    'hydra:variableRepresentation': 'BasicRepresentation',
    'hydra:mapping': [
      {
        '@type': 'IriTemplateMapping',
        variable: 'url',
        property: 'url',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'title',
        property: 'title',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'createdBy.nickname',
        property: 'createdBy.nickname',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'createdBy.nickname[]',
        property: 'createdBy.nickname',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'showInMenu',
        property: 'showInMenu',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'showInMenu[]',
        property: 'showInMenu',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'isPublished',
        property: 'isPublished',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'isPublished[]',
        property: 'isPublished',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'category',
        property: 'category',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'category[]',
        property: 'category',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'createdAt[before]',
        property: 'createdAt',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'createdAt[strictly_before]',
        property: 'createdAt',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'createdAt[after]',
        property: 'createdAt',
        required: false
      },
      {
        '@type': 'IriTemplateMapping',
        variable: 'createdAt[strictly_after]',
        property: 'createdAt',
        required: false
      }
    ]
  }
}

export default data
