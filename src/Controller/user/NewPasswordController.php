<?php

namespace App\Controller\user;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class NewPasswordController
{
    /**
     * Undocumented variable
     *
     * @var ObjectManager
     */
    private $manager;
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(EntityManagerInterface $manager, UserRepository $userRepository)
    {
        $this->manager = $manager;
        $this->userRepository = $userRepository;
    }

    public function __invoke(Request $request)
    {
        $data =  $request->attributes->get('data');
        $newPassword = $data->getPassword();
        $token = $request->attributes->get('token');
        $user = $user = $this->userRepository->findOneBy(['resetPassToken' => $token]);
        if($user instanceof User){
            $user->setPassword($newPassword);
            $user->setResetPassToken(null);
            $this->manager->persist($user);
            $this->manager->flush();
            return $user;
        }
    }
}
