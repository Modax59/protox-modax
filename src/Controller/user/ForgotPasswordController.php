<?php

namespace App\Controller\user;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class ForgotPasswordController
{

    /**
     * Undocumented variable
     *
     * @var ObjectManager
     */
    private $manager;
    private $mailer;
    private $tokenGenerator;
    public function __construct(EntityManagerInterface $manager, \Swift_Mailer $mailer, TokenGeneratorInterface $tokenGenerator)
    {
        $this->tokenGenerator = $tokenGenerator;
        $this->manager = $manager;
        $this->mailer = $mailer;
    }

    public function __invoke(User $data)
    {
        $token = $this->tokenGenerator->generateToken();
        $data->setResetPassToken($token);
        $this->manager->flush();
        $url = "http://localhost:8000/#/resetpass/" . $token;
        $message = (new \Swift_Message('Mot de passe oublié'))
            ->setFrom('epid.verhille.c@gmail.com')
            ->setTo('epid.verhille.c@gmail.com')
            ->setBody("<p>Bonjour, </p><p> Une demande de réinitialisation de mot de passe a été effectuée pour le site Modax.fr. Veuillez cliquer sur le lien suivant : " . $url . '</p>', 'text/html');
        $this->mailer->send($message);
        return $data;
    }
}
