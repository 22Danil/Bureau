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
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $UserData = json_decode($request->getContent());
            $name = $UserData->name;
            $lastname = $UserData->lastname;
            $midlename = $UserData->midlename;
            $login = $UserData->login;
            $password = $UserData->password;
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $datenow = date("Y-m-d");

            $userCheack = $this->getDoctrine()
                ->getRepository(Identity::class)
                ->findUser($login);

            if(count($userCheack) == 0){
                $em = $this->getDoctrine()->getManager();
                $user = new Identity();
                $user->setName($name);
                $user->setLastname($lastname);
                $user->setMiddlename($midlename);
                $user->setLogin($login);
                $user->setPassword($hash);
                $user->setRole("usual");
                $user->setDateadded(new \DateTime($datenow));
                
                $em->persist($user);

                $em->flush();


                $token = array(
                    "id" => $user->getId(),
                    "role" => $user->getRole()
                );
                $jwt = JWT::encode($token, $key_JWT);
                $response = new Response();
                $response->setContent(json_encode(['token' => $jwt, 'role' => $user->getRole(), 'name' => $name]));
                $response->setStatusCode(Response::HTTP_OK);
                return $response;
            }
            else{
                $response = new Response();
                $response->setContent(json_encode(['data' => "Логин занят!"]));
                $response->setStatusCode(Response::HTTP_NOT_FOUND);
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
     * @Route("/api/login", name="login")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function login(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $UserData = json_decode($request->getContent());
            $login = $UserData->login;
            $password = $UserData->password;

        
            $user = $this->getDoctrine()
                ->getRepository(Identity::class)
                ->findUser($login);

            if(count($user) == 0){
                $response = new Response();
                $response->setContent(json_encode(['data' => "Неверный логин!"]));
                $response->setStatusCode(Response::HTTP_NOT_FOUND);
                return $response;
            }
            else{
                $passwordHash = $user[0]["password"];

                if(password_verify($password, $passwordHash)){
                    $token = array(
                    "id" => $user[0]["id"],
                    "role" => $user[0]["role"]
                    );
                    $jwt = JWT::encode($token, $key_JWT);
    
                    $response = new Response();
                    $response->setContent(json_encode(['name' => $user[0]["name"], 'token' => $jwt, 'role' => $user[0]["role"]]));
                    $response->setStatusCode(Response::HTTP_OK );
                    return $response;
                }
                else{
                    $response = new Response();
                    $response->setContent(json_encode(['data' => "Неверный пароль!"]));
                    $response->setStatusCode(Response::HTTP_NOT_FOUND);
                    return $response;
                }
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

    /**
     * @Route("/api/changeuser", name="changeuser")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function change(Request $request, EntityManagerInterface $em)
    {
        try{
            $key_JWT = "wejpjxczvwmeskms";
            $Data = json_decode($request->getContent());
            $login = $Data->login;
            $name = $Data->name;
            $lastname = $Data->lastname;
            $middlename = $Data->middlename;
            $role = $Data->role;
            $id = $Data->id;
            $JWT = $Data->token;
            $decoded = JWT::decode($JWT, $key_JWT, array('HS256'));
            $user_id = $decoded->id;
            $user_role = $decoded->role;

            if($user_role == 'worker' || $user_role == 'admin'){

                $em = $this->getDoctrine()->getManager();
                $userNew = $this->getDoctrine()->getRepository(Identity::class)->find($id);
        
                $userNew->setLogin($login);
                $userNew->setName($name);
                $userNew->setLastname($lastname);
                $userNew->setMiddlename($middlename);
                $userNew->setRole($role);

                $em->persist($userNew);

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
     * @Route("/api/deleteuser", name="deleteuser")
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
                $userDel = $this->getDoctrine()->getRepository(Identity::class)->find($id);

                $em->remove($userDel);
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