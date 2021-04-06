<?php


namespace App\Command;


use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class RemoveInvalidRefreshTokenCommand extends Command
{
    protected EntityManagerInterface $manager;

    protected static $defaultName = 'app:reresh-token:remove-invalid';

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
        parent::__construct();
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $this->manager
            ->getConnection()
            ->executeQuery('DELETE FROM refresh_token WHERE valid < NOW()');

        return Command::SUCCESS;
    }
}