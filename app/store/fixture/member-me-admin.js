const data = {
  '@context': '/api/contexts/Member',
  '@id': '/api/members/4',
  '@type': 'Member',
  id: 4,
  email: 'test@example.com',
  nickname: 'string',
  permissions: {
    USER_CAN_ACCESS_GALLERIES: 'user.galleries',
    USER_CAN_EDIT_GALLERIES: 'user.can_edit_galleries',
    USER_CAN_DELETE_FILES: 'user.can_delete_files',
    USER_CAN_DELETE_FILE_RECURSIVELY: 'user.can_delete_files_recursively',
    USER_CAN_ACCESS_MEMBERS: 'user.members',
    USER_CAN_EDIT_MEMBERS: 'user.can_edit_members',
    USER_CAN_DELETE_MEMBERS: 'user.can_delete_members',
    USER_CAN_ACCESS_PAGES: 'user.pages',
    USER_CAN_EDIT_PAGES: 'user.can_edit_pages',
    USER_CAN_DELETE_PAGES: 'user.can_delete_pages',
    USER_CAN_EDIT_PAGE_CATEGORIES: 'user.can_edit_page_categories',
    USER_CAN_DELETE_PAGE_CATEGORIES: 'user.can_delete_page_categories'
  },
  isAdmin: true
}

export default data
