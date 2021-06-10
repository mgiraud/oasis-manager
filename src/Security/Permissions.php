<?php


namespace App\Security;


class Permissions
{
    /**
     * The user can access the galleries and their hierarchy
     */
    const USER_CAN_ACCESS_GALLERIES = 'user.galleries';

    /**
     * The user can edit the galleries, their item and update their hierarchy
     */
    const USER_CAN_EDIT_GALLERIES = 'user.can_edit_galleries';

    /**
     * The user can upload files
     */
    const USER_CAN_UPLOAD_MEDIA_OBJECTS = 'user.can_upload_media_objects';

    /**
     * The user can edit files
     */
    const USER_CAN_EDIT_MEDIA_OBJECTS = 'user.can_edit_media_objects';

    /**
     * The user can delete media object and empty media objects
     */
    const USER_CAN_DELETE_FILES = 'user.can_delete_files';

    /**
     * The user can delete media node and non empty media object
     */
    const USER_CAN_DELETE_FILE_RECURSIVELY = 'user.can_delete_files_recursively';

    /**
     * The user can access the list of members and their details
     */
    const USER_CAN_ACCESS_MEMBERS = 'user.members';

    /**
     * The user can edit members
     */
    const USER_CAN_EDIT_MEMBERS = 'user.can_edit_members';

    /**
     * The user can delete members
     */
    const USER_CAN_DELETE_MEMBERS = 'user.can_delete_members';

    /**
     * The user can access the list of members groups and their details
     */
    const USER_CAN_ACCESS_MEMBER_GROUPS = 'user.member_groups';

    /**
     * The user can edit member groups
     */
    const USER_CAN_EDIT_MEMBER_GROUPS = 'user.can_edit_member_groups';

    /**
     * The user can delete member groups
     */
    const USER_CAN_DELETE_MEMBER_GROUPS = 'user.can_delete_member_groups';

    /**
     * The user can access the page list
     */
    const USER_CAN_ACCESS_PAGES = 'user.pages';

    /**
     * The user can create and edit pages
     */
    const USER_CAN_EDIT_PAGES = 'user.can_edit_pages';

    /**
     * The user can delete unpublished pages
     */
    const USER_CAN_DELETE_PAGES = 'user.can_delete_pages';

    /**
     * The user can access page categories
     */
    const USER_CAN_ACCESS_PAGE_CATEGORIES = 'user.can_edit_access_categories';

    /**
     * The user can create and edit page categories
     */
    const USER_CAN_EDIT_PAGE_CATEGORIES = 'user.can_edit_page_categories';

    /**
     * The user can create and edit page categories
     */
    const USER_CAN_DELETE_PAGE_CATEGORIES = 'user.can_delete_page_categories';

    /**
     * The user can view contacts
     */
    const USER_CAN_VIEW_CONTACT = 'user.can_view_contacts';

    /**
     * The user can delete contacts
     */
    const USER_CAN_DELETE_CONTACT = 'user.can_delete_contacts';

    /**
     * The user can view newsletter contacts
     */
    const USER_CAN_VIEW_CONTACT_NEWSLETTER = 'user.can_view_contacts_newsletter';

    /**
     * The user can delete newsletter contacts
     */
    const USER_CAN_DELETE_CONTACT_NEWSLETTER = 'user.can_delete_contacts_newsletter';

    /**
     * The user can view le the join survey
     */
    const USER_CAN_VIEW_SURVEY_JOIN = 'user.can_view_survey_joins';

    /**
     * The user can delete a join survey entry
     */
    const USER_CAN_DELETE_SURVEY_JOIN = 'user.can_delete_survey_joins';

    /**
     * The user can access page blog_articles
     */
    const USER_CAN_ACCESS_BLOG_ARTICLES = 'user.can_edit_access_blog_articles';

    /**
     * The user can create and edit page blog_articles
     */
    const USER_CAN_EDIT_BLOG_ARTICLES = 'user.can_edit_page_blog_articles';

    /**
     * The user can create and edit page blog_articles
     */
    const USER_CAN_DELETE_BLOG_ARTICLES = 'user.can_delete_page_blog_articles';

    /**
     * The user can delete tags
     */
    const USER_CAN_DELETE_TAGS = 'user.can_delete_page_blog_tags';

    public static function getPermissions(): array
    {
        $c = new \ReflectionClass(Permissions::class);
        return array_keys($c->getConstants());
    }

    public static function serializePermissions(): string
    {
        return json_encode(self::getPermissions(), JSON_PRETTY_PRINT);
    }
}