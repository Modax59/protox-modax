<?php

namespace App\Controller\user;

use App\Entity\User;
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
    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function __invoke(Request $request)
    {


        $data =  $request->attributes->get('data');
        $newPassword = $data->getPassword();
        $id = $request->attributes->get('id');
        $user = $this->manager->getRepository(User::class)->findOneBy(['id' => $id]);
        $user->setPassword($newPassword);
        $user->setResetPassToken(null);
        $this->manager->flush();

        return $user;
    }
}
