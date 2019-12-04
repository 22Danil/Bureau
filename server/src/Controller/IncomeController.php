<?php

namespace App\Controller;
use App\Entity\Identity;
use App\Entity\ReceiptOfRegistration;
use App\Entity\ReceiptOfDeregistration;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use \Firebase\JWT\JWT;

class IncomeController extends AbstractController
{
    /**
     * @Route("/api/income", name="income")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function index(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $JWT = $request->query->get('token');
            $check = $request->query->get('check');
            $start = $request->query->get('start');
            $end = $request->query->get('end');
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $user_role = $decoded->role;

            if($user_role == 'admin'){
                if($check == "1"){
                    $incomes = $this->getDoctrine()
                        ->getRepository(ReceiptOfDeregistration::class)
                        ->AllIncome();
                }
                else if($check == "2"){
                    $incomes = $this->getDoctrine()
                        ->getRepository(ReceiptOfDeregistration::class)
                        ->RightIncome($end);
                }
                else if($check == "3"){
                    $incomes = $this->getDoctrine()
                        ->getRepository(ReceiptOfDeregistration::class)
                        ->LeftIncome($start);
                }
                else if($check == "4"){
                    $incomes = $this->getDoctrine()
                        ->getRepository(ReceiptOfDeregistration::class)
                        ->BorderIncome($start, $end);
                }

                if(count($incomes) == 0){
                    $response = new Response();
                    $response->setContent(json_encode(['text' => "error"]));
                    $response->setStatusCode(Response::HTTP_OK );
                    return $response;
                }
                else{
                    $response = new Response();
                    $response->setContent(json_encode(['incomes' => $incomes, 'text' => "ok"]));
                    $response->setStatusCode(Response::HTTP_OK );
                    return $response;
                }
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
