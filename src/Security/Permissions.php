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
     * The user can delete media object and empty gallery items
     */
    const USER_CAN_DELETE_FILES = 'user.can_delete_files';

    /**
     * The user can delete media object and non empty gallery items
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

    public static function getPermissions(): array
    {
        $c = new \ReflectionClass(Permissions::class);
        return $c->getConstants();
    }

    public static function serializePermissions(): string
    {
        return json_encode(self::getPermissions(), JSON_PRETTY_PRINT);
    }
}