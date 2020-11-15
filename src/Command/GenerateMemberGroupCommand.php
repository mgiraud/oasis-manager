<?php


namespace App\Command;


use App\Member\MemberGroupFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class GenerateMemberGroupCommand extends Command
{
    protected MemberGroupFactory $memberGroupFactory;
    protected EntityManagerInterface $manager;

    protected static $defaultName = 'app:member-group:generate';

    public function __construct(MemberGroupFactory $memberGroupFactory, EntityManagerInterface $manager)
    {
        parent::__construct();
        $this->memberGroupFactory = $memberGroupFactory;
        $this->manager = $manager;
    }

    protected function configure()
    {
        $this
            ->setDescription('Creates a new user.')
            ->setHelp('This command allows you to create a user...')
            ->addArgument('name', InputArgument::REQUIRED, 'The name of the group.')
            ->addArgument('description', InputArgument::OPTIONAL, 'The description');
    }

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $user = $this->memberGroupFactory->createFromCommand(
            $input->getArgument('name'),
            $input->getArgument('description'),
        );
        $this->manager->persist($user);
        $this->manager->flush();

        return Command::SUCCESS;
    }
}