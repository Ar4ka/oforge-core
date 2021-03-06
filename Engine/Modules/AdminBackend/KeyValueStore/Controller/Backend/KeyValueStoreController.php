<?php

namespace Oforge\Engine\Modules\AdminBackend\KeyValueStore\Controller\Backend;

use Oforge\Engine\Modules\Auth\Models\User\BackendUser;
use Oforge\Engine\Modules\Core\Annotation\Endpoint\EndpointClass;
use Oforge\Engine\Modules\Core\Models\Store\KeyValue;
use Oforge\Engine\Modules\CRUD\Controller\Backend\BaseCrudController;
use Oforge\Engine\Modules\CRUD\Enum\CrudDataTypes;
use Oforge\Engine\Modules\CRUD\Enum\CrudFilterType;
use Oforge\Engine\Modules\CRUD\Enum\CrudGroupByOrder;

/**
 * Class KeyValueStoreController
 *
 * @package Oforge\Engine\Modules\AdminBackend\KeyValueStore\Controller\Backend
 * @EndpointClass(path="/backend/key-value-store", name="backend_key_value_store", assetScope="Backend")
 */
class KeyValueStoreController extends BaseCrudController {
    /** @var string $model */
    protected $model = KeyValue::class;
    /** @var array $modelProperties */
    protected $modelProperties = [
        [
            'name'   => 'name',
            'type'   => CrudDataTypes::STRING,
            'label'  => [
                'key'     => 'backend_keyvaluestore_name',
                'default' => [
                    'en' => 'Name',
                    'de' => 'Name',
                ],
            ],
            'crud'   => [
                'index'  => 'readonly',
                'view'   => 'readonly',
                'create' => 'editable',
                'update' => 'readonly',
                'delete' => 'readonly',
            ],
            'editor' => [
                'required' => true,
            ],
        ],
        [
            'name'   => 'value',
            'type'   => CrudDataTypes::STRING,
            'label'  => [
                'key'     => 'backend_keyvaluestore_value',
                'default' => [
                    'en' => 'Value',
                    'de' => 'Wert',
                ],
            ],
            'crud'   => [
                'index'  => 'editable',
                'view'   => 'readonly',
                'create' => 'editable',
                'update' => 'editable',
                'delete' => 'readonly',
            ],
            'editor' => [
                'required' => true,
            ],
        ],
    ];
    /** @var array $indexFilter */
    protected $indexFilter = [
        'name' => [
            'type'  => CrudFilterType::TEXT,
            'label' => [
                'key'     => 'backend_keyvaluestore_filter_name',
                'default' => [
                    'en' => 'Search in name',
                    'de' => 'Suche im Namen',
                ],
            ],
        ],
    ];
    /** @var array $indexOrderBy */
    protected $indexOrderBy = [
        'name' => CrudGroupByOrder::ASC,
    ];
    /** @var array $crudActions */
    protected $crudActions = [
        'index'  => true,
        'create' => true,
        'view'   => true,
        'update' => true,
        'delete' => true,
    ];
    /** @var int|array<string,int> $crudPermission */
    protected $crudPermissions = BackendUser::ROLE_ADMINISTRATOR;

}
