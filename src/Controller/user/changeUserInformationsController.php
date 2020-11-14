<?php

namespace App\Controller\user;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class changeUserInformationsController
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
    /**
     * @var PasswordEncoderInterface
     */
    private $encoder;
    /**
     * @var EncoderFactoryInterface
     */
    private $encoderFactory;

    public function __construct(EntityManagerInterface $manager, UserRepository $userRepository, UserPasswordEncoderInterface $encoder)
    {
        $this->manager = $manager;
        $this->userRepository = $userRepository;
        $this->encoder = $encoder;
    }

    public function __invoke(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->userRepository->findOneBy(['email' => $data['email']]);
        if ($user instanceof User) {
            $user->setFirstName($data['firstName']);
            $user->setLastName($data['lastName']);
            if ($data['isEditing'] === true) {
                if ($data['currentPassword'] != "" && $data['newPassword'] != "") {
                    if ($this->encoder->isPasswordValid($user, $data['currentPassword'])) {
                        $user->setPassword($data['newPassword']);
                    } else {
                        return $message = ["Invalide Password"];
                    }
                }
            }
            $this->manager->persist($user);
            $this->manager->flush();
            return $user;
        }
    }
}
