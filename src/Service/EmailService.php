<?php

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class EmailService {

    private $mailer;
    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function sendEmail($from,$subject,$path,$data,$user){

        $email = (new TemplatedEmail())
            ->from($from)
            ->addTo($user->getEmail())
            ->subject($subject)
            ->htmlTemplate($path)
            ->context(['data' => $data]);
        $this->mailer->send($email);
    }
}