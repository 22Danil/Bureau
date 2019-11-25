<?php

namespace App\Controller;
use App\Entity\Identity;
use App\Entity\ReceiptOfRegistration;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use \Firebase\JWT\JWT;
class IdentityController extends AbstractController
{
    /**
     * @Route("/api/registration", name="registration")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function index(Request $request, EntityManagerInterface $em)
    {
        $key_JWT = "wejpjxczvwmeskms";
        $UserData = json_decode($request->getContent());
        $name = $UserData->name;
        $login = $UserData->login;
        $password = $UserData->password;
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $datenow = date("Y-m-d");
        try{
            $em = $this->getDoctrine()->getManager();
            $user = new Identity();
            $user->setName($name);
            $user->setLogin($login);
            $user->setPassword($hash);
            $user->setRole("usual");
            $user->setDateadded(new \DateTime($datenow));
            // скажите Doctrine, что вы (в итоге) хотите сохранить Товар (пока без запросов)
            $em->persist($user);
            // на самом деле выполнить запросы (т.е. запрос INSERT)
            $em->flush();


            $token = array(
                "id" => $user->getId(),
                "role" => $user->getRole()
            );
            $jwt = JWT::encode($token, $key_JWT);
            //$decoded = JWT::decode($jwt, $key_JWT, array('HS256'));

            $response = new Response();
            $response->setContent(json_encode(['token' => $jwt, 'role' => $user->getRole()]));
            $response->setStatusCode(Response::HTTP_OK );
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
     * @Route("/api/login", name="login")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function login(Request $request, EntityManagerInterface $em)
    {
        $key_JWT = "wejpjxczvwmeskms";
        $UserData = json_decode($request->getContent());
        $login = $UserData->login;
        $password = $UserData->password;

        try{
            $user = $this->getDoctrine()
                ->getRepository(Identity::class)
                ->findUser($login);

            $passwordHash = $user[0]["password"];

            if(password_verify($password, $passwordHash)){
                $token = array(
                "id" => $user[0]["id"],
                "role" => $user[0]["role"]
                );
                $jwt = JWT::encode($token, $key_JWT);

                $response = new Response();
                $response->setContent(json_encode(['token' => $jwt, 'role' => $user[0]["role"]]));
                $response->setStatusCode(Response::HTTP_OK );
                return $response;
            }
            else{
                $response = new Response();
                $response->setContent(json_encode(['data' => "Неверный пароль!"]));
                $response->setStatusCode(Response::HTTP_NO_CONTENT );
                return $response;
            }
        }
        catch(\Exception $e){
            error_log($e->getMessage());
            $response = new Response();
            $response->setContent(json_encode(['data' => $e->getMessage()]));
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR );
            return $response;
        }
    }

    /**
     * @Route("/api/users", name="users")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function users(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $JWT = $request->query->get('token');
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $user_role = $decoded->role;

            if($user_role == 'worker' || $user_role == 'admin'){

                $users = $this->getDoctrine()
                    ->getRepository(Identity::class)
                    ->AllIdentity($user_id);

                $response = new Response();
                $response->setContent(json_encode(['users' => $users]));
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
     * @Route("/api/admins", name="admin")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function admin(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $JWT = $request->query->get('token');
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $user_role = $decoded->role;

            if($user_role == 'admin'){

                $admins = $this->getDoctrine()
                    ->getRepository(Identity::class)
                    ->AdminsIdentity();

                $response = new Response();
                $response->setContent(json_encode(['admins' => $admins]));
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
