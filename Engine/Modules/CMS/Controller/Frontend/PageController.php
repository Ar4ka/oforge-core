<?php
/**
 * Created by PhpStorm.
 * User: Alexander Wegner
 * Date: 07.01.2019
 * Time: 15:57
 */

namespace Oforge\Engine\Modules\CMS\Controller\Frontend;

use Oforge\Engine\Modules\CMS\Services\PageService;
use Oforge\Engine\Modules\Core\Abstracts\AbstractController;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Router;

class PageController extends AbstractController {

    /**
     * @param Request $request
     * @param Response $response
     *
     * @return Response
     * @throws \Oforge\Engine\Modules\Core\Exceptions\ServiceNotFoundException
     * @throws \Doctrine\ORM\ORMException
     */
    public function indexAction(Request $request, Response $response) {

        /**
         * @var PageService $pagePathService
         */
        $pagePathService = Oforge()->Services()->get("page.path");
        $path = $request->getUri()->getPath();

        $cmsContent = $pagePathService->loadContentForPagePath($path);

        if ($cmsContent !== null) {
            Oforge()->View()->assign($cmsContent);
            return $response;
        }

        /** @var Router $router */
        $router = Oforge()->App()->getContainer()->get('router');
        $uri = $router->pathFor('not_found');
        $response = $response->withRedirect($uri, 301);
        return $response;
    }
}
