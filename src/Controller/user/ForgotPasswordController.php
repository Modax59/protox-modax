<?php

namespace App\Controller\user;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class ForgotPasswordController extends AbstractController
{

    /**
     * Undocumented variable
     *
     * @var ObjectManager
     */
    private $manager;
    private $mailer;
    private $tokenGenerator;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var EmailService
     */
    private $emailService;

    public function __construct(EntityManagerInterface $manager, MailerInterface $mailer, TokenGeneratorInterface $tokenGenerator, UserRepository $userRepository,EmailService $emailService)
    {
        $this->tokenGenerator = $tokenGenerator;
        $this->manager = $manager;
        $this->mailer = $mailer;
        $this->userRepository = $userRepository;
        $this->emailService = $emailService;
    }

    public function __invoke(Request $request)
    {
        $email = $request->attributes->get('email');
        $user = $this->userRepository->findOneBy(array('email'=>$email));
        if ($user instanceof User) {
            $token = $this->tokenGenerator->generateToken();
            $user->setResetPassToken($token);
            $this->manager->flush();
            $path = $this->getParameter('resetPassPath');
            $url = "/resetpass/" . $token;
            //$this->emailService->sendEmail('EPID.verhille.C@gmail.com', 'Changement de mot de passe', 'emails/ForgotPasswordEmail.html.twig', $url, $user);
            $message = array($url);
            return $message;
        }else{
            return "test";
        }
    }
}
