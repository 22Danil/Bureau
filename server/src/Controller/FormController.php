<?php

namespace App\Controller;

use App\Entity\Employers;
use App\Entity\Identity;
use App\Entity\Position;
use App\Entity\ReceiptOfRegistration;
use App\Entity\Specialty;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use \Firebase\JWT\JWT;

class FormController extends AbstractController
{
    /**
     * @Route("/api/formdata", name="form")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function index(Request $request, EntityManagerInterface $em)
    {
        $key_JWT = "wejpjxczvwmeskms";
        $JWT = $request->query->get('token');
        $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
        $user_id = $decoded->id;

        $user = $this->getDoctrine()
            ->getRepository(Identity::class)
            ->find($user_id);
        $user_name = $user->getName();

        $positions = $this->getDoctrine()
            ->getRepository(Position::class)
            ->AllPosition();

        $specialty = $this->getDoctrine()
            ->getRepository(Specialty::class)
            ->AllSpecialty();

        $response = new Response();
        $response->setContent(json_encode(['name' => $user_name, 'positions' => $positions, 'specialty' => $specialty]));
        $response->setStatusCode(Response::HTTP_OK);
        return $response;
    }

    /**
     * @Route("/api/publish", name="publish")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     * @throws Exception
     */
    public function publish(Request $request, EntityManagerInterface $em)
    {
        $key_JWT = "wejpjxczvwmeskms";
        $Data = json_decode($request->getContent());
        $value_positions = $Data->value_positions;//id
        $value_specialty = $Data->value_specialty;//id
        $EstimatedSalary = $Data->EstimatedSalary;
        $prepayment = $Data->prepayment;
        $JWT = $Data->token;
        $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
        $user_id = $decoded->id;
        $datenow = date("Y-m-d");
        try{
            $user = $this->getDoctrine()
                ->getRepository(Identity::class)
                ->find($user_id);

            $CheckEmployers = $this->getDoctrine()
                ->getRepository(Employers::class)
                ->findEmployer($value_positions, $value_specialty, $EstimatedSalary);

            $idPositions = $this->getDoctrine()
                ->getRepository(Position::class)
                ->find((int)$value_positions);

            $idSpecialty = $this->getDoctrine()
                ->getRepository(Specialty::class)
                ->find((int)$value_specialty);

        }
        catch(\Exception $e){
            error_log($e->getMessage());
            $response = new Response();
            $response->setContent(json_encode(['test' => $e->getMessage()]));
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
            return $response;
        }



        if(count($CheckEmployers) > 0){
            try{
                $EMPid = $this->getDoctrine()
                    ->getRepository(Employers::class)
                    ->find((int)$CheckEmployers[0]["id"]);

                $em = $this->getDoctrine()->getManager();
                $Reciept = new ReceiptOfRegistration();
                $Reciept->setIdentityId($user);
                $Reciept->setSpecialty($idSpecialty);
                $Reciept->setPosition($idPositions);
                $Reciept->setEstimatedSalary($EstimatedSalary);
                $Reciept->setPrepayment($prepayment);
                $Reciept->setPaid("false");
                $Reciept->setEmployer($EMPid);
                $Reciept->setDateadded(new \DateTime($datenow));
                $em->persist($Reciept);
                $em->flush();
            }
            catch(\Exception $e){
                error_log($e->getMessage());
                $response = new Response();
                $response->setContent(json_encode(['test' => $e->getMessage()]));
                $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
                return $response;
            }
        }
        else{
            try{
                $em = $this->getDoctrine()->getManager();
                $Reciept = new ReceiptOfRegistration();
                $Reciept->setIdentityId($user);
                $Reciept->setSpecialty($idSpecialty);
                $Reciept->setPosition($idPositions);
                $Reciept->setEstimatedSalary($EstimatedSalary);
                $Reciept->setPaid("false");
                $Reciept->setPrepayment($prepayment);
                $Reciept->setDateadded(new \DateTime($datenow));
                $em->persist($Reciept);
                $em->flush();
            }
            catch(\Exception $e){
                error_log($e->getMessage());
                $response = new Response();
                $response->setContent(json_encode(['test' => $e->getMessage()]));
                $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
                return $response;
            }
        }

        $response = new Response();
        $response->setContent(json_encode(['text' => "forForm"]));
        $response->setStatusCode(Response::HTTP_OK);
        return $response;
    }
}
