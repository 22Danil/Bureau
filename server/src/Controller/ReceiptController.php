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

class ReceiptController extends AbstractController
{
    /**
     * @Route("/api/getreceipt", name="getreceipt")
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
        
        try{
            $receipts = $this->getDoctrine()
            ->getRepository(ReceiptOfRegistration::class)
            ->AllReceipt($user_id);
        }
        catch(\Exception $e){
            error_log($e->getMessage());
            $response = new Response();
            $response->setContent(json_encode(['test' => $e->getMessage()]));
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
            return $response;
        }
        
        $response = new Response();
        $response->setContent(json_encode(['reseipts' => $receipts]));
        $response->setStatusCode(Response::HTTP_OK);
        return $response;
    }

    /**
     * @Route("/api/getwork", name="getwork")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function works(Request $request, EntityManagerInterface $em)
    {
        $key_JWT = "wejpjxczvwmeskms";
        $JWT = $request->query->get('token');
        $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
        $user_id = $decoded->id;
        
        try{
            $works = $this->getDoctrine()
            ->getRepository(ReceiptOfDeregistration::class)
            ->AllWorks($user_id);
        }
        catch(\Exception $e){
            error_log($e->getMessage());
            $response = new Response();
            $response->setContent(json_encode(['test' => $e->getMessage()]));
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
            return $response;
        }
        
        $response = new Response();
        $response->setContent(json_encode(['works' => $works]));
        $response->setStatusCode(Response::HTTP_OK);
        return $response;
    }

    /**
     * @Route("/api/pay", name="pay")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function cost(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $Data = json_decode($request->getContent());
            $receipt_id = $Data->id;
            $card = $Data->card;
            $cost = $Data->cost;
            $JWT = $Data->token;
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $datenow = date("Y-m-d");

            $em = $this->getDoctrine()->getManager();
            $ReceiptOfReg = $this->getDoctrine()->getRepository(ReceiptOfRegistration::class)->find($receipt_id);

            $ReceiptOfReg->setPaid("true");

            $user = $this->getDoctrine()
                    ->getRepository(Identity::class)
                    ->find($user_id);

            $EMPid = $this->getDoctrine()
                ->getRepository(Employers::class)
                ->find($ReceiptOfReg->getEmployer());

            $ReceiptOfDer = new ReceiptOfDeregistration();
            $ReceiptOfDer->setIdentity($user);
            $ReceiptOfDer->setEmployer($EMPid);
            $ReceiptOfDer->setCommission($cost);
            $ReceiptOfDer->setDateadded(new \DateTime($datenow));
            // скажите Doctrine, что вы (в итоге) хотите сохранить Товар (пока без запросов)
            $em->persist($ReceiptOfDer);
            $em->persist($ReceiptOfReg);
            // на самом деле выполнить запросы (т.е. запрос INSERT)
            $em->flush();

            $response = new Response();
            $response->setContent(json_encode(['text' => "ok"]));
            $response->setStatusCode(Response::HTTP_OK);
            return $response;
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
     * @Route("/api/search", name="search")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function search(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $Data = json_decode($request->getContent());
            $value_positions = $Data->value_positions;//id
            $value_specialty = $Data->value_specialty;//id
            $EstimatedSalary = $Data->EstimatedSalary;
            $receipt_id = $Data->receipt_id;
            $JWT = $Data->token;
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;

            $CheckEmployers = $this->getDoctrine()
            ->getRepository(Employers::class)
            ->findEmployer($value_positions, $value_specialty, $EstimatedSalary);

            if(count($CheckEmployers) > 0){
                $EMPid = $this->getDoctrine()
                    ->getRepository(Employers::class)
                    ->find((int)$CheckEmployers[0]["id"]);
                
                $em = $this->getDoctrine()->getManager();
                $ReceiptOfReg = $this->getDoctrine()->getRepository(ReceiptOfRegistration::class)->find($receipt_id);
        
                $ReceiptOfReg->setEmployer($EMPid);

                $em->persist($ReceiptOfReg);
                // на самом деле выполнить запросы (т.е. запрос INSERT)
                $em->flush();

                $receipts = $this->getDoctrine()
                    ->getRepository(ReceiptOfRegistration::class)
                    ->AllReceipt($user_id);
                
                $response = new Response();
                $response->setContent(json_encode(['reseipts' => $receipts]));
                $response->setStatusCode(Response::HTTP_OK);
                return $response;
            }
            else{
                $response = new Response();
                $response->setContent(json_encode(['text' => "notfound"]));
                $response->setStatusCode(Response::HTTP_OK);
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
