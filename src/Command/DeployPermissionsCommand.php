<?php


namespace App\Command;


use App\Security\Permissions;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;

class DeployPermissionsCommand extends Command
{
    protected static $defaultName = 'app:install:permissions';

    public function configure()
    {
        $this
            ->setDescription('Generate a permissions.json file in app/security folder');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $permissions = Permissions::serializePermissions();
        $fileSystem = new Filesystem();

        $fileSystem->dumpFile(__DIR__ . '/../../app/security/permissions.json', $permissions);
        $output->writeln('Permissions file generated');
        $output->writeln($permissions);

        return Command::SUCCESS;
    }
}