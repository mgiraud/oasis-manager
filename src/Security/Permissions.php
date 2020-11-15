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
     * The user can access the list of users and their details
     */
    const USER_CAN_ACCESS_USERS = 'user.users';

    /**
     * The user can edit users
     */
    const USER_CAN_EDIT_USERS = 'user.can_edit_users';

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