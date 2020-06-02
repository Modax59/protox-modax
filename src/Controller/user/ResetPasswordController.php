<?php

namespace App\Controller\user;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Request;

class ResetPasswordController
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
        $token = $request->attributes->get('token');
        $user = $this->manager->getRepository(User::class)->findOneBy(['resetPassToken' => $token]);
        if ($user == null) {
            return [
                $user => null
            ];
        } else {
            return $user;
        }
    }
}
