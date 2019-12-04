<?php

namespace App\Controller;

use App\Entity\Employers;
use App\Entity\Identity;
use App\Entity\Position;
use App\Entity\ReceiptOfRegistration;
use App\Entity\Specialty;
use Exception;
use App\Entity\ReceiptOfDeregistration;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use \Firebase\JWT\JWT;

class EmployerController extends AbstractController
{
    /**
     * @Route("/api/employers", name="employers")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function employers(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $JWT = $request->query->get('token');
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $user_role = $decoded->role;

            if($user_role == 'worker' || $user_role == 'admin'){

                $employers = $this->getDoctrine()
                    ->getRepository(Employers::class)
                    ->AllEmployer();

                $response = new Response();
                $response->setContent(json_encode(['employers' => $employers]));
                $response->setStatusCode(Response::HTTP_OK );
                return $response;
            }
            else{
                $response = new Response();
                $response->setContent(json_encode(['text' => "notok"]));
                $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
                return $response;
            }
        }
        catch(\Exception $e){
            error_log($e->getMessage());
            $response = new Response();
            $response->setContent(json_encode(['test' => $e->getMessage()]));
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
            return $response;
        }
    }

    /**
     * @Route("/api/make", name="make")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function make(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $Data = json_decode($request->getContent());
            $value_positions = $Data->value_positions;//id
            $value_specialty = $Data->value_specialty;//id
            $title = $Data->title;
            $address = $Data->address;
            $number = $Data->number;
            $salary = $Data->salary;
            $JWT = $Data->token;
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $user_role = $decoded->role;
            $datenow = date("Y-m-d");

            if($user_role == 'worker' || $user_role == 'admin'){

                $idPositions = $this->getDoctrine()
                ->getRepository(Position::class)
                ->find((int)$value_positions);

                $idSpecialty = $this->getDoctrine()
                    ->getRepository(Specialty::class)
                    ->find((int)$value_specialty);

                $em = $this->getDoctrine()->getManager();
                $Employer = new Employers();
                $Employer->setTitle($title);
                $Employer->setAddress($address);
                $Employer->setNumber($number);
                $Employer->setSpecialty($idSpecialty);
                $Employer->setPosition($idPositions);
                $Employer->setSalary($salary);
                $Employer->setDateadded(new \DateTime($datenow));
                // скажите Doctrine, что вы (в итоге) хотите сохранить Товар (пока без запросов)
                $em->persist($Employer);
                // на самом деле выполнить запросы (т.е. запрос INSERT)
                $em->flush();

                $response = new Response();
                $response->setContent(json_encode(['text' => "ok"]));
                $response->setStatusCode(Response::HTTP_OK );
                return $response;
            }
            else{
                $response = new Response();
                $response->setContent(json_encode(['text' => "notok"]));
                $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
                return $response;
            }


        }
        catch(\Exception $e){
            error_log($e->getMessage());
            $response = new Response();
            $response->setContent(json_encode(['test' => $e->getMessage()]));
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
            return $response;
        }
    }

    /**
     * @Route("/api/changeemployer", name="changeemployer")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function change(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $Data = json_decode($request->getContent());
            $title = $Data->title;
            $address = $Data->address;
            $number = $Data->number;
            $salary = $Data->salary;
            $id = $Data->id;
            $JWT = $Data->token;
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $user_role = $decoded->role;

            if($user_role == 'worker' || $user_role == 'admin'){

                $em = $this->getDoctrine()->getManager();
                $employerNew = $this->getDoctrine()->getRepository(Employers::class)->find($id);
        
                $employerNew->setTitle($title);
                $employerNew->setAddress($address);
                $employerNew->setNumber($number);
                $employerNew->setSalary($salary);

                $em->persist($employerNew);
                // на самом деле выполнить запросы (т.е. запрос INSERT)
                $em->flush();

                $response = new Response();
                $response->setContent(json_encode(['text' => "ok"]));
                $response->setStatusCode(Response::HTTP_OK );
                return $response;
            }
            else{
                $response = new Response();
                $response->setContent(json_encode(['text' => "notok"]));
                $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
                return $response;
            }


        }
        catch(\Exception $e){
            error_log($e->getMessage());
            $response = new Response();
            $response->setContent(json_encode(['test' => $e->getMessage()]));
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
            return $response;
        }
    }

    /**
     * @Route("/api/deleteemployer", name="deleteemployer")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function delete(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $Data = json_decode($request->getContent());
            $id = $Data->id;
            $JWT = $Data->token;
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $user_role = $decoded->role;

            if($user_role == 'worker' || $user_role == 'admin'){

                $em = $this->getDoctrine()->getManager();
                $employerDel = $this->getDoctrine()->getRepository(Employers::class)->find($id);

                $em->remove($employerDel);
                $em->flush();

                $response = new Response();
                $response->setContent(json_encode(['text' => "ok"]));
                $response->setStatusCode(Response::HTTP_OK );
                return $response;
            }
            else{
                $response = new Response();
                $response->setContent(json_encode(['text' => "notok"]));
                $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
                return $response;
            }


        }
        catch(\Exception $e){
            error_log($e->getMessage());
            $response = new Response();
            $response->setContent(json_encode(['test' => $e->getMessage()]));
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
            return $response;
        }
    }



}
