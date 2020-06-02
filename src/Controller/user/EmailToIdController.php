<?php

namespace App\Controller\user;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class EmailToIdController
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
        $email = $request->attributes->get('email');
        $user = $this->manager->getRepository(User::class)->findOneBy(['email' => $email]);
        return $user;
    }
}
