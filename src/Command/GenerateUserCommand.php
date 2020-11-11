<?php


namespace App\Command;


use App\Member\MemberFactory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class GenerateUserCommand extends Command
{
    protected MemberFactory $memberFactory;
    protected EntityManagerInterface $manager;

    protected static $defaultName = 'app:member:generate';

    public function __construct(MemberFactory $memberFactory, EntityManagerInterface $manager)
    {
        parent::__construct();
        $this->memberFactory = $memberFactory;
        $this->manager = $manager;
    }

    protected function configure()
    {

        $this
            ->setDescription('Creates a new user.')
            ->setHelp('This command allows you to create a user...')
            ->addArgument('email', InputArgument::REQUIRED, 'The email of the user.')
            ->addArgument('password', InputArgument::REQUIRED, 'The password of the user.')
            ->addArgument('nickname', InputArgument::REQUIRED, 'The nickname of the user.')
            ->addOption('is-admin', null, InputOption::VALUE_NONE, 'Makes the user an admin')
            ->addOption(
                'roles',
                'r',
                InputOption::VALUE_IS_ARRAY | InputOption::VALUE_REQUIRED,
                'Add roles to the user',
                []
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln(
            [
                'User Creator',
                '============',
                '',
            ]
        );

        // retrieve the argument value using getArgument()
        $output->writeln('Email: ' . $input->getArgument('email'));
        $output->writeln('Password: ' . $input->getArgument('password'));
        $output->writeln('Nickname: ' . $input->getArgument('nickname'));

        $roles = ['ROLE_MEMBER'];
        if ($input->hasOption('is-admin')) {
            $roles[] = 'ROLE_ADMIN';
        }
        if ($input->hasOption('roles')) {
            $roles = array_merge($roles, $input->getOption('roles'));
        }
        $output->writeln('Roles: [' . implode(',', $roles) . ']');

        $user = $this->memberFactory->createFromCommand(
            $input->getArgument('email'),
            $input->getArgument('password'),
            $input->getArgument('nickname'),
            $roles
        );
        $this->manager->persist($user);
        $this->manager->flush();

        $output->writeln('User successfully generated!');

        return Command::SUCCESS;
    }
}