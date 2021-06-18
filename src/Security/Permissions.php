<?php


namespace App\Security;


class Permissions
{
    private static $permissions = [
        /**
         * The user can access the galleries and their hierarchy
         */
        'USER_CAN_ACCESS_GALLERIES',

        /**
         * The user can edit the galleries, their item and update their hierarchy
         */
        'USER_CAN_EDIT_GALLERIES',

        /**
         * The user can upload files
         */
        'USER_CAN_UPLOAD_MEDIA_OBJECTS',

        /**
         * The user can edit files
         */
        'USER_CAN_EDIT_MEDIA_OBJECTS',

        /**
         * The user can delete media object and empty media objects
         */
        'USER_CAN_DELETE_FILES',

        /**
         * The user can delete media node and non empty media object
         */
        'USER_CAN_DELETE_FILE_RECURSIVELY',

        /**
         * The user can access the list of members and their details
         */
        'USER_CAN_ACCESS_MEMBERS',

        /**
         * The user can edit members
         */
        'USER_CAN_EDIT_MEMBERS',

        /**
         * The user can delete members
         */
        'USER_CAN_DELETE_MEMBERS',

        /**
         * The user can access the list of members groups and their details
         */
        'USER_CAN_ACCESS_MEMBER_GROUPS',

        /**
         * The user can edit member groups
         */
        'USER_CAN_EDIT_MEMBER_GROUPS',

        /**
         * The user can delete member groups
         */
        'USER_CAN_DELETE_MEMBER_GROUPS',

        /**
         * The user can access the page list
         */
        'USER_CAN_ACCESS_PAGES',

        /**
         * The user can create and edit pages
         */
        'USER_CAN_EDIT_PAGES',

        /**
         * The user can delete unpublished pages
         */
        'USER_CAN_DELETE_PAGES',

        /**
         * The user can access page categories
         */
        'USER_CAN_ACCESS_PAGE_CATEGORIES',

        /**
         * The user can create and edit page categories
         */
        'USER_CAN_EDIT_PAGE_CATEGORIES',

        /**
         * The user can create and edit page categories
         */
        'USER_CAN_DELETE_PAGE_CATEGORIES',

        /**
         * The user can view contacts
         */
        'USER_CAN_VIEW_CONTACT',

        /**
         * The user can delete contacts
         */
        'USER_CAN_DELETE_CONTACT',

        /**
         * The user can view newsletter contacts
         */
        'USER_CAN_VIEW_CONTACT_NEWSLETTER',

        /**
         * The user can delete newsletter contacts
         */
        'USER_CAN_DELETE_CONTACT_NEWSLETTER',

        /**
         * The user can view le the join survey
         */
        'USER_CAN_VIEW_SURVEY_JOIN',

        /**
         * The user can delete a join survey entry
         */
        'USER_CAN_DELETE_SURVEY_JOIN',

        /**
         * The user can access page blog_articles
         */
        'USER_CAN_ACCESS_BLOG_ARTICLES',

        /**
         * The user can create and edit page blog_articles
         */
        'USER_CAN_EDIT_BLOG_ARTICLES',

        /**
         * The user can create and edit page blog_articles
         */
        'USER_CAN_DELETE_BLOG_ARTICLES',

        /**
         * The user can delete tags
         */
        'USER_CAN_DELETE_TAGS',

    ];

    public static function getPermissions(): array
    {
        return self::$permissions;
    }

    public static function serializePermissions(): string
    {
        return json_encode(self::getPermissions(), JSON_PRETTY_PRINT);
    }
}