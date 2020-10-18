<?php

namespace App\Controller\user;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Request;

class UserByEmailController
{

    /**
     * Undocumented variable
     *
     * @var ObjectManager
     */
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function __invoke(Request $request)
    {
        $email = $request->attributes->get('email');
        $user = $this->userRepository->findOneBy(['email' => $email]);
        if($user instanceof User) {
            return $user;
        }
    }
}
