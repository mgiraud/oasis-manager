<?php


namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource(
 *      collectionOperations={
 *          "login"={
 *              "path"="/login_check",
 *              "method"="post",
 *              "openapi_context"={
 *                  "summary"="Get JWT token to login."
 *              },
 *           }
 *      },
 *     itemOperations={}
 * )
 */
class Token
{
    /**
     * @ApiProperty(identifier=true)
     */
    public ?string $email = null;
    public ?string $password = null;
}
