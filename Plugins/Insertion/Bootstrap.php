<?php

namespace Insertion;

use Insertion\Controller\Backend\BackendAttributeController;
use Insertion\Controller\Backend\BackendInsertionController;
use Insertion\Controller\Backend\BackendInsertionTypeController;
use Insertion\Controller\Frontend\FrontendInsertionController;
use Insertion\Models\AttributeKey;
use Insertion\Models\AttributeValue;
use Insertion\Models\Insertion;
use Insertion\Models\InsertionAttributeValue;
use Insertion\Models\InsertionContent;
use Insertion\Models\InsertionMedia;
use Insertion\Models\InsertionType;
use Insertion\Models\InsertionTypeAttribute;
use Insertion\Models\InsertionTypeGroup;
use Insertion\Services\AttributeService;
use Insertion\Services\InsertionCreatorService;
use Insertion\Services\InsertionMockService;
use Insertion\Services\InsertionService;
use Insertion\Services\InsertionTypeService;
use Insertion\Twig\InsertionExtensions;
use Oforge\Engine\Modules\Core\Abstracts\AbstractBootstrap;
use Oforge\Engine\Modules\TemplateEngine\Core\Services\TemplateRenderService;

class Bootstrap extends AbstractBootstrap {

    /**
     * Bootstrap constructor.
     */
    public function __construct() {
        $this->endpoints = [
            FrontendInsertionController::class,
            BackendAttributeController::class,
            BackendInsertionController::class,
            BackendInsertionTypeController::class,
        ];

        $this->services = [
            'insertion'           => InsertionService::class,
            'insertion.type'      => InsertionTypeService::class,
            'insertion.attribute' => AttributeService::class,
            'insertion.mock'      => InsertionMockService::class,
            'insertion.creator'   => InsertionCreatorService::class,
        ];

        $this->models = [
            AttributeKey::class,
            AttributeValue::class,
            Insertion::class,
            InsertionAttributeValue::class,
            InsertionType::class,
            InsertionTypeAttribute::class,
            InsertionContent::class,
            InsertionMedia::class,
            InsertionTypeGroup::class,
        ];

        $this->dependencies = [
            \FrontendUserManagement\Bootstrap::class,
        ];
    }

    public function load() {
        /**
         * @var $templateRenderer TemplateRenderService
         */
        $templateRenderer = Oforge()->Services()->get("template.render");

        $templateRenderer->View()->addExtension(new InsertionExtensions());
    }
}
