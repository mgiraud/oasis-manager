<?php


namespace App\Command;


use App\Entity\MemberGroup;
use App\Member\MemberFactory;
use App\Security\Permissions;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Question\Question;

class GenerateMemberCommand extends Command
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

    private function getPasswordQuestion(): Question
    {
        $question = new Question('Please enter your password');
        $question->setValidator(function ($value) {
            if (trim($value) == '') {
                throw new \Exception('The password cannot be empty');
            }
            if (false === preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\S]{8,}$/', $value)) {
                throw new \Exception('Password must be at least 8 characters with a figure and a capital letter');
            }

            return $value;
        });
        $question->setHidden(true);
        $question->setMaxAttempts(20);

        return $question;
    }

    private function getPermissionsQuestions(): Question
    {
        $question = new ChoiceQuestion(
            'Please select permissions',
            ['None'] + array_keys(Permissions::getPermissions()),
            '0'
        );
        $question->setMultiselect(true);

        return $question;
    }

    private function getGroupsQuestions(): Question
    {
        $groups = $this->manager->getRepository(MemberGroup::class)->findAll();
        $groupsArg = [];
        foreach ($groups as $group) {
            $groupsArg[$group->getId() ?? 0] = $group;
        }
        $question = new ChoiceQuestion(
            'Please select groups',
            ['None'] + $groupsArg,
            '0'
        );
        $question->setMultiselect(true);

        return $question;
    }

    private function mapGroupIdsToGroup(array $groupIds): array
    {
        return array_map(function(string $groupName) {
            return $this->manager->getRepository(MemberGroup::class)->findOneBy([
                'name' => $groupName,
            ]);
        }, $groupIds);
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
        $output->writeln('Nickname: ' . $input->getArgument('nickname'));

        $roles = [];
        if ($input->hasOption('is-admin') && !empty($input->getOption('is-admin'))) {
            $roles[] = 'ROLE_ADMIN';
        }
        if ($input->hasOption('roles')) {
            $roles = array_merge($roles, $input->getOption('roles'));
        }
        $output->writeln('Roles: [' . implode(',', $roles) . ']');

        $helper = $this->getHelper('question');
        $password = $helper->ask($input, $output, $this->getPasswordQuestion());
        if (!in_array('ROLE_ADMIN', $roles)) {
            $permissions = $helper->ask($input, $output, $this->getPermissionsQuestions());
            if (($pos = array_search('None', $permissions)) !== false) {
                unset($permissions[$pos]);
            }
        } else {
            $permissions = [];
        }
        $groups = $helper->ask($input, $output, $this->getGroupsQuestions());
        if (($pos = array_search('None', $groups)) !== false) {
            unset($groups[$pos]);
        }
        $groups = $this->mapGroupIdsToGroup($groups);

        $user = $this->memberFactory->createFromCommand(
            $input->getArgument('email'),
            $password,
            $input->getArgument('nickname'),
            $permissions,
            $roles,
            $groups
        );
        $this->manager->persist($user);
        $this->manager->flush();

        $output->writeln('User successfully generated!');

        return Command::SUCCESS;
    }
}